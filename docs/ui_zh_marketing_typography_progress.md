## Progress Log

### 2026-05-10

#### Step 0: Plan and Baseline Recorded

Status: completed

Completed:

- Wrote the full Chinese marketing typography plan
- Recorded current website issues and boundaries
- Created a rollback snapshot at [ui_rollback/2026-05-10_pre_zh_marketing_typography](/Users/peak/Projects/GuruBoxAI/docs/ui_rollback/2026-05-10_pre_zh_marketing_typography)

Notes:

- This round only targets Chinese marketing pages
- Product tool Chinese typography is intentionally deferred

#### Step 1: Global Chinese Token Pass

Status: completed

Completed:

- Add Chinese-only font stack and typography overrides
- Normalize Chinese H1/H2/H3/body/kicker rules

Notes:

- Added a Chinese-only marketing scope and chrome scope
- Introduced stable Chinese typography overrides for hero, section, body, and label layers
- Kept English and other locales on the existing default system

#### Step 2: Shared Marketing Component Pass

Status: completed

Completed:

- Scope Chinese marketing typography to shared marketing pages
- Update hero, section, narrative, and visual titles

Notes:

- Chinese marketing pages now render inside a dedicated typography scope wrapper
- Hero title, hero visual title, narrative section titles, aside titles, and shared copy blocks now map to Chinese-specific rules

#### Step 3: Card and Chrome Pass

Status: completed

Completed:

- Update card titles, FAQ, process, sample, navbar, and footer

Notes:

- Card, FAQ, process, example, and snapshot titles now use the shared Chinese card-title treatment
- Navbar and footer Chinese marketing text now use the dedicated chrome scope
- Footer title, links, CTA text, and nav labels now participate in the Chinese system

#### Step 4: Validation

Status: in_progress

Completed so far:

- Run build
- Verify the new Chinese scope selectors are wired into marketing routes and marketing chrome

Pending:

- Validate key Chinese marketing pages
- Record regressions or next-step issues

Results:

- `npm run build` passed
- No route-level regression was introduced in the marketing page tree
- Existing local production-env warnings remain unchanged and are unrelated to this typography pass
- Visual runtime QA is still pending and should be completed against the local dev instance with screenshots

#### Step 5: Chinese Line-Height Calibration

Status: completed

Reason:

- Runtime screenshot review shows that some Chinese title contexts still feel too tight
- The missed hotspots are the hero visual title, multi-line section headings, and some two-line card titles

Completed:

- Raise line-height for Chinese section headings
- Raise line-height for Chinese card titles and visual titles
- Add more targeted Chinese spacing for compact copy blocks where needed

Results:

- Chinese hero visual title line-height increased further
- Chinese section-heading line-height increased further
- Chinese card-title, compact-copy, and aside-title spacing increased further
- `npm run build` passed after calibration
