# Landing-page copy audit

Count method: whitespace-separated visible words. Labels, controls, success
states, and error states are included when they communicate meaning. No
sentence is over 22 words. The landing page contains none of the banned
marketing words.

| Copy | Words | Evidence or audit note |
| --- | ---: | --- |
| Skip to main content | 4 | Skip link |
| Freeze Capsule | 2 | Wordmark |
| Demo / Install / Privacy | 1 each | Navigation |
| Linux freeze evidence tool | 4 | Product label |
| Save freeze clues before you reboot | 6 | First-screen headline |
| For desktop Linux users who need graphics, kernel, process, and session context after a freeze. | 15 | First-screen audience |
| Try it with sample data | 5 | `sample-report` action |
| See a redacted report in one click. | 7 | `sample-report` |
| Free and open source | 4 | `free-license` |
| Demo data stays separate | 4 | `demo-private` |
| Keeps at most eight capsules | 5 | `bounded-retention` |
| Evidence sources: journal, graphics, processes, and display session. | 8 | Art caption |
| Included command-line sample | 3 | Sample label |
| See the sample report before installing | 6 | Section heading |
| View the sample report | 4 | Result-naming action |
| This browser report comes from the included command-line demo. | 9 | `sample-fixture` |
| Three steps | 2 | Process label |
| How Freeze Capsule keeps pre-freeze evidence | 6 | Section heading |
| Keep one snapshot current | 4 | Step heading |
| The watcher records a ten-minute window every 30 seconds. | 9 | `rolling-snapshot` |
| Keep the snapshot when the watcher pauses | 7 | Step heading |
| A 90-second pause keeps the last completed snapshot. | 9 | `watchdog-gap` |
| Create a redacted report | 4 | Step heading |
| The report removes home paths, email addresses, IP addresses, and common secrets. | 12 | `redaction-coverage` |
| Install the Linux watcher | 4 | Section heading |
| Install Freeze Capsule, then choose when to start the watcher. | 10 | Install instruction |
| Copy command / Copied | 2 / 1 | Result-naming action and success state |
| Install command copied. | 3 | Clipboard success status |
| Could not copy. | 3 | Clipboard error |
| Select the command and copy it manually. | 8 | Clipboard recovery step |
| Find a package on GitHub, or check the published release. | 10 | Download instruction |
| Open Linux releases / Check published packages | 3 / 3 | Download actions |
| Checking the GitHub release… | 4 | Loading state |
| Packages are ready. | 3 | Successful lookup state; version is prepended |
| Linux was detected. | 3 | Detected-platform state |
| Package check failed. | 3 | Lookup error |
| Open the GitHub release page to see current files. | 10 | Lookup recovery step |
| Find Linux .deb on GitHub / Find Linux .rpm on GitHub | 5 / 5 | Honest external links |
| Find macOS .pkg on GitHub / Find Windows .zip on GitHub | 5 / 5 | Honest external links |
| Start and check the watcher | 5 | Section heading |
| On Linux, use these commands to set up, check, or trigger the watcher. | 13 | Linux instruction |
| Know the capture limits | 4 | Section heading |
| A hard freeze can stop capture. | 6 | `hard-freeze-limit` |
| The last completed snapshot remains available. | 7 | `hard-freeze-limit` |
| Log access follows your account. | 5 | `limited-source-report` |
| Unavailable sources appear in the report. | 6 | `limited-source-report` |
| Review before sharing. | 3 | Direct instruction |
| Redaction does not remove every machine detail. | 7 | `redaction-limits` |
| Freeze Capsule · Save Linux freeze clues before reboot. | 8 | Footer |
| Terms / Built by Param Factory / v0.1.1 · build 2026.08 | 1 / 4 / 3 | Footer navigation and build id |

First-screen read-aloud: “Save freeze clues before you reboot. For desktop
Linux users who need graphics, kernel, process, and session context after a
freeze. Try it with sample data. See a redacted report in one click.”

## Terminology

| Concept | One word used |
| --- | --- |
| Encrypted evidence file | capsule |
| Human-readable output | report |
| Background process | watcher |
| Latest replaceable evidence | snapshot |
| Kept evidence after a trigger | saved capsule |
| Shipped test scenario | sample |
| Browser test state | demo |
