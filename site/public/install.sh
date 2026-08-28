#!/bin/sh
set -eu

REPO="B-Divyesh/sf-freeze-capsule"
VERSION="${FREEZE_CAPSULE_VERSION:-latest}"
INSTALL_DIR="${FREEZE_CAPSULE_INSTALL_DIR:-$HOME/.local/bin}"

case "$(uname -s)" in
  Linux) os="linux" ;;
  Darwin) os="macos" ;;
  *) echo "Freeze Capsule supports Linux and macOS. On Windows, use install.ps1." >&2; exit 1 ;;
esac
case "$(uname -m)" in
  x86_64|amd64) arch="x86_64" ;;
  arm64|aarch64) arch="aarch64" ;;
  *) echo "Unsupported processor: $(uname -m)" >&2; exit 1 ;;
esac
if [ "$os" = "linux" ] && [ "$arch" = "aarch64" ]; then
  echo "The current Linux release supports x86_64. Build from source on Linux ARM." >&2
  exit 1
fi

if [ "$VERSION" = "latest" ]; then
  base="https://github.com/$REPO/releases/latest/download"
else
  base="https://github.com/$REPO/releases/download/$VERSION"
fi
asset="freeze-capsule-$os-$arch.tar.gz"
tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT INT TERM
curl -fL "$base/$asset" -o "$tmp_dir/$asset"
curl -fL "$base/SHA256SUMS" -o "$tmp_dir/SHA256SUMS"
expected="$(awk -v name="$asset" '$2 == name {print $1}' "$tmp_dir/SHA256SUMS")"
[ -n "$expected" ] || { echo "No checksum was published for $asset." >&2; exit 1; }
actual="$(sha256sum "$tmp_dir/$asset" 2>/dev/null | awk '{print $1}' || shasum -a 256 "$tmp_dir/$asset" | awk '{print $1}')"
[ "$actual" = "$expected" ] || { echo "Checksum verification failed." >&2; exit 1; }
tar -xzf "$tmp_dir/$asset" -C "$tmp_dir"
mkdir -p "$INSTALL_DIR"
install -m 0755 "$tmp_dir/freeze-capsule" "$INSTALL_DIR/freeze-capsule"
echo "Installed freeze-capsule to $INSTALL_DIR/freeze-capsule"
echo "Run: freeze-capsule demo"
if [ "$os" = "linux" ]; then echo "Then start the watcher: freeze-capsule install-service"; fi
