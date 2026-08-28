#!/bin/sh
set -eu

if command -v pwsh >/dev/null 2>&1; then
  command -v pwsh
  exit 0
fi

repo_root="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
version="7.6.5"
cache_dir="$repo_root/.tools/powershell-$version"
binary="$cache_dir/pwsh"

if [ ! -x "$binary" ]; then
  archive_dir="$(mktemp -d)"
  trap 'rm -rf "$archive_dir"' EXIT INT TERM
  archive="$archive_dir/powershell.tar.gz"
  url="https://github.com/PowerShell/PowerShell/releases/download/v$version/powershell-$version-linux-x64.tar.gz"
  expected="b34ab3b19acac1d3d4d0d3cfdb02acf62f457b0b6a962ff008132033f7566844"
  curl -fL "$url" -o "$archive"
  actual="$(sha256sum "$archive" | awk '{print $1}')"
  [ "$actual" = "$expected" ] || { echo "PowerShell test runner checksum failed." >&2; exit 1; }
  mkdir -p "$cache_dir"
  tar -xzf "$archive" -C "$cache_dir"
  chmod 0755 "$binary"
fi

printf '%s\n' "$binary"
