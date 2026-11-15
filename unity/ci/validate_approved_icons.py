#!/usr/bin/env python3
"""Validate the approved DnD-VTT icon pack before Unity import.

Usage: python unity/ci/validate_approved_icons.py path/to/dnd_vtt_icons_160_complete.zip
Requires Pillow. Reports warnings for opaque backgrounds; does not claim
that extracted source artwork is production-ready.
"""
import io
import re
import sys
import zipfile
from PIL import Image

def validate(archive_path):
    errors = []
    warnings = []
    with zipfile.ZipFile(archive_path) as archive:
        files = {}
        for name in archive.namelist():
            base = name.replace("\\", "/").rsplit("/", 1)[-1]
            match = re.fullmatch(r"icon_(\d{3})\.png", base)
            if not match:
                continue
            number = int(match.group(1))
            if number in files:
                errors.append(f"Duplicate icon ID {number:03}")
            files[number] = name
        missing = sorted(set(range(1, 161)) - set(files))
        extra = sorted(set(files) - set(range(1, 161)))
        if missing:
            errors.append(f"Missing icon IDs: {missing}")
        if extra:
            errors.append(f"Unexpected icon IDs: {extra}")
        for number, name in sorted(files.items()):
            try:
                with Image.open(io.BytesIO(archive.read(name))) as img:
                    img.load()
                    if img.format != "PNG":
                        errors.append(f"{name}: not PNG")
                    if img.width < 24 or img.height < 24:
                        errors.append(f"{name}: too small {img.size}")
                    rgba = img.convert("RGBA")
                    alpha = rgba.getchannel("A")
                    if alpha.getextrema() == (255, 255):
                        warnings.append(f"{name}: fully opaque (background not removed)")
            except Exception as exc:
                errors.append(f"{name}: unreadable: {exc}")
    print(f"Found {len(files)}/160 icons")
    for warning in warnings:
        print("WARNING:", warning)
    for error in errors:
        print("ERROR:", error)
    return 1 if errors else 0

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Usage: validate_approved_icons.py icons.zip")
    sys.exit(validate(sys.argv[1]))
