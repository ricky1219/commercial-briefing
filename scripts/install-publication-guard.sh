#!/bin/bash
set -eu

label='com.chenyao.commercial-briefing.guard'
target="$HOME/Library/LaunchAgents"
load_agent=1

while [ "$#" -gt 0 ]; do
  case "$1" in
    --target) target="$2"; shift 2 ;;
    --no-load) load_agent=0; shift ;;
    *) echo "Unknown argument: $1" >&2; exit 64 ;;
  esac
done

repo="$(cd "$(dirname "$0")/.." && pwd -P)"
node_bin="$(command -v node)"
plist="$target/$label.plist"
mkdir -p "$target"

xml_escape() {
  printf '%s' "$1" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g; s/'\''/\&apos;/g'
}

repo_xml="$(xml_escape "$repo")"
node_xml="$(xml_escape "$node_bin")"
plist_xml="$(xml_escape "$plist")"

printf '%s\n' '<?xml version="1.0" encoding="UTF-8"?>' \
'<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">' \
'<plist version="1.0">' \
'<dict>' \
"  <key>Label</key><string>$label</string>" \
'  <key>ProgramArguments</key>' \
'  <array>' \
"    <string>$node_xml</string>" \
"    <string>$repo_xml/scripts/daily-recovery.mjs</string>" \
'    <string>--site</string>' \
"    <string>$repo_xml/index.html</string>" \
'    <string>--state</string>' \
"    <string>$repo_xml/.publication-guard</string>" \
'  </array>' \
"  <key>WorkingDirectory</key><string>$repo_xml</string>" \
'  <key>StartCalendarInterval</key>' \
'  <dict><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>' \
"  <key>StandardOutPath</key><string>/tmp/chenyao-commercial-briefing-guard.log</string>" \
"  <key>StandardErrorPath</key><string>/tmp/chenyao-commercial-briefing-guard.log</string>" \
'  <key>ProcessType</key><string>Background</string>' \
'</dict>' \
'</plist>' > "$plist"

plutil -lint "$plist" >/dev/null
echo "INSTALLED $plist_xml"

if [ "$load_agent" -eq 1 ]; then
  uid="$(id -u)"
  launchctl bootout "gui/$uid/$label" 2>/dev/null || true
  launchctl bootstrap "gui/$uid" "$plist"
  echo "LOADED $label"
fi
