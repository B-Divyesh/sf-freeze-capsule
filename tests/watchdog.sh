#!/bin/sh
set -eu

cargo build --quiet
watch_dir="$(mktemp -d)"
watch_pid=""
cleanup() {
  if [ -n "$watch_pid" ]; then kill "$watch_pid" 2>/dev/null || true; fi
  rm -rf "$watch_dir"
}
trap cleanup EXIT INT TERM

target/debug/freeze-capsule --capsule-dir "$watch_dir" watch --interval 1 --timeout 2 >"$watch_dir/watch.log" 2>&1 &
watch_pid="$!"

attempt=0
while [ ! -f "$watch_dir/prebuffer.fcap" ] && [ "$attempt" -lt 50 ]; do
  sleep 0.1
  attempt=$((attempt + 1))
done
[ -f "$watch_dir/prebuffer.fcap" ] || { echo "watcher did not create a prebuffer" >&2; exit 1; }

kill -STOP "$watch_pid"
sleep 3
kill -CONT "$watch_pid"

attempt=0
while ! find "$watch_dir" -maxdepth 1 -name 'capsule-*.fcap' | grep -q . && [ "$attempt" -lt 50 ]; do
  sleep 0.1
  attempt=$((attempt + 1))
done
capsule="$(find "$watch_dir" -maxdepth 1 -name 'capsule-*.fcap' | head -n 1)"
[ -n "$capsule" ] || { echo "watcher did not promote the pre-freeze snapshot" >&2; exit 1; }
target/debug/freeze-capsule --capsule-dir "$watch_dir" render "$capsule" --format json | grep -q 'watchdog-gap-'
echo "watchdog gap promotion: ok"
