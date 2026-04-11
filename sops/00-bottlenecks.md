# 00 — Bottleneck Analysis

A strategic map of where DispoBuddy chokes today, why, and the SOPs + system changes that unclog each one. Read this right after [index.md](./index.md) and before any individual SOP — it explains **why** each SOP is shaped the way it is.

Every bottleneck below has the same structure:

- **Symptom** — what you see when it's broken
- **Root cause** — why it breaks
- **Cost** — what it costs in deals, money, or time
- **Solution** — how to unclog it
- **Owner** — who is responsible for the fix
- **Fix via SOPs** — cross-links to the SOPs that operationalize the fix
- **Status** — Open / In progress / Closed

---

## B1 — Underwriting is single-threaded on the founder

- **Symptom:** Every new deal submission lands in Brooke's inbox. If Brooke is on a call, in a closing, or on vacation, the 24–48 hour review SLA slips. Partners feel it, and resubmissions dry up.
- **Root cause:** No deterministic pass/fail rubric. Underwriting is a judgment call that lives in Brooke's head. A VA can pull comps but can't make the decision.
- **Cost:** SLA misses, churned partners, lost reputation in the "no ghosting" promise on the site.
- **Solution:**
  1. Publish a **pass/fail rubric per deal type** (cash, sub-to, seller finance, novation, hybrid) with hard thresholds for spread %, fee-to-ARV ratio, and minimum comp count. This is SOP 02.
  2. Build an **auto-calc sheet** (Google Sheet or Airtable) that ingests the fields from the submit form and flags: green (auto-accept), yellow (needs Brooke), red (auto-decline with reason).
  3. **Fast-lane** green deals directly to "Accepted — Package" stage without Brooke involvement. Only yellow grey-area deals and red edge cases require her.
  4. A **comp-pulling sub-SOP** (inside SOP 02) that names the tool, the process, and what counts as an acceptable comp — so a VA can do the legwork identically every time.
- **Owner:** Brooke
- **Fix via SOPs:** [02 — Deal Underwriting](./02-deal-underwriting.md), [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md)
- **Status:** Open

---

## B2 — Deal → buyer matching is manual and memory-based

- **Symptom:** Brooke matches deals to buyers from memory. Newer buyers get forgotten. A VA can't replicate the intuition. When matching takes too long, the deal goes stale.
- **Root cause:** GHL's smart lists are underused. The buyer custom fields in `netlify/functions/buyer-demand.js` (TARGET_STATES, TARGET_CITIES, DEAL_STRUCTURES, PROPERTY_TYPE, MAX_PRICE, MAX_ENTRY, MIN_ARV, EXIT_STRATEGIES, BUYER_TYPE, PURCHASE_TIMELINE) exist — but they aren't filled in consistently on every buyer record, so queries return garbage.
- **Cost:** 2–3 extra days per deal spent "thinking about" which buyer to call. Missed matches. Deals die in inventory.
- **Solution:**
  1. Make every field above **required** on every new buyer intake (SOP 09).
  2. Build **one GHL smart list per (state × deal structure)** so matching queues are pre-built and reusable.
  3. Set up an **auto-outreach workflow** in GHL: when a deal moves to "Accepted — Package," the workflow automatically pulls buyers whose criteria intersect with the deal and fires a templated SMS + email with merge tags.
  4. Build a **matched buyer count** custom field on each opportunity so the dashboard shows "how many buyers this deal is in front of" at a glance.
  5. Retroactively clean up every buyer currently missing required fields (SOP 10).
- **Owner:** Brooke (for GHL automation setup) + Dispo VA (for retroactive cleanup)
- **Fix via SOPs:** [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md), [09 — Buyer Network Intake](./09-buyer-network-intake.md), [10 — Buyer Network Hygiene](./10-buyer-network-hygiene.md)
- **Status:** Open

---

## B3 — Buybox is not collected consistently across asset types

- **Symptom:** A cash SFR flipper, a sub-to assumption buyer, a small-multi landlord, a mobile home park buyer, and a land investor all need *different* data captured. The current buyer intake is one-size-fits-all, so matching is mediocre for everything that isn't a vanilla cash SFR.
- **Root cause:** No canonical "what to ask a buyer" per asset class. Brooke adapts on the fly during intake calls, so every buyer record looks slightly different.
- **Cost:** Low-confidence matches. Buyers get sent deals they'd never touch, stop opening our texts. Partners see slower dispo.
- **Solution:**
  1. Define the **canonical buybox per asset class** (see SOP 09 for the full list). Each class gets its own required fields:
     - **SFR flip** → max repair budget, min post-rehab ROI, target neighborhood class (A/B/C/D)
     - **SFR buy-and-hold** → min rent, min cap rate, min DSCR, property condition tolerance
     - **Small multi (2–4)** → min cap rate, min cash-on-cash, unit mix, value-add appetite
     - **Large multi (5+)** → min cap rate, IRR target, LP/GP structure, syndication or direct
     - **Land** → zoning type, acreage range, entitled vs raw, utility access
     - **Mobile home / MHP** → lot count, park-owned homes, utilities, city vs private
     - **Commercial** → asset sub-type (retail, office, industrial, mixed), cap rate, lease term
     - **Sub-to** → max UPB, min equity, down payment available, entity type
     - **Novation** → max entry, retail resale timeline, marketing budget
     - **Seller finance** → max loan amount, min cap rate, balloon tolerance
  2. Implement an **asset-type-specific intake form** (mirror the conditional sub-to / SF block pattern already in `submit-deal.html`) so the intake VA can't skip relevant fields.
  3. **Quarterly buybox refresh:** an outbound sweep asking every active buyer to re-confirm their criteria (see SOP 10). Criteria drift fast.
  4. Tag buyers with `asset_type:*` tags so matching queries can filter by `asset_type × state × deal_structure`.
- **Owner:** Brooke (defines rubrics) + Dispo VA (executes intakes)
- **Fix via SOPs:** [09 — Buyer Network Intake](./09-buyer-network-intake.md), [10 — Buyer Network Hygiene](./10-buyer-network-hygiene.md)
- **Status:** Open

---

## B4 — Partner onboarding has no education layer

- **Symptom:** The `/join` form creates a GHL contact and fires a welcome SMS, but nothing teaches the new partner what a *complete* deal submission looks like. Their first deal arrives with no photos, no comps, no mortgage info. Underwriting bounces it back. Partner gets frustrated and disappears.
- **Root cause:** The welcome flow is a single SMS. No drip, no library, no gated first-deal checklist.
- **Cost:** ~40% of first-time partners never submit a second deal. Every bounced first deal also inflates the underwriting queue (see B1).
- **Solution:**
  1. **7-day partner welcome drip** in GHL:
     - Day 0: welcome SMS + email with intro video
     - Day 1: "how to submit a great deal" guide
     - Day 2: sample deal sheet PDF (so they see what we produce)
     - Day 3: buybox explainer (what our buyers want)
     - Day 5: intro-call offer with Brooke
     - Day 7: first-deal nudge
  2. **Loom library:** a 2-minute video for each deal type showing the info to gather before submitting.
  3. **Deal readiness checklist** shown as a gate on the submit form: "Check each box before you submit."
- **Owner:** Brooke (content creation) + Dispo VA (GHL workflow setup)
- **Fix via SOPs:** [08 — Partner Onboarding](./08-partner-onboarding.md), [14 — Partner Communication](./14-partner-communication.md)
- **Status:** Open

---

## B5 — Incomplete deal submissions force back-and-forth

- **Symptom:** Partners submit without photos, without comps, without the Drive link. Underwriter has to text "hey, missing X" and wait. Meanwhile the clock is running on the 24–48hr SLA.
- **Root cause:** The submit form in `submit-deal.html` accepts partial data. Photo + docs links are optional, not required.
- **Cost:** Average first-touch-to-decision time is 2× what it should be. SLA slips.
- **Solution:**
  1. **Harden required fields** on `submit-deal.html`. Drive/Dropbox photo link becomes required. Contract docs link becomes required once "Under Contract = Yes."
  2. **Auto-reminder SMS** 12 hours after submission if deal status is still "Needs Info" (GHL workflow).
  3. **Deal completeness score** shown live on the form — partner sees what's missing before they can click submit.
- **Owner:** Brooke (form spec + GHL workflow)
- **Fix via SOPs:** [01 — Deal Intake & Triage](./01-deal-intake-triage.md), [16 — Website & Functions Deploy](./16-website-functions-deploy.md)
- **Status:** Open

---

## B6 — JV agreement generation is manual

- **Symptom:** Every JV agreement is hand-assembled in DocuSign. Brooke types the partner name, property address, split percentages, and fee structure each time. That 15-minute job sits between "Accepted" and "Marketing," so every deal loses up to a day waiting for Brooke to find 15 free minutes.
- **Root cause:** No DocuSign template with merge fields. No automation wiring GHL → DocuSign.
- **Cost:** ~1 day lost per deal. 200 deals/year × 1 day = ~200 days of compressible time-in-pipeline.
- **Solution:**
  1. **DocuSign template** with merge fields for: partner name, partner email, property address, contracted price, assignment fee, split %, close date, entity.
  2. **Zapier/Make automation:** opportunity moves to "Accepted" → DocuSign sent → partner + Brooke signed copy filed in GHL contact + Drive.
  3. **One-click sign link** pasted into the partner confirmation SMS.
- **Owner:** Brooke
- **Fix via SOPs:** [03 — JV Agreement](./03-jv-agreement.md)
- **Status:** Open

---

## B7 — Title coordination is ad-hoc per market

- **Symptom:** Every closing starts from scratch picking a title company. Some states (AZ, TX) are easy; others (NY, IL, PA) are brutal because assignment-friendly closers are rare.
- **Root cause:** No preferred-title list. No checklist for day-1-of-contract. Brooke chases title on every deal.
- **Cost:** Slower closings; occasional fall-throughs when title refuses assignments.
- **Solution:**
  1. **Preferred-title list:** 2–3 assignment-friendly closers per active state (AZ, TX, FL, KY, TN, GA, OH, IN). Name, contact, avg close time, notes on quirks.
  2. **Day-1-of-contract packet:** checklist of documents sent to title within 1 business day of the buyer going under contract — purchase contract, assignment, EMD receipt, entity docs, seller contact.
  3. **48-hour title response SLA** — if title doesn't respond in 48 hours, escalate.
  4. **Partner-unresponsive escalation path** — if the partner isn't responding to title, Brooke calls directly.
- **Owner:** Brooke (builds list) + Dispo VA (maintains list)
- **Fix via SOPs:** [07 — Closing & Title Coordination](./07-closing-title-coordination.md)
- **Status:** Open

---

## B8 — GHL and Notion drift apart (dual source-of-truth problem)

- **Symptom:** A deal gets updated in GHL but not in Notion (or vice versa). Reports built off Notion don't match the pipeline in GHL. Trust in the numbers evaporates.
- **Root cause:** `dispo-buddy-submit.js` creates a Notion page on intake but never updates it afterward. Manual updates happen in GHL only.
- **Cost:** Brooke stops trusting reports and falls back to "let me just scroll through GHL" — wasting an hour a week.
- **Solution:**
  1. Declare **GHL the single source of truth**. Notion becomes a read-only reporting view.
  2. **Extend `dispo-buddy-submit.js`** (or add a new function) to push GHL opportunity stage changes into Notion via webhook so the Notion row always mirrors GHL.
  3. **Weekly reconciliation** (SOP 13) until the automation lands. VA walks every open deal, fixes any mismatch.
- **Owner:** Brooke (pipeline + automation) + Admin VA (weekly reconciliation)
- **Fix via SOPs:** [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md), [13 — Notion Deal Tracker](./13-notion-deal-tracker.md)
- **Status:** Open

---

## B9 — No lead-source attribution → marketing spend is blind

- **Symptom:** `hearAboutUs` is captured on every form but never reported on. Brooke can't tell which channel drives real closings. Marketing decisions are gut.
- **Root cause:** No attribution report. No UTM discipline on inbound links.
- **Cost:** Marketing dollars are sprayed across channels with no feedback loop.
- **Solution:**
  1. **UTM every outbound link** (social, referrals, paid, YouTube descriptions, podcast bios) with a consistent taxonomy: `utm_source`, `utm_medium`, `utm_campaign`.
  2. **Capture `utm_*`** on the submit and join forms → push to GHL custom fields.
  3. **Monthly source-attribution report:** submissions → accepted → closed-won → GCI, grouped by source. Sort descending. Cut the bottom 2, double the top 2.
- **Owner:** Brooke
- **Fix via SOPs:** [17 — Marketing & Lead Generation](./17-marketing-lead-generation.md), [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md)
- **Status:** Open

---

## B10 — Founder single-point-of-failure

- **Symptom:** If Brooke is out for a week, the business stops. No one else has access to the passwords, no one knows the decisions, no one can sign agreements.
- **Root cause:** No RACI. No documented SOPs (until now). No shared password vault. No "second in command."
- **Cost:** Existential. One Brooke emergency = a dead pipeline.
- **Solution:**
  1. **This SOP manual** is step one. Every repeatable process is now documented.
  2. **RACI matrix** in `index.md` names what a VA can own (most of deal flow except underwriting pass/fail and JV terms) vs what must stay with Brooke.
  3. **Shared password vault** (1Password or Bitwarden team) with emergency access enabled.
  4. **Brooke out-of-office protocol** — a pinned Slack/Notion doc with "if Brooke is unreachable, here is what you do for each situation" (active deal, new submission, title issue, partner complaint, payment question).
- **Owner:** Brooke
- **Fix via SOPs:** all of them; the RACI lives in [index.md](./index.md).
- **Status:** In progress (this manual is the first milestone)

---

## Priority order (what to fix first)

If you can only fix three bottlenecks this quarter, do these three in this order:

1. **B1 — Underwriting rubric** (SOP 02 + auto-calc sheet). Unblocks everything downstream and makes B10 easier.
2. **B2 — Deal → buyer matching automation** (SOPs 05 + 09 + 10). Biggest lever on closed deals per month.
3. **B4 — Partner onboarding drip** (SOP 08). Biggest lever on repeat submissions.

Everything else (B3, B5, B6, B7, B8, B9) layers on top once these three are closed.

---

## Changelog

| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial bottleneck map — B1 through B10 | Claude (on behalf of Brooke) |
