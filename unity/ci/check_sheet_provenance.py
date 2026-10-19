#!/usr/bin/env python3
"""Verify that JS-derived Unity fixtures match Git sources on Linux and Windows.

The fixtures were generated with Windows CRLF checkouts. GitHub Actions Linux
checkout uses LF. We accept exactly the pinned SHA-256 of the raw file or of
its CRLF representation; no source changes or missing fixtures are tolerated.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
FIXTURE = ROOT / "unity/Assets/Vtt/Tests/sheet-contract.json"


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def match_source(data: bytes, expected: str) -> tuple[bool, bool]:
    if sha256(data) == expected:
        return True, False
    # Recreate the original Windows checkout byte representation only.
    crlf = data.replace(b"\r\n", b"\n").replace(b"\n", b"\r\n")
    return sha256(crlf) == expected, True


def main() -> int:
    # Prove that the compatibility path accepts newline conversion but
    # still rejects any non-newline content mutation.
    original = b"source\r\nvalue\r\n"
    digest = sha256(original)
    assert match_source(original, digest) == (True, False)
    assert match_source(original.replace(b"\r\n", b"\n"), digest) == (True, True)
    assert match_source(b"source\nchanged\n", digest)[0] is False

    payload = json.loads(FIXTURE.read_text(encoding="utf-8"))
    sources = payload.get("sources", [])
    if not sources:
        raise ValueError("Fixture has no source hashes")
    normalized = 0
    for item in sources:
        name, expected = item["file"], item["sha256"]
        if not isinstance(name, str) or not name.startswith("app/") or ".." in Path(name).parts:
            raise ValueError("Unexpected source path: " + str(name))
        data = (ROOT / name).read_bytes()
        match, converted = match_source(data, expected)
        if not match:
            raise ValueError("JS fixture provenance mismatch: " + name)
        normalized += int(converted)
    print(f"CI_SHEET_PROVENANCE_PASS: {len(sources)} pinned JS sources; {normalized} Windows CRLF checkouts reconstructed byte-for-byte")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, AssertionError) as exc:
        sys.exit("CI_SHEET_PROVENANCE_FAIL: " + str(exc))
