#!/usr/bin/env bash
# Export .drawio to PNG via rlespinasse/drawio-export (headless Electron)
# Used by drawio-aws-arch skill PDCA loop.
#
# Usage:
#   export_png.sh <path/to/diagram.drawio>
#
# Output: <same dir>/export/<basename>-<page-name>.png

set -euo pipefail

DRAWIO_FILE="${1:?usage: export_png.sh <path/to/diagram.drawio>}"

if [[ ! -f "$DRAWIO_FILE" ]]; then
  echo "ERROR: $DRAWIO_FILE not found" >&2
  exit 1
fi

DRAWIO_DIR="$(cd "$(dirname "$DRAWIO_FILE")" && pwd)"
DRAWIO_BASE="$(basename "$DRAWIO_FILE")"

# rlespinasse/drawio-export needs HOME writable + UID match to avoid root-owned output
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -v "$DRAWIO_DIR:/data" \
  -e HOME=/tmp \
  rlespinasse/drawio-export -f png 2>&1 | tail -5

# Find the produced PNG (filename = <base-without-ext>-<page-name>.png)
BASE_NOEXT="${DRAWIO_BASE%.drawio}"
PNG_PATH="$(find "$DRAWIO_DIR/export" -maxdepth 1 -name "${BASE_NOEXT}-*.png" -newer "$DRAWIO_FILE" | head -1)"

if [[ -z "$PNG_PATH" ]]; then
  # Fallback: pick the most recent PNG matching base name
  PNG_PATH="$(ls -t "$DRAWIO_DIR/export/${BASE_NOEXT}"-*.png 2>/dev/null | head -1)"
fi

if [[ -z "$PNG_PATH" ]]; then
  echo "ERROR: PNG export failed; no file found in $DRAWIO_DIR/export/" >&2
  exit 2
fi

echo "$PNG_PATH"
