#!/bin/sh
set -eu

cargo build --quiet
work_dir="$(mktemp -d)"
cleanup() { rm -rf "$work_dir"; }
trap cleanup EXIT INT TERM

cc -shared -fPIC -o "$work_dir/no-network.so" tests/no-network.c
normal_dir="$work_dir/normal-capsules"
output="$(LD_PRELOAD="$work_dir/no-network.so" FREEZE_CAPSULE_DIR="$normal_dir" target/debug/freeze-capsule --json demo)"

printf '%s' "$output" | grep -q '"temporary":true'
[ ! -e "$normal_dir" ] || { echo "demo wrote to the normal capsule directory" >&2; exit 1; }
echo "cli demo local-only: ok"
