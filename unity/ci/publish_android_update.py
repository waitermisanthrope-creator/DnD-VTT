"""Owner-initiated promotion of a signed Android test artifact to the in-app update feed.

Requires a successful Android-only candidate, the original pinned release
certificate, a matching Android package/version, and explicit owner approval.
Does not rebuild Unity, distribute Windows, or replace existing version bytes.
"""
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile

REPO = "waitermisanthrope-creator/DnD-VTT"
BRANCH = "experiment/unity-vtt"
CERT = "c1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e"
PACKAGE = "com.dndvtt.unity"

def run(*args, capture=False):
    if capture:
        return subprocess.check_output(list(map(str, args)), text=True).strip()
    subprocess.check_call(list(map(str, args)))

def version_code(version):
    if not re.fullmatch(r"[1-9][0-9]{0,3}\.[0-9]{2}\.[0-9]{2}", version):
        raise ValueError("Invalid version")
    major, minor, patch = map(int, version.split("."))
    return major * 10000 + minor * 100 + patch

def main():
    version = os.environ["RELEASE_VERSION"]
    candidate_run = os.environ["CANDIDATE_RUN_ID"]
    if not candidate_run.isdecimal() or len(candidate_run) > 16:
        raise ValueError("Invalid candidate run ID")
    if os.environ.get("OWNER_APPROVED") != "true":
        raise ValueError("Only explicit owner approval may publish")
    if os.environ.get("GITHUB_REPOSITORY") != REPO or os.environ.get("GITHUB_REF") != "refs/heads/" + BRANCH:
        raise ValueError("Unexpected repository or branch")
    if os.environ.get("GITHUB_ACTOR") != "waitermisanthrope-creator":
        raise ValueError("Owner must dispatch public release")
    code = version_code(version)
    run_data = json.loads(run("gh", "api", "repos/" + REPO + "/actions/runs/" + candidate_run, capture=True))
    if run_data.get("name") != "Unity cloud Android candidate" or run_data.get("head_branch") != BRANCH or run_data.get("conclusion") != "success":
        raise ValueError("Candidate run is not a successful trusted Unity Android build")
    source_commit = run_data.get("head_sha", "")
    if not re.fullmatch(r"[0-9a-f]{40}", source_commit):
        raise ValueError("Untrusted candidate source commit")
    apk = Path("candidate") / ("DnD-VTT-Unity-" + version + "-arm64.apk")
    if not apk.is_file() or not 10_000_000 < apk.stat().st_size < 1_000_000_000:
        raise ValueError("Signed Android candidate not found")
    tools = Path(os.environ["ANDROID_HOME"]) / "build-tools" / "36.0.0"
    signer = run(tools / "apksigner", "verify", "--verbose", "--print-certs", apk, capture=True).lower()
    if "certificate sha-256 digest: " + CERT not in signer:
        raise ValueError("Android signer is not the pinned certificate")
    badging = run(tools / "aapt", "dump", "badging", apk, capture=True)
    for fragment in ("name='" + PACKAGE + "'", "versionCode='" + str(code) + "'",
                     "versionName='" + version + "'", "native-code: 'arm64-v8a'",
                     "sdkVersion:'26'"):
        if fragment not in badging:
            raise ValueError("APK metadata is wrong: " + fragment)
    run(tools / "zipalign", "-c", "-P", "16", "4", apk)

    local_path = Path("updates/unity-experiment.json")
    prior = json.loads(local_path.read_text(encoding="utf-8"))
    if code <= prior["versionCode"]:
        raise ValueError("Release version must be newer than the active feed")
    history_path = Path("updates/unity-changelog.json")
    history = json.loads(history_path.read_text(encoding="utf-8"))
    entry = next((row for row in history["releases"] if row["version"] == version), None)
    if not entry or entry["versionCode"] != code or entry["status"] != "testing":
        raise ValueError("Release history must have a testing entry matching the candidate")
    digest = hashlib.sha256(apk.read_bytes()).hexdigest()
    tag = "unity-v" + version
    link = "https://github.com/" + REPO + "/releases/download/" + tag + "/" + apk.name
    notes = entry["title"] + "\n\n" + "\n".join("- " + change for change in entry["changes"])
    with tempfile.TemporaryDirectory() as tmp:
        notes_file = Path(tmp) / "notes.md"
        notes_file.write_text(notes, encoding="utf-8")
        release_exists = subprocess.run(["gh", "release", "view", tag, "--repo", REPO],
                                        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode == 0
        if not release_exists:
            run("gh", "release", "create", tag, str(apk), "--repo", REPO,
                "--title", "DnD VTT Unity " + version, "--target", source_commit,
                "--notes-file", notes_file, "--prerelease")
        verified = Path(tmp) / "published.apk"
        run("curl", "--fail", "--location", "--retry", "5", "--retry-all-errors",
            "--silent", "--show-error", link, "-o", verified)
        if verified.stat().st_size != apk.stat().st_size or hashlib.sha256(verified.read_bytes()).hexdigest() != digest:
            raise ValueError("Published GitHub release differs from validated candidate")

    new_manifest = {
        "schema": 1, "channel": "unity-experiment", "version": version,
        "versionCode": code, "androidPackage": PACKAGE,
        "notes": " · ".join(entry["changes"]),
        "artifacts": {"android": {"url": link, "bytes": apk.stat().st_size, "sha256": digest}},
    }
    entry["status"] = "published"
    local_path.write_text(json.dumps(new_manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    history_path.write_text(json.dumps(history, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    run("git", "config", "user.name", "github-actions[bot]")
    run("git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com")
    run("git", "add", "--", str(local_path), str(history_path))
    run("git", "commit", "-m", "chore(unity): activate Android " + version + " in-app update [skip ci]")
    run("git", "push", "origin", "HEAD:" + BRANCH)
    print("UNITY_ANDROID_UPDATE_PUBLISHED:", version, code, digest, link)

if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, subprocess.CalledProcessError) as exc:
        print("ANDROID_UPDATE_PUBLISH_FAILED:", str(exc), file=sys.stderr)
        sys.exit(1)
