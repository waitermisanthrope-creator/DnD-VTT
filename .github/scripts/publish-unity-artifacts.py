"""Publish already-built, owner-requested Unity packages; never run Unity or export keys.

Chunk blobs are short-lived transport objects, not committed binaries. Only the
small staging descriptor enters Git history. Uploaded release assets are the
durable download location; the feed advances after their hashes are verified.
"""
import base64
import hashlib
import json
import os
import pathlib
import re
import subprocess
import struct
import urllib.error
import urllib.request

REPO = "waitermisanthrope-creator/DnD-VTT"
BRANCH = "experiment/unity-vtt"


def api(path):
    request = urllib.request.Request(
        "https://api.github.com/repos/" + REPO + path,
        headers={"Authorization": "Bearer " + os.environ["GH_TOKEN"],
                 "Accept": "application/vnd.github+json", "User-Agent": "DnDVtt-Unity-Delivery"})
    with urllib.request.urlopen(request, timeout=120) as response:
        return json.load(response)


def gh(*args):
    return subprocess.check_output(["gh", *args], text=True).strip()


def publish():
    if os.environ.get("GITHUB_REF") != "refs/heads/" + BRANCH:
        raise ValueError("Only the Unity experimental branch may publish this channel")
    descriptor = json.loads(pathlib.Path("release-staging/unity-release.json").read_text())
    version = descriptor["version"]
    if descriptor["schema"] != 1 or not re.fullmatch(r"[1-9][0-9]{0,3}\.[0-9]{2}\.[0-9]{2}", version):
        raise ValueError("Invalid delivery descriptor")
    manifest = descriptor["updateManifest"]
    if manifest["channel"] != "unity-experiment" or manifest["version"] != version or manifest["versionCode"] != descriptor["versionCode"]:
        raise ValueError("Update manifest/descriptor mismatch")
    destination = pathlib.Path(os.environ["RUNNER_TEMP"]) / "unity-release"
    destination.mkdir(exist_ok=True)
    files, checksums = [], []
    for platform in ("android", "windows"):
        item = descriptor["artifacts"][platform]
        expected_name = f"DnD-VTT-Unity-{version}-arm64.apk" if platform == "android" else f"DnD-VTT-Unity-Setup-{version}-x64.exe"
        if item["name"] != expected_name or item["bytes"] != manifest["artifacts"][platform]["bytes"] or item["sha256"] != manifest["artifacts"][platform]["sha256"]:
            raise ValueError("Artifact identity mismatch")
        path = destination / item["name"]
        digest = hashlib.sha256()
        offset = 0
        with path.open("wb") as output:
            for part in item["parts"]:
                if part["offset"] != offset or not re.fullmatch("[a-f0-9]{40}", part["sha"]) or not 0 < part["bytes"] <= 4 * 1024 * 1024:
                    raise ValueError("Invalid part descriptor")
                blob = api("/git/blobs/" + part["sha"])
                data = base64.b64decode(blob["content"])
                git_sha = hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()
                if len(data) != part["bytes"] or git_sha != part["sha"]:
                    raise ValueError("Transport blob failed integrity check")
                output.write(data)
                digest.update(data)
                offset += len(data)
        if offset != item["bytes"] or digest.hexdigest() != item["sha256"]:
            raise ValueError("Whole package failed size/SHA256 validation")
        files.append(path)
        checksums.append(item["sha256"] + "  " + item["name"])
        print("Verified package:", path.name, offset, digest.hexdigest(), flush=True)
    sdk = pathlib.Path(os.environ["ANDROID_HOME"]) / "build-tools"
    signers = sorted(sdk.glob("*/apksigner"))
    if not signers:
        raise ValueError("Android signature verifier unavailable")
    certificate = subprocess.check_output([str(signers[-1]), "verify", "--print-certs", str(files[0])], text=True)
    expected_cert = descriptor["signingCertificateSha256"]
    if not re.fullmatch("[a-f0-9]{64}", expected_cert) or ("certificate SHA-256 digest: " + expected_cert) not in certificate:
        raise ValueError("APK is not signed with the pinned Unity release key")
    publish_verified(files, manifest, expected_cert)


def render_review_allows_activation(required, approved, actual):
    if not required:
        return True
    return bool(re.fullmatch(r"[a-f0-9]{64}", actual or "") and
                re.fullmatch(r"[a-f0-9]{64}", approved or "") and approved == actual)


def publish_verified(files, manifest, expected_cert, source_commit=None, build_run=None):
    """Shared final publisher; caller must verify packages and provenance first."""
    if os.environ.get("GITHUB_REF") != "refs/heads/" + BRANCH:
        raise ValueError("Only the Unity experimental branch may publish")
    version = manifest["version"]
    source_commit = source_commit or os.environ["GITHUB_SHA"]
    destination = pathlib.Path(files[0]).parent
    checksums = [manifest["artifacts"][platform]["sha256"] + "  " + path.name
                 for platform, path in zip(("android", "windows"), files)]
    feed = destination / "unity-experiment.json"
    feed.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    sums = destination / "SHA256SUMS.txt"
    sums.write_text("\n".join(checksums) + "\n", encoding="utf-8")
    files.extend([feed, sums])
    tag = "unity-v" + version
    notes_file=destination / "release-notes.md"
    notes_file.write_text("DnD VTT Unity "+version+"\n\n"+manifest.get("notes", "")+"\n",encoding="utf-8")
    # Optional render evidence is produced by the same successful native test run.
    # It never enters the APK or changes the two installer hash contracts.
    render_digest=None
    render_folder=os.environ.get("DICE_PREVIEW_DIR")
    if render_folder:
        images=sorted(pathlib.Path(render_folder).rglob("dnd.dice.icon.*.theme-d20.png"))
        expected={"dnd.dice.icon."+suffix+".theme-d20.png" for suffix in ["default"]+[f"{i:02d}" for i in range(1,31)]}
        if {p.name for p in images}!=expected or len(images)!=31:raise ValueError("Expected31 actual native d20 renders")
        # Six test sets also publish all shapes and two post-result frames for visual review.
        experiments=sorted(pathlib.Path(render_folder).rglob("test-*.png"))
        if experiments:
            required={"test-"+profile+"-d"+str(sides)+".png" for profile in ["abyss","ice","blood","stone","vine","slime"] for sides in [4,6,8,10,12,20,100]}
            required|={"test-"+profile+"-settled-"+frame+".png" for profile in ["abyss","ice","blood","stone","vine","slime"] for frame in ["a","b"]}
            if {p.name for p in experiments}!=required:raise ValueError("Incomplete six-set render evidence")
        images.extend(experiments)
        arenas=sorted(pathlib.Path(render_folder).rglob("arena-*.png"))
        if arenas:
            required={"arena-tray-"+profile+".png" for profile in ["spiral","pit","hexagon","octagon"]}|{"arena-abyss-20.png","arena-slime-20.png"}
            if {p.name for p in arenas}!=required:raise ValueError("Incomplete native tray/20-body evidence")
            images.extend(arenas)
        evidence=[]
        for path in images:
            blob=path.read_bytes()
            if not blob.startswith(b"\x89PNG\r\n\x1a\n") or struct.unpack(">II",blob[16:24])!=(768,640):raise ValueError("Invalid native render evidence")
            evidence.append(dict(name=path.name,bytes=len(blob),sha256=hashlib.sha256(blob).hexdigest(),width=768,height=640))
        index=destination/"dice-render-index.json"
        index.write_text(json.dumps(dict(sourceCommit=source_commit,buildRun=build_run,kind="Unity native rendered dice and tray validation",images=evidence),indent=2)+"\n")
        render_digest=hashlib.sha256(index.read_bytes()).hexdigest()
        files.extend(images);files.append(index)
    existing = subprocess.run(["gh", "release", "view", tag, "--repo", REPO, "--json", "isDraft"], capture_output=True, text=True)
    if existing.returncode == 0:
        if json.loads(existing.stdout)["isDraft"]:
            raise ValueError("An unfinished draft exists; inspect it rather than replacing assets")
        print("Release already exists; verify it before updating feed", flush=True)
    else:
        gh("release", "create", tag, *map(str, files), "--repo", REPO,
           "--target", source_commit, "--title", "DnD VTT Unity " + version,
           "--notes-file", str(notes_file), "--prerelease", "--latest=false")
    # Verify public downloads, not just the local payload or an upload command.
    for path in files:
        url = "https://github.com/" + REPO + "/releases/download/" + tag + "/" + path.name
        verified = destination / (path.name + ".remote")
        subprocess.check_call(["curl", "--fail", "--location", "--retry", "3", "--silent", "--show-error", url, "--output", str(verified)])
        if hashlib.sha256(verified.read_bytes()).digest() != hashlib.sha256(path.read_bytes()).digest():
            raise ValueError("Public release download differs from verified local payload")
    # Public candidate render review precedes feed activation for visual changes.
    # The same publisher reruns after review and verifies the exact immutable index.
    if not render_review_allows_activation(os.environ.get("DICE_RENDER_REVIEW_REQUIRED")=="true",
                                          os.environ.get("DICE_RENDER_REVIEW_SHA"),render_digest):
        print("UNITY_RENDER_REVIEW_PENDING: "+str(render_digest)+"; public candidate available, update feed unchanged",flush=True)
        return False
    # Fast-forward only, and only this channel file. Never modify stable manifests.
    subprocess.check_call(["git", "fetch", "origin", "refs/heads/"+BRANCH+":refs/remotes/origin/"+BRANCH])
    subprocess.check_call(["git", "switch", "--detach", "origin/" + BRANCH])
    live_feed = pathlib.Path("updates/unity-experiment.json")
    if live_feed.exists():
        previous = json.loads(live_feed.read_text(encoding="utf-8"))
        if previous["versionCode"] > manifest["versionCode"]:
            raise ValueError("A newer channel is already live; never downgrade it")
        if previous["versionCode"] == manifest["versionCode"] and previous["artifacts"] != manifest["artifacts"]:
            raise ValueError("Never replace a published version with different binaries")
    live_feed.write_bytes(feed.read_bytes())
    history_path=pathlib.Path("updates/unity-changelog.json")
    if history_path.exists():
        history=json.loads(history_path.read_text(encoding="utf-8"))
        for entry in history.get("releases",[]):
            if entry.get("version")==version:entry["status"]="published"
        history_path.write_text(json.dumps(history,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        pathlib.Path("unity/Assets/Vtt/Resources/Changelog.json").write_bytes(history_path.read_bytes())
        subprocess.check_call(["git","add","--",str(history_path),"unity/Assets/Vtt/Resources/Changelog.json"])

    report = {"status": "published-and-download-verified", "version": version,
              "releaseUrl": "https://github.com/" + REPO + "/releases/tag/" + tag,
              "sourceCommit": source_commit, "artifacts": manifest["artifacts"],
              "androidSigningCertificateSha256": expected_cert,
              "physicalAndroidQa": False, "cloudUnityBuildLicenseConfigured": bool(build_run)}
    if build_run:
        report["cloudBuildRun"] = build_run
    pathlib.Path("unity/PUBLIC_DELIVERY.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    subprocess.check_call(["git", "config", "user.name", "github-actions[bot]"])
    subprocess.check_call(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"])
    subprocess.check_call(["git", "add", "--", "updates/unity-experiment.json", "unity/PUBLIC_DELIVERY.json"])
    subprocess.check_call(["node", "tools/generate_project_atlas.cjs"])
    subprocess.check_call(["git", "add", "--", "PROJECT_ATLAS.md", "PROJECT_ATLAS.txt"])
    if subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode:
        subprocess.check_call(["git", "commit", "-m", "chore(unity): activate verified " + version + " update channel [skip ci]"])
        subprocess.check_call(["git", "push", "origin", "HEAD:refs/heads/" + BRANCH])
    print("UNITY_PUBLIC_DELIVERY_PASS: https://github.com/" + REPO + "/releases/tag/" + tag, flush=True)


if __name__ == "__main__":
    publish()
