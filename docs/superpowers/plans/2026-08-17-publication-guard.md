# Publication Guard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Detect stale briefing releases before they silently persist and request one low-cost recovery check every morning.

**Architecture:** A Node 11-compatible guard parses the static page's publication dates and optionally verifies the committed branch and public Pages output. A recovery wrapper invokes the local guard at 9:00, records at most one stale notice per China date, and never fetches news or invokes a model itself.

**Tech Stack:** Node.js CommonJS, Git CLI, curl, macOS launchd.

## Global Constraints

- Timezone is `Asia/Shanghai`.
- Normal daily checks must not collect news, generate pages, or invoke a model.
- A stale or unverified release must exit nonzero and must not be reported as published.
- Scripts must support the installed Node.js 11.5 runtime.

---

### Task 1: Add local publication-date validation

**Files:**
- Create: `scripts/publication-guard.mjs`
- Create: `tests/publication-guard.test.mjs`

**Interfaces:**
- Produces: `node scripts/publication-guard.mjs --date YYYY-MM-DD [--site PATH]`
- Exit `0` only when the document includes both matching publication day and China-time yesterday range.

- [ ] **Step 1: Write the failing test**

```js
const result = runGuard('2026-08-18', fixtureWith('2026.08.17', '08.16'));
assert.strictEqual(result.status, 1);
assert.match(result.stderr, /STALE_LOCAL/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/publication-guard.test.mjs`

Expected: failure because `publication-guard.mjs` does not exist.

- [ ] **Step 3: Write minimal implementation**

Parse `--date`, load the page, derive the expected previous date in `Asia/Shanghai`, and return `STALE_LOCAL` when either static date is absent.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/publication-guard.test.mjs`

Expected: valid fixture passes; stale fixture exits `1`.

### Task 2: Add remote and Pages verification

**Files:**
- Modify: `scripts/publication-guard.mjs`
- Modify: `tests/publication-guard.test.mjs`

**Interfaces:**
- Adds: `--remote` and `--pages` flags.
- Exit `1` if `git ls-remote` cannot confirm `origin/main`, or the public page does not contain the expected publication date.

- [ ] **Step 1: Write the failing test**

```js
const result = runGuard('2026-08-17', validFixture, ['--pages'], { page: '2026.08.07' });
assert.strictEqual(result.status, 1);
assert.match(result.stderr, /STALE_PAGES/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/publication-guard.test.mjs`

Expected: missing Pages verification returns a false success.

- [ ] **Step 3: Write minimal implementation**

Use an overridable URL command in tests and `curl -fsSL` with a cache-busting timestamp in production; print `PAGES_OK` only after content date matches.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/publication-guard.test.mjs`

Expected: stale Pages fixture fails and matching fixture passes.

### Task 3: Add one-shot morning recovery check

**Files:**
- Create: `scripts/daily-recovery.mjs`
- Create: `tests/daily-recovery.test.mjs`

**Interfaces:**
- Produces: `node scripts/daily-recovery.mjs --date YYYY-MM-DD --state PATH`
- Writes one `recovery-needed-YYYY-MM-DD.json` only when the local page is stale; subsequent same-day runs exit `0` without a duplicate notice.

- [ ] **Step 1: Write the failing test**

```js
const first = runRecovery('2026-08-18', staleSite, stateDir);
assert.strictEqual(first.status, 2);
assert.ok(fs.existsSync(path.join(stateDir, 'recovery-needed-2026-08-18.json')));
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/daily-recovery.test.mjs`

Expected: failure because recovery script is absent.

- [ ] **Step 3: Write minimal implementation**

Call the guard in local-only mode, atomically create the date-specific request, and print `RECOVERY_NEEDED`; return `0` if already published or already requested.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/daily-recovery.test.mjs`

Expected: first stale run returns `2`; repeated stale run does not create another notice; valid page returns `0`.

### Task 4: Install and verify the macOS schedule

**Files:**
- Create: `scripts/install-publication-guard.sh`
- Create: `~/Library/LaunchAgents/com.chenyao.commercial-briefing.guard.plist`

**Interfaces:**
- Installs the LaunchAgent with `StartCalendarInterval` at 09:00 and logs to `/tmp/chenyao-commercial-briefing-guard.log`.

- [ ] **Step 1: Write the failing test**

```sh
test -f "$HOME/Library/LaunchAgents/com.chenyao.commercial-briefing.guard.plist"
plutil -lint "$HOME/Library/LaunchAgents/com.chenyao.commercial-briefing.guard.plist"
```

- [ ] **Step 2: Run test to verify it fails**

Expected: no briefing-specific plist exists.

- [ ] **Step 3: Write minimal implementation**

Create the plist through the installer, run recovery with the repo as working directory, then load it with `launchctl bootstrap gui/$(id -u)`.

- [ ] **Step 4: Run verification**

Run: `plutil -lint ...` and `launchctl print gui/$(id -u)/com.chenyao.commercial-briefing.guard`.

Expected: a valid plist and loaded service.
