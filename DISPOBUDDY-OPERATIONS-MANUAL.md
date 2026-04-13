# DispoBuddy Operations Manual

The canonical set of standard operating procedures (SOPs) for DispoBuddy — a JV disposition partner for real estate wholesalers, bird dogs, and agents, operated as a brand of Deal Pros LLC.

**If you are new here, read this file end-to-end before opening any other SOP.** It tells you what the business does, who does what, where to find things, and which SOP to open for any given task.

---

## What DispoBuddy does

Partners (wholesalers, bird dogs, agents) send us real estate deals they have under contract. We:

1. Underwrite the deal within 24–48 hours.
2. Sign a simple, non-exclusive JV agreement with the partner.
3. Package the deal into a professional deal sheet.
4. Market it to matched buyers in our national buyer network.
5. Negotiate offers, coordinate title, and close through a title company.
6. Split the net assignment fee 50/50 with the partner at close.

We promise publicly (and these SOPs exist to make sure we actually deliver on):

- **24–48 hour review** on every submission
- **50/50 split** at close
- **$0 upfront** cost to the partner
- **Non-exclusive** JV — partners can still market the deal themselves
- **No ghosting** — we always reply with a yes, no, or "here's what's missing"

---

## Where everything lives

| System | Used for | Access |
|---|---|---|
| GoHighLevel (GHL) | CRM — single source of truth for contacts, pipeline, opportunities, SMS + email, workflows | login.leadconnectorhq.com |
| Pipeline "3. JV Deals" | Every deal opportunity flows through this pipeline | GHL → Opportunities |
| Notion | Read-only reporting view of deals (DB id `a3c0a38fd9294d758dedabab2548ff29`) | notion.so |
| DocuSign | JV agreements and amendments | docusign.com |
| Google Drive | Deal sheets, photos, contracts, HUDs, executed agreements | drive.google.com |
| Netlify | Hosts dispobuddy.com and the three form-handling functions | app.netlify.com |
| GitHub (`brooke-wq/dispobuddy-site`) | Source of truth for site code and these SOPs | github.com |
| Title companies | Closings and JV disbursement (see [07-closing-title-coordination.md](./07-closing-title-coordination.md) for the preferred list) | varies by state |
| QuickBooks | Books and payouts | qbo.intuit.com |

**Environment variables** that must be live in Netlify for the forms to work (see [16-website-functions-deploy.md](./16-website-functions-deploy.md)):

- `GHL_API_KEY`
- `GHL_LOCATION_ID`
- `NOTION_TOKEN`
- `NOTION_DB_ID`
- `INTERNAL_ALERT_PHONE`
- `INTERNAL_ALERT_EMAIL`

---

## Table of contents

### Strategic

- [00 — Bottleneck Analysis](./00-bottlenecks.md) — where the business chokes today and the SOPs + system changes that fix each one. **Read this second, right after this index.**

### A. Deal Flow (the money pipeline)

- [01 — Deal Intake & Triage](./01-deal-intake-triage.md)
- [02 — Deal Underwriting](./02-deal-underwriting.md)
- [03 — JV Agreement](./03-jv-agreement.md)
- [04 — Deal Packaging](./04-deal-packaging.md)
- [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md)
- [06 — Offer Management & Negotiation](./06-offer-management-negotiation.md)
- [07 — Closing & Title Coordination](./07-closing-title-coordination.md)

### B. Partner & Network Management

- [08 — Partner Onboarding](./08-partner-onboarding.md)
- [09 — Buyer Network Intake](./09-buyer-network-intake.md)
- [10 — Buyer Network Hygiene](./10-buyer-network-hygiene.md)
- [11 — Dead Deal / Rejection](./11-dead-deal-rejection.md)

### C. Systems & Back-Office

- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md)
- [13 — Notion Deal Tracker](./13-notion-deal-tracker.md)
- [14 — Partner Communication](./14-partner-communication.md)
- [15 — Compliance](./15-compliance.md)
- [16 — Website & Functions Deploy](./16-website-functions-deploy.md)

### D. Growth & Admin

- [17 — Marketing & Lead Generation](./17-marketing-lead-generation.md)
- [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md)
- [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md)
- [20 — Affiliate Program Management](./20-affiliate-program.md)

---

## RACI matrix (who does what)

| Activity | Brooke (Founder) | Dispo VA | Admin VA |
|---|---|---|---|
| Deal intake / triage (SOP 01) | A | R | I |
| Deal underwriting — pass/fail call (SOP 02) | **R/A** | C | — |
| Comp pulling + numbers check (SOP 02) | A | R | — |
| JV agreement generation + send (SOP 03) | A | R | — |
| JV agreement terms negotiation (SOP 03) | **R/A** | I | — |
| Deal packaging / deal sheet (SOP 04) | A | R | C |
| Buyer matching query (SOP 05) | A | R | — |
| Buyer outreach send (SOP 05) | A | R | — |
| Offer negotiation — final say (SOP 06) | **R/A** | C | — |
| Title coordination (SOP 07) | A | R | — |
| Partner onboarding (SOP 08) | A | R | C |
| Buyer network intake call (SOP 09) | R/A | C | — |
| Buyer hygiene sweep (SOP 10) | A | R | — |
| Dead deal decline (SOP 11) | A | R | — |
| CRM hygiene (SOP 12) | A | R | R |
| Notion reconciliation (SOP 13) | A | R | — |
| Compliance recordkeeping (SOP 15) | **R/A** | I | C |
| Website + function deploys (SOP 16) | **R/A** | — | — |
| Marketing content (SOP 17) | **R/A** | C | C |
| Bookkeeping + reconciliation (SOP 18) | A | — | **R** |
| Weekly cadence review (SOP 19) | **R/A** | I | I |
| Affiliate approval + payouts (SOP 20) | **R/A** | C | **R** (payouts) |
| Affiliate fraud detection (SOP 20) | **R/A** | I | — |

R = Responsible (does the work), A = Accountable (sign-off), C = Consulted, I = Informed.

**Rule of thumb:** anything with **R/A** in bold stays with Brooke and cannot be delegated without her explicit approval. Everything else is VA-delegable once the VA has been trained against the SOP.

---

## SOP template

Every SOP in this folder follows this exact structure. When adding or updating an SOP, keep the section order.

```markdown
# NN — [SOP Title]

## Purpose
Why this SOP exists. One paragraph.

## Owner / Roles
Who runs it. Who owns the decision. Who gets consulted.

## Trigger
What kicks off this procedure. (Form submission, CRM stage change, weekly cadence, etc.)

## Inputs required
What you must have in front of you before starting.

## Tools & systems used
GHL, Notion, DocuSign, Drive, title, etc.

## Step-by-step procedure
1. Numbered. Prescriptive. Copy-pasteable where possible.
2. ...

## Templates & scripts
SMS, email, call scripts — ready to paste.

## SLAs / quality standards
Response times, quality bar, definition-of-done.

## Escalation / edge cases
When to stop and get Brooke. Decision tree for grey areas.

## Related SOPs
Cross-links to other SOPs that touch this workflow.

## Changelog
Date — what changed — who changed it.
```

---

## How to read / use this manual

**As a new VA on day 1:**
1. Read this `index.md`.
2. Read `00-bottlenecks.md` — you'll understand *why* each SOP exists.
3. Read the SOPs for the role you're filling in the RACI matrix above.
4. Shadow Brooke (or another VA) on 3 live deals before executing solo.
5. Execute solo with every step checked against the SOP.
6. When you hit an edge case the SOP doesn't cover, **stop and escalate to Brooke**. Then — after resolution — propose an SOP edit so the next person doesn't hit it.

**As Brooke reviewing weekly:**
- Run SOP [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md) every Monday morning. It's the master review checklist.

**As a developer changing the site or functions:**
- Follow SOP [16 — Website & Functions Deploy](./16-website-functions-deploy.md). Don't skip the post-deploy smoke test.

---

## Glossary

- **JV** — joint venture. The contractual arrangement where DispoBuddy and the deal-submitter split the assignment fee 50/50.
- **Dispo** — disposition, i.e. finding a buyer for a deal that's already under contract.
- **Wholesaler** — someone who locks up a property with a purchase contract and assigns that contract to an end buyer for a fee.
- **Bird dog** — someone who finds off-market deals and refers them to a wholesaler or investor.
- **Assignment fee** — the fee paid to the wholesaler (or JV team) when the purchase contract is assigned to an end buyer.
- **ARV** — after-repair value. The value of the property after renovations.
- **Sub-to** — subject-to. Taking over a property subject to the existing mortgage.
- **Seller finance (SF)** — the seller acts as the lender; buyer pays the seller directly over time.
- **Novation** — a new agreement that replaces the existing one; often used to sell retail while the owner is still on title.
- **Morby Method / Stack** — a creative finance technique (DSCR + seller finance + sub-to) popularized by Matt Morby.
- **Hybrid** — any combination of cash + creative finance on a single deal.
- **Buybox** — the set of criteria that defines what deals a specific buyer will purchase.
- **GHL** — GoHighLevel, our CRM.
- **COE** — Close of Escrow, the target closing date.
- **EMD** — Earnest Money Deposit.
- **HUD** / **settlement statement** / **CD** — the final document showing all money movement at closing.

---

## Changelog

| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial SOP manual created — 19 SOPs + bottleneck analysis + RACI | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

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

---

<!-- PAGE BREAK -->

# 01 — Deal Intake & Triage

## Purpose
Every public promise we make — 24–48 hour review, no ghosting, fast decisions — lives or dies in the first two hours after a deal hits the system. This SOP makes sure every submission is verified, logged, acknowledged, assigned to a reviewer, and on the SLA clock, without dropping anything.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA
- **Informed:** Brooke (via automated internal alert)

## Trigger
A partner submits the form at `/submit-deal`. This fires `netlify/functions/dispo-buddy-submit.js`, which:
1. Upserts a GHL contact
2. Applies tags
3. Creates an opportunity in pipeline "3. JV Deals" at stage "New JV Lead"
4. Creates a Notion page
5. Sends automated confirmation SMS + email to the partner
6. Sends automated internal SMS + email alerts to Brooke (`INTERNAL_ALERT_PHONE` / `INTERNAL_ALERT_EMAIL`)
7. Adds a note to the GHL contact
8. Fires a first-deal welcome SMS if `is_this_your_first_deal_with_dispo_buddy = Yes`

**The Dispo VA is responsible for verifying every one of those steps actually happened and taking over from there.**

## Inputs required
- Internal alert SMS/email (confirms something happened)
- GHL access
- Notion access
- Drive folder template

## Tools & systems used
- GHL → Conversations, Contacts, Opportunities
- Notion → DispoBuddy Deals database
- Google Drive → `/DispoBuddy/Deals/YYYY/` folder
- Netlify logs (only if something failed)

## Step-by-step procedure

When you receive the internal alert SMS ("New JV Deal: …"):

### Step 1 — Verify the automated pipeline fired correctly
1. **Open GHL → Opportunities → 3. JV Deals → New JV Lead.**
2. Find the new opportunity. Confirm:
   - [ ] Contact is created/updated with correct name, phone, email
   - [ ] Tags are applied (role, source, first_deal if applicable)
   - [ ] Opportunity has the property address in its name
   - [ ] Monetary value field is populated (asking price)
   - [ ] Partner confirmation SMS shows in the conversation log
   - [ ] Partner confirmation email shows in the conversation log
3. **Open Notion → DispoBuddy Deals.** Confirm a new row was created matching this submission. If not, flag [SOP 13](./13-notion-deal-tracker.md) — create manually.
4. **If any of the above is missing:** check Netlify function logs for `dispo-buddy-submit`. Screenshot the error and escalate to Brooke. Then recreate the missing pieces by hand.

### Step 2 — Assess completeness
Open the opportunity in GHL and pull the submission data. Check for the required fields below. Mark the deal's **Status** based on what's there.

**Required for any deal:**
- [ ] Partner name, phone, email
- [ ] Property address (full: street, city, state, ZIP)
- [ ] Under contract? Y/N
- [ ] Deal type selected
- [ ] Contract price OR asking price
- [ ] Occupancy status
- [ ] Close of escrow date
- [ ] Photo link
- [ ] Contract/docs link (if under contract)

**Required for sub-to or seller finance:**
- [ ] Existing mortgage balance
- [ ] Interest rate
- [ ] Monthly payment
- [ ] Lender
- [ ] (SF only) loan term, balloon

**If any required field is missing:**
- Move opportunity to **Needs Info** stage
- Tag opportunity `needs_info`
- Send the appropriate "Needs Info" SMS from [SOP 14](./14-partner-communication.md)
- Do NOT start the 24–48hr clock until the info is in

**If everything is there:**
- Move opportunity to **Under Review** stage
- Tag `under_review`
- Start the 24–48hr SLA clock (note the decision deadline in the opportunity custom field `Decision Deadline`)

### Step 3 — Create the deal folder in Drive
1. Navigate to `/DispoBuddy/Deals/YYYY/`.
2. Create a new folder: `YYYY-MM-DD — [City, ST] — [Partner Last Name] — [Street Address]`.
3. Copy the template sub-folders:
   ```
   /01 — Submission (submission form export + any attachments)
   /02 — Contracts (purchase contract, amendments, rider)
   /03 — Photos (from partner)
   /04 — Comps (our comp pulls)
   /05 — Deal Sheet (what we market, see SOP 04)
   /06 — Buyer Outreach (who we contacted)
   /07 — Offers (what came back)
   /08 — Title & Closing (title docs, HUD)
   /09 — JV Agreement (executed)
   ```
4. Drop the partner's submitted photo/docs links into `/01 — Submission/` as a README.md with the links.
5. Link the folder URL to the GHL opportunity's `Drive Folder` custom field.
6. Link the folder URL to the Notion row's `Drive Folder` property.

### Step 4 — Assign the reviewer
1. Default reviewer: **Brooke** (until an underwriting VA is hired and trained).
2. Assign the opportunity to the reviewer in GHL (Owner field).
3. In the opportunity's note log, paste:
   ```
   [YYYY-MM-DD HH:MM] [your initials] — Triaged. Completeness: [COMPLETE / NEEDS INFO]. Moved to [stage]. Reviewer: Brooke. Decision deadline: [YYYY-MM-DD HH:MM].
   ```

### Step 5 — Hand off to underwriting
- Text Brooke in the daily ops thread: `New deal: [City, ST] — [deal type] — [asking] — review deadline [time]`.
- The deal is now in Brooke's court per [SOP 02 — Deal Underwriting](./02-deal-underwriting.md).

### Step 6 — Watch the SLA clock
Every 4 hours until a decision is made:
- Is the deal still in "Under Review"? Is it past 20 hours with no decision? Ping Brooke.
- Is it in "Needs Info" with no partner response after 12 hours? Send the follow-up SMS per [SOP 14](./14-partner-communication.md).

## Templates & scripts

**Confirmation that triage is complete (internal note):**
```
[YYYY-MM-DD HH:MM] [initials] — Triage complete. Pipeline stage: Under Review. All required fields present. Drive folder created: [url]. Reviewer: Brooke. Decision deadline: [YYYY-MM-DD HH:MM].
```

**Partner ping — missing info (choose from [SOP 14](./14-partner-communication.md) library):**
See the "Needs Info" SMS templates.

**Escalation — automated pipeline failed:**
```
ESC — dispo-buddy-submit function failed for [partner/property]. Error: [paste]. I've manually created the GHL contact + opportunity + Notion row. Need you to investigate the function.
```

## SLAs / quality standards
- **Triage complete** within **2 hours** of submission during business hours, or by 10 AM next business day.
- **All required fields checked** on every intake. Never start an SLA clock on a deal that's missing info.
- **Drive folder created** for every single deal, even the ones that will obviously decline — we want the paper trail.
- **Internal note written** in every deal's log. No undocumented triage.

## Escalation / edge cases
- **Duplicate submission** (same partner, same address, within 7 days) — merge into the existing opportunity, add a note explaining the merge, reply to the partner acknowledging the duplicate.
- **Partner submitted a deal they're not the original contract holder on** — tag `assignment_of_assignment`, escalate to Brooke + [SOP 15](./15-compliance.md).
- **Deal is outside our active markets** — still triage, still underwrite; Brooke will decide on a case-by-case basis.
- **Partner is on `do_not_contact`** — do not reply via SMS. Route to Brooke; she will call.
- **Partner's consent checkbox wasn't checked** — the form should have rejected the submit. If it got through, flag [SOP 16](./16-website-functions-deploy.md) bug.

## Related SOPs
- [02 — Deal Underwriting](./02-deal-underwriting.md) (the next step)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (pipeline stage source of truth)
- [13 — Notion Deal Tracker](./13-notion-deal-tracker.md)
- [14 — Partner Communication](./14-partner-communication.md)
- [16 — Website & Functions Deploy](./16-website-functions-deploy.md) (when something fails)

## Bottleneck this SOP addresses
[B5 — Incomplete deal submissions force back-and-forth](./00-bottlenecks.md#b5--incomplete-deal-submissions-force-back-and-forth) and [B1 — Underwriting single-threaded](./00-bottlenecks.md#b1--underwriting-is-single-threaded-on-the-founder) (by filtering incomplete deals before they hit the underwriter)

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 02 — Deal Underwriting

## Purpose
Underwriting is where DispoBuddy's reputation is built and where the biggest single bottleneck in the business lives today ([B1](./00-bottlenecks.md#b1--underwriting-is-single-threaded-on-the-founder)). This SOP turns underwriting from a founder-only judgment call into a deterministic rubric a trained VA can execute for 80% of deals, with Brooke stepping in only on grey areas.

## Owner / Roles
- **Accountable:** Brooke (final pass/fail call — non-delegable)
- **Responsible (comp pulling + rubric evaluation):** Dispo VA
- **Responsible (final call):** Brooke (until an underwriting VA is trained to handle "green" deals solo)
- **Consulted:** Brooke (on any yellow/edge case)

## Trigger
A deal has been triaged and moved to "Under Review" per [SOP 01](./01-deal-intake-triage.md).

## Inputs required
- Complete deal submission (all required fields present)
- Comp-pulling tool access (PropStream OR Batch OR MLS)
- Underwriting calculator (Google Sheet — link in team vault)
- Access to our buyer demand data (the `/buyers-map` page + GHL)

## Tools & systems used
- GHL (opportunity + notes)
- PropStream / Batch / local MLS
- Google Sheet: "DispoBuddy Underwriter v1" (auto-calculates rubric)
- Drive folder for the deal (`/04 — Comps/`)

## Underwriting rubric by deal type

For every deal, run all four checks in order. The deal passes only if it clears every check with a GREEN or YELLOW result; a single RED fails the deal.

### Universal checks (all deal types)

#### Check 1 — Ownership & contract validity
- [ ] Partner has the property under a signed purchase contract (we saw it in `/02 — Contracts/`)
- [ ] Contract close date is ≥ 14 days away (enough runway to market)
- [ ] Contract is assignable (or has a rider/nominee clause that allows assignment)
- [ ] No outstanding title issues disclosed (liens, probate, pending litigation)

**RED if any of these fail.** Decline per [SOP 11](./11-dead-deal-rejection.md).

#### Check 2 — Property fundamentals
- [ ] Property type is one we sell (SFR, small multi, large multi, land, mobile, commercial — not unusual asset classes like boat slips, storage units without prior Brooke OK)
- [ ] Market has active buyers (check the buyer demand map and GHL buyer list for the state)
- [ ] Photos exist and show the property in its actual condition
- [ ] We can identify at least 3 sold comps within a 1-mile radius in the last 6 months

**YELLOW if comps are sparse (2 comps, 12 months).** Escalate to Brooke.
**RED if no comps exist** (no market). Decline.

#### Check 3 — Spread & fee analysis
Calculate the following in the underwriter sheet:

- **Spread** = `asking_price - contract_price` (what we're trying to make)
- **Spread %** = `spread / asking_price × 100`
- **ARV cushion** = `arv - asking_price`
- **ARV cushion %** = `arv_cushion / arv × 100`
- **Fee-to-ARV ratio** = `spread / arv × 100`
- **Fee-to-price ratio** = `spread / contract_price × 100`

#### Check 4 — Timeline
- [ ] Close date ≥ 14 days away
- [ ] Partner is responsive (< 4 hours to messages)
- [ ] Seller is motivated (timeline urgency, disclosed hardship, or clean exit reason)

---

### Cash assignment rubric

| Metric | GREEN (auto-pass) | YELLOW (Brooke review) | RED (auto-decline) |
|---|---|---|---|
| Spread % | ≥ 12% | 8–12% | < 8% |
| ARV cushion % | ≥ 25% | 15–25% | < 15% |
| Fee-to-ARV | ≤ 8% | 8–12% | > 12% |
| Comp count (6-mo, 1-mi) | ≥ 3 | 2 | < 2 |
| Days to COE | ≥ 21 | 14–21 | < 14 |

### Subject-to rubric

Additional sub-to metrics on top of universals:

| Metric | GREEN | YELLOW | RED |
|---|---|---|---|
| Existing UPB vs ARV | ≤ 80% | 80–90% | > 90% |
| Existing interest rate | ≤ 5% | 5–7% | > 7% |
| Payment-to-rent ratio (PITI vs market rent) | ≤ 80% | 80–100% | > 100% |
| Buyer down payment needed | ≤ $30k | $30k–$60k | > $60k |
| Due-on-sale risk (lender type) | Fannie/Freddie conventional | Portfolio/unknown | Commercial with accelerated DOS clauses |

### Seller finance rubric

| Metric | GREEN | YELLOW | RED |
|---|---|---|---|
| Seller loan amount vs ARV | ≤ 70% | 70–80% | > 80% |
| Interest rate | ≤ 5% | 5–7% | > 7% |
| Amortization / balloon | 30yr with no balloon OR ≥ 5yr balloon | 3–5yr balloon | < 3yr balloon |
| Monthly payment vs market rent | ≤ 75% | 75–90% | > 90% |

### Novation rubric

| Metric | GREEN | YELLOW | RED |
|---|---|---|---|
| Retail list price vs ARV | ≤ 95% | 95–100% | > 100% |
| Projected marketing days | ≤ 30 | 30–60 | > 60 |
| Seller cooperation (listing, showings) | Willing | Reluctant | Hostile |
| Entry fee | ≤ $15k | $15k–$30k | > $30k |

### Hybrid / Morby stack rubric

Too deal-specific to rubric fully. **Always YELLOW → escalate to Brooke.** The Dispo VA pulls comps and runs universal checks, then hands off.

### Lease option / wrap mortgage rubric

Same — always YELLOW → Brooke.

## Step-by-step underwriting procedure

### Step 1 — Pull comps (30 minutes max)
1. Open PropStream (or Batch).
2. Enter the property address.
3. Filter: sold in last 6 months, within 1 mile, same property type, ±20% sqft, ±1 bed.
4. Pull the top 5 comps.
5. Eliminate outliers (foreclosure, REO, off-market flips with weird numbers).
6. Save the comp list as a PDF to `/04 — Comps/` in the deal folder.
7. Average the comps → this is our **independent ARV estimate**.
8. Compare to partner's ARV estimate. If the partner's ARV is within ±5%, we accept theirs. If it's higher by more than 5%, we use ours (more conservative).

### Step 2 — Enter numbers into the underwriter sheet
1. Open **Google Sheet: "DispoBuddy Underwriter v1"** (link in team vault).
2. Create a new tab named `YYYY-MM-DD — [City ST] — [street]`.
3. Paste from the submission:
   - Partner name, contact
   - Deal type
   - Contract price
   - Asking price
   - Partner's ARV
   - Your independent ARV
   - Repair estimate
   - (sub-to / SF only) mortgage balance, rate, payment, balloon
4. The sheet calculates every rubric metric automatically and returns GREEN / YELLOW / RED.

### Step 3 — Apply the rubric
1. Work down the rubric for the deal type. Every metric gets a color.
2. **All green** → the deal is green. You can recommend **Accept**.
3. **Any yellow** → the deal is yellow. Write a 3-sentence memo explaining what's yellow and why, then escalate.
4. **Any red** → the deal is red. Draft a decline per [SOP 11](./11-dead-deal-rejection.md).

### Step 4 — Sanity-check against buyer demand
1. Open `/buyers-map` on the live site OR query GHL for buyers matching `TARGET_STATES = [deal state]` AND `DEAL_STRUCTURES = [deal type]`.
2. How many buyers match? If < 3, **yellow** regardless of financial rubric — we can't move a deal to a thin buyer pool.
3. Document the matched buyer count in the underwriter sheet.

### Step 5 — Write the decision memo
In the GHL opportunity note log, paste:
```
UW MEMO — [YYYY-MM-DD]

Deal: [deal type] at [address]
Partner: [name]

RUBRIC:
- [Deal type] — [GREEN/YELLOW/RED]
- Spread %: [X%] ([color])
- ARV cushion %: [X%] ([color])
- Fee-to-ARV: [X%] ([color])
- Comp count: [N] ([color])
- Days to COE: [N] ([color])
- Buyer match count: [N] ([color])

ARV: $[X] (partner said $[Y], delta $[Z])
Independent comps: [link to /04 — Comps/ folder]

RECOMMENDATION: [ACCEPT / ESCALATE / DECLINE]
REASON: [one sentence]
```

### Step 6 — Hand off for final call
- **GREEN deal:** Dispo VA can flip stage to **Accepted — Package** directly (once trained and approved by Brooke) OR escalate to Brooke for sign-off until that approval is in place.
- **YELLOW deal:** Always Brooke. Ping her in the daily ops thread with the memo link.
- **RED deal:** Dispo VA drafts the decline per [SOP 11](./11-dead-deal-rejection.md) and Brooke approves before sending (initially) OR sends directly (once trained).

## Templates & scripts

**Accept decision (for the opportunity note):**
```
UW DECISION: ACCEPT
Rubric passed all green. Moving to Accepted — Package. Next step: JV agreement via SOP 03.
```

**Escalate to Brooke:**
```
UW DECISION: ESCALATE
One or more yellows: [list]. Memo in notes above. Need your call by [deadline].
```

**Decline (draft for partner, requires Brooke OK):**
```
Hi [partner], I underwrote [address] and we're going to pass. Reason: [one-paragraph honest explanation tied to the rubric metric that failed]. What would change it: [what we'd need to see]. Send me your next one.
```

## SLAs / quality standards
- **Comp pulling** — 30 minutes or less per deal
- **Rubric evaluation** — 15 minutes or less once comps are in
- **Total underwriting** — under 24 hours from receipt in "Under Review"
- **Comp list quality** — always 3+ comps saved to Drive for every deal we review. No exceptions. No "I eyeballed it."
- **Decision memo** — written for every deal, in the opportunity notes

## Escalation / edge cases
- **Partner's ARV is > 15% above your comps** — this is a red flag (they may be hiding bad numbers). Escalate to Brooke; do not accept without a conversation.
- **Wildly creative structure** (anything not in the rubric) — always Brooke.
- **First deal from a partner and it's a yellow/red** — soften the decline; offer an intro call to coach them. The goal is to keep them in the funnel, not burn them on deal #1.
- **Deal in a compliance-sensitive state** (see [SOP 15](./15-compliance.md)) — always Brooke.
- **Partner is a VIP (5+ closed deals)** — even a red deal gets a phone call, not just an SMS decline.

## Related SOPs
- [01 — Deal Intake & Triage](./01-deal-intake-triage.md) (upstream)
- [03 — JV Agreement](./03-jv-agreement.md) (next step on accept)
- [11 — Dead Deal / Rejection](./11-dead-deal-rejection.md) (next step on decline)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (stage moves)
- [14 — Partner Communication](./14-partner-communication.md) (decision templates)

## Bottleneck this SOP addresses
**[B1 — Underwriting is single-threaded on the founder](./00-bottlenecks.md#b1--underwriting-is-single-threaded-on-the-founder)** — the whole reason this SOP exists.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version with deterministic rubrics | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 03 — JV Agreement

## Purpose
The 1-page JV agreement is how we convert an underwritten deal into a real working relationship with the partner. Nothing gets marketed until it's signed. This SOP defines the template, the send process, the tracking, and the filing.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (send/track/file):** Dispo VA
- **Responsible (terms negotiation — non-delegable):** Brooke

## Trigger
A deal is underwritten and accepted per [SOP 02](./02-deal-underwriting.md). Opportunity is in stage **Accepted — Package**.

## Inputs required
- Partner's full legal name and email (from the GHL contact)
- Partner's entity name (ask during intake if not captured)
- Property address
- Contract price
- Asking price (= contract price + intended assignment fee, gives us the spread to split)
- Close of escrow date
- Deal type (cash / sub-to / SF / novation)

## Tools & systems used
- DocuSign
- GHL (contact + opportunity)
- Google Drive → `/DispoBuddy/JV Agreements/YYYY/`

## The template

The master JV agreement template lives in DocuSign as **"Dispo Buddy — JV Agreement v1"**. It is a 1-page document with the following merge fields:

| Field | Source |
|---|---|
| `{{partner_full_name}}` | GHL contact |
| `{{partner_entity}}` | GHL custom field `entity` |
| `{{partner_email}}` | GHL contact |
| `{{property_address}}` | GHL opportunity |
| `{{contract_price}}` | GHL opportunity |
| `{{asking_price}}` | GHL opportunity |
| `{{close_date}}` | GHL opportunity |
| `{{deal_type}}` | GHL opportunity |
| `{{effective_date}}` | today |
| `{{term_days}}` | default 90 |

**Key terms (hardcoded in the template, do not alter per deal without Brooke's OK):**
- **Parties:** Deal Pros LLC dba Dispo Buddy and `{{partner_entity}}` (or `{{partner_full_name}}` if no entity)
- **Split:** 50% / 50% of the **net** assignment fee, defined as gross assignment fee minus title and escrow fees charged against the assignment
- **Non-exclusive:** Partner may continue to market the deal. Whoever brings the closing buyer wins.
- **Term:** 90 days from the effective date, auto-terminates if the deal does not close in that window (renewable by mutual written consent).
- **Marketing representations:** Dispo Buddy will represent the deal truthfully, using data provided by the partner. Partner warrants the accuracy of their data.
- **Payment method:** Paid at close through the title company via a disbursement instruction. Dispo Buddy does not invoice the partner.
- **Confidentiality:** Each party keeps the deal details confidential until close.
- **Governing law:** Arizona.
- **Entity:** Deal Pros LLC.

The current template PDF is filed in `/Drive/DispoBuddy/Legal/JV Agreement Template v1.pdf`. **Any change to the template requires Brooke's sign-off AND a new version number.**

## Step-by-step procedure

### Step 1 — Trigger the send
Once Brooke has approved the deal for acceptance:

1. In GHL, move the opportunity to **Accepted — Package**.
2. Open DocuSign → Templates → **"Dispo Buddy — JV Agreement v1"** → Use.
3. Fill in merge fields:
   - Recipient: partner's email (from GHL)
   - Recipient name: partner's full legal name
   - `{{partner_full_name}}`, `{{partner_entity}}`, `{{partner_email}}`
   - `{{property_address}}`, `{{contract_price}}`, `{{asking_price}}`
   - `{{close_date}}`, `{{deal_type}}`
   - `{{effective_date}}` = today
   - `{{term_days}}` = 90
4. Preview. Confirm every field is populated. If any field shows raw `{{...}}` syntax, stop and fix.
5. **Send for signature.**

### Step 2 — Notify the partner it's coming
Immediately after sending, paste the "Accepted, JV agreement incoming" SMS from [SOP 14](./14-partner-communication.md):
```
{{contact.first_name}} — deal accepted. Spread works, fee is reasonable, we have buyers for this one. JV agreement is coming to your email from DocuSign in the next hour. Sign it and we start marketing immediately.
```

### Step 3 — Log the send in GHL
Paste into the opportunity note log:
```
[YYYY-MM-DD HH:MM] [initials] — JV agreement sent via DocuSign. Template: v1. Recipient: [email]. Awaiting signature.
```

### Step 4 — Track the signature
1. Default DocuSign reminders: Day 1, Day 2, Day 3.
2. If still unsigned after **24 hours**, send a personal SMS from [SOP 14](./14-partner-communication.md):
   ```
   {{contact.first_name}} — just following up on the JV agreement for [address]. Takes 2 mins to sign. Any blockers I can clear?
   ```
3. If still unsigned after **48 hours**, call the partner directly. Don't chase over SMS forever.
4. If still unsigned after **72 hours** with no response, move the opportunity to **Declined** with reason `no_signature` and move on. Brooke signs off on the decline.

### Step 5 — On full execution
When DocuSign confirms both parties have signed:

1. Download the executed PDF from DocuSign.
2. File to Drive: `/DispoBuddy/JV Agreements/YYYY/YYYY-MM-DD — [Partner Last Name] — [City ST] — [Street].pdf`
3. Upload the executed PDF as a file attachment on the GHL **contact** record.
4. Upload the executed PDF as a file attachment on the GHL **opportunity** record.
5. Upload the executed PDF as a file in the Notion deal row.
6. Move the opportunity to **JV Signed** stage.
7. Paste into opportunity note log:
   ```
   [YYYY-MM-DD HH:MM] [initials] — JV agreement fully executed. PDF filed in Drive/GHL/Notion. Moving to Marketing per SOP 04.
   ```
8. Trigger the next step: [SOP 04 — Deal Packaging](./04-deal-packaging.md).

## Templates & scripts

**Send confirmation SMS:** see [SOP 14](./14-partner-communication.md) → "Accepted, JV agreement incoming"

**Follow-up if unsigned at 24 hours:**
```
{{contact.first_name}} — just following up on the JV agreement for [address]. Takes 2 mins to sign. Any blockers I can clear?
```

**Follow-up if unsigned at 48 hours (call script):**
```
"Hey [name], just making sure the DocuSign didn't get caught in your spam. I've got the deal in our system, buyers are ready, but nothing goes out until the JV is signed. Want me to resend? Or walk you through any questions on the agreement?"
```

**Withdrawal message if partner backs out:**
```
No problem, [name]. We'll close the file for this one. When you have the next deal, just submit it fresh and we'll pick it up.
```

## SLAs / quality standards
- **JV sent within 1 hour** of Brooke's acceptance decision
- **100% of JVs sent via DocuSign** (never edited in Word and emailed; always through the template)
- **Fully-executed PDFs filed in Drive + GHL + Notion within 1 business day** of execution
- **Template version recorded** in every opportunity note

## Escalation / edge cases
- **Partner asks to change a term** (split %, term, exclusivity, payment method) → **always Brooke.** No VA may modify terms.
- **Partner wants us to sign a different template they provide** → send to Brooke; she may forward to counsel.
- **Partner is an entity in a state we don't recognize** (foreign LLC from an unusual state) → Brooke + [SOP 15](./15-compliance.md).
- **Deal closes before the 90-day term** (normal path) → no action needed; the agreement naturally ends at close.
- **Deal still alive at Day 85 of the term** → reach out to partner to extend by 30 days with a one-line written amendment (Brooke sends).
- **Partner tries to re-market the deal after signing** — that's fine, we are non-exclusive; just make sure our outreach doesn't collide (coordinate buyer contacts).

## Related SOPs
- [02 — Deal Underwriting](./02-deal-underwriting.md) (upstream)
- [04 — Deal Packaging](./04-deal-packaging.md) (downstream)
- [11 — Dead Deal / Rejection](./11-dead-deal-rejection.md) (if unsigned)
- [14 — Partner Communication](./14-partner-communication.md)
- [15 — Compliance](./15-compliance.md) (JV retention, entity rules)

## Bottleneck this SOP addresses
[B6 — JV agreement generation is manual](./00-bottlenecks.md#b6--jv-agreement-generation-is-manual) — solved by the DocuSign template with merge fields, and eventually by Zapier/Make automation that fires the send when a deal moves to Accepted.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 04 — Deal Packaging

## Purpose
A professional deal sheet is the single biggest difference between "blasted to a Facebook group" dispo and real, respected dispo. Our promise on the site is "professional packaging — deal sheets, financial analysis, targeted outreach — not a blurry photo and a text blast." This SOP defines exactly what goes on every deal sheet and how to produce one in under 30 minutes.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA
- **Consulted:** Brooke (for numbers sign-off on hybrid / creative deals)

## Trigger
JV agreement is fully executed. Opportunity is in stage **JV Signed**.

## Inputs required
- Deal folder in Drive (from [SOP 01](./01-deal-intake-triage.md))
- Underwriting memo (from [SOP 02](./02-deal-underwriting.md))
- Partner-provided photos
- Comps pulled during underwriting
- Contract details

## Tools & systems used
- Canva (deal sheet template — "DispoBuddy Deal Sheet v1")
- Google Drive (deal folder → `/05 — Deal Sheet/`)
- GHL (attaches the PDF to the opportunity)

## Canonical deal sheet contents

Every deal sheet — cash, sub-to, SF, whatever — contains these sections in this order:

### Page 1 — Hero
- **Hero photo** (best exterior shot, landscape orientation)
- **Property address** (street, city, state, ZIP)
- **Deal type** badge (Cash Assignment / Subject-To / Seller Finance / Novation / Hybrid)
- **Asking price** (big number, top right)
- **One-line hook** ("3/2 in Phoenix, $15k under ARV, 30-day close")

### Page 2 — Property details
- Beds / baths / sqft / year built / lot size
- Property type
- Occupancy status
- Access instructions (lockbox / appt)
- 4–8 property photos (interior + exterior)
- Google Maps screenshot with a pin

### Page 3 — The numbers
- **Contract price** (what we're paying the seller)
- **Asking price** (what the buyer pays us)
- **Assignment fee** = asking − contract
- **ARV** (our independent estimate, not partner's)
- **Repair estimate** (from partner or contractor)
- **Projected profit to buyer** = `ARV − asking − repair estimate − closing costs` (show the math)
- **Est. taxes + insurance** (monthly)

For **sub-to** deals, add:
- Existing loan balance, rate, payment, lender, maturity, balloon status
- Buyer down payment required (the "entry fee")
- Monthly PITI once assumed

For **seller finance** deals, add:
- Note amount, rate, term, balloon
- Down payment required
- Monthly PITI (PI to seller + TI separately)

For **novation** deals, add:
- Target retail list price
- Estimated marketing time
- Projected net to buyer after retail sale

### Page 4 — Comps
- 3 comparable sold properties from our comp pull
- For each: address, sold price, sold date, beds/baths/sqft, distance
- Mini map showing subject + comps

### Page 5 — Deal structure explanation
- 2–3 sentence plain-English explanation of how the buyer exits (flip, hold and rent, assume and hold, list retail, etc.)
- What the buyer needs to bring (cash, down payment, construction loan, etc.)

### Page 6 — Call to action
- "Interested? Reply to this message or call/text [internal number]"
- Dispo Buddy logo
- Footer: Deal Pros LLC dba Dispo Buddy • dispobuddy.com • (480) 842-5332 • info@dispobuddy.com

**The deal sheet never contains:**
- Partner's name (we protect our supply)
- Contract price if the partner requests confidentiality (show only asking)
- Seller's name or personal details
- Any promise or legal representation beyond the facts

## Step-by-step packaging procedure

### Step 1 — Gather inputs (5 min)
1. Open the deal folder in Drive.
2. Verify `/04 — Comps/` has your comp PDF.
3. Verify `/03 — Photos/` has at least 6 usable photos. If not, request from partner (templates in [SOP 14](./14-partner-communication.md)).
4. Open the GHL opportunity and pull the underwriting memo.

### Step 2 — Open the Canva template (1 min)
1. Canva → Templates → "DispoBuddy Deal Sheet v1"
2. Duplicate → rename: `YYYY-MM-DD — [City ST] — [Street]`

### Step 3 — Fill in page 1 (5 min)
1. Drag the best exterior photo into the hero slot
2. Type the address, asking price, deal type badge, one-line hook
3. Verify the DispoBuddy logo is in the top-left (don't move it)

### Step 4 — Fill in page 2 (5 min)
1. Type beds / baths / sqft / etc.
2. Drag 4–8 photos into the photo grid
3. Drop in a Google Maps screenshot (Maps → right-click → "Share" → screenshot)

### Step 5 — Fill in page 3 — the numbers (5 min)
1. Open the underwriting sheet
2. Copy contract price, asking, assignment fee, ARV, repair estimate
3. Projected buyer profit is auto-calculated on page 3 of the Canva template — double-check the math
4. **If sub-to or SF:** fill in the additional rows for loan details

### Step 6 — Fill in page 4 — comps (5 min)
1. Paste the 3 comps (address, sold price, sold date, beds/baths/sqft, distance) from your comp PDF
2. Screenshot the mini-map from PropStream showing subject + comps
3. Drop in the screenshot

### Step 7 — Fill in page 5 — deal structure (3 min)
Write the 2–3 sentence explanation. Use plain English. **Paste from the templates below if the deal fits a standard pattern.**

### Step 8 — Final review (2 min)
1. Proofread every number
2. Confirm no partner/seller PII
3. Confirm no typos in the address
4. Export as PDF → `DispoBuddy — [City ST] — [Street].pdf`
5. Save to `/05 — Deal Sheet/` in the deal folder

### Step 9 — Attach and log
1. Upload the PDF to the GHL opportunity as a file attachment
2. Upload the PDF to the Notion deal row
3. Paste into opportunity note log:
   ```
   [YYYY-MM-DD HH:MM] [initials] — Deal sheet v1 packaged. PDF in /05 — Deal Sheet/. Ready for SOP 05 — Buyer Matching & Outreach.
   ```
4. Move opportunity to **Marketing** stage

## Structure explanation templates (page 5)

**Cash flip:**
> This is a straight cash assignment. Buyer assumes our purchase contract, closes at the title company on our contracted terms, takes possession, completes the rehab estimated above, and exits via retail resale.

**Cash buy-and-hold:**
> Cash assignment ideal for a buy-and-hold investor. Buyer assumes our contract, closes in cash, stabilizes the property at the rent shown, and holds for cash flow.

**Subject-to:**
> Buyer takes title subject to the existing loan (balance / rate / payment above). Seller gets [amount] out of pocket. Buyer's down payment above covers seller equity + closing costs. Buyer takes over monthly payments. The loan stays in the seller's name.

**Seller finance:**
> Seller carries the note at the terms above. Buyer brings the down payment, makes monthly P&I to the seller per the amortization, with a [N]-year balloon. Title transfers at close. The seller's existing loan (if any) is paid off at close.

**Novation:**
> Buyer enters a novation agreement and markets the property at retail on the MLS. Seller remains on title until the retail sale closes. Buyer takes the upside between the retail sale price and our novation entry price, minus marketing and carrying costs.

**Morby stack / hybrid (always customize — this is a placeholder):**
> [Write a deal-specific explanation. Brooke reviews every hybrid packaging for accuracy.]

## SLAs / quality standards
- **Deal sheet produced within 4 hours** of JV signature (same business day)
- **Every number defensible** — no guesses, no partner claims we didn't verify
- **No PII leaks** — partner/seller names never appear on the deal sheet
- **Photo count** — minimum 6, target 8–12
- **Comp count** — exactly 3 (the same 3 we used in underwriting)
- **Proofread** — zero typos in the address, zero math errors

## Escalation / edge cases
- **Photos are insufficient or low quality** — request more from partner (12-hour deadline); if they don't respond, use what we have and add a disclaimer "Additional photos available on request."
- **Partner asks the contract price to be hidden** — honor it; show only asking. Note in the opportunity.
- **Hybrid / creative structure** — always loop Brooke before publishing the deal sheet.
- **Property is vacant and photos are 2 years old** — escalate; we may need a driver for fresh photos (see [SOP 07](./07-closing-title-coordination.md) for the preferred contacts).
- **Partner wants their own branding on the sheet** — absolute no. Every deal sheet is branded DispoBuddy.

## Related SOPs
- [02 — Deal Underwriting](./02-deal-underwriting.md) (source of numbers)
- [03 — JV Agreement](./03-jv-agreement.md) (upstream)
- [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md) (downstream)
- [15 — Compliance](./15-compliance.md) (truthful marketing rules)

## Bottleneck this SOP addresses
Not a direct bottleneck, but deal sheet quality is the proof point that justifies the 50/50 split. Poor sheets feed [B2](./00-bottlenecks.md#b2--deal--buyer-matching-is-manual-and-memory-based) (buyers stop opening our texts).

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 05 — Buyer Matching & Outreach

## Purpose
This is the highest-leverage step in the business. A great deal with no matched buyers is worth zero. This SOP turns the ad-hoc "who do I know who might want this" habit into a deterministic query + cadenced outreach that a VA can run on autopilot.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA
- **Informed:** Brooke (daily digest of new outreach + replies)

## Trigger
Opportunity moved to **Marketing** after the deal sheet is published per [SOP 04](./04-deal-packaging.md).

## Inputs required
- Published deal sheet PDF + Drive shareable link
- Deal metadata: state, city, deal type, contract price, asking price, ARV, property type, asset class
- GHL access (buyer smart lists)

## Tools & systems used
- GHL → Contacts, Smart Lists, Workflows, SMS/Email templates
- Google Drive (deal sheet link)
- Optional: Airtable or Notion for an outreach tracking board

## The matching query

For every deal, build a buyer list using these filters (pulled from the custom fields documented in [SOP 12](./12-ghl-crm-hygiene.md) and `netlify/functions/buyer-demand.js`):

| Filter | Value from deal |
|---|---|
| Contact Role | `buyer` OR `partner_and_buyer` |
| Target States contains | `[deal state]` |
| Target Cities contains | `[deal city]` OR empty (empty = state-wide) |
| Deal Structures contains | `[deal type]` |
| Property Type contains | `[deal property type]` |
| Max Price ≥ | `[asking price]` |
| Max Entry ≥ | `[buyer entry fee]` (sub-to / SF only) |
| Min ARV ≤ | `[our ARV]` |
| `do_not_contact` tag | NOT present |
| Active (last activity in 90 days) | true |

**Target:** 10+ matched buyers for a GREEN deal, 5+ for a YELLOW deal. Fewer than 5 matches → the deal goes on a watch list and Brooke decides whether to broadcast wider or to source new buyers in that market.

## Step-by-step procedure

### Step 1 — Build the matched list (10 min)
1. Open **GHL → Contacts → Smart Lists**.
2. If a saved list already exists for `(state × deal_structure)`, start there. Otherwise build it fresh using the filters above.
3. Save the list as `Deal Match — [City ST] — [Deal Type] — [YYYY-MM-DD]`.
4. Note the **match count**. Paste it into the opportunity's `Matched Buyer Count` custom field.

### Step 2 — Rank the buyers (5 min)
Within the matched list, rank buyers in this order:
1. `vip_partner` OR `repeat_partner` with closed deals > 2
2. Buyers who expressed interest in this city/state in the last 30 days (check recent notes)
3. Buyers whose `Max Price` and `Min ARV` are comfortably above our numbers (not at the edge)
4. Everyone else

The top 3 ranked buyers get a **direct SMS + personal message from Brooke** or a senior VA (not a blast). The rest get the standard outreach sequence.

### Step 3 — Send Day 0 outreach
**Top 3 — personal SMS (Brooke or VA, name-checked):**
Use the "Top 3 — personal touch" template below. Add one sentence of personalization ("I know you bought a 3/2 in Tempe last month, this one's similar but cleaner").

**The rest — automated blast via GHL workflow:**
1. Open the workflow **"Deal Blast — Standard"** in GHL.
2. Enter the smart list as the audience.
3. Populate merge tags:
   - Deal sheet link (Drive)
   - Asking price
   - City / ST
   - Deal type
4. Preview one message. Confirm merge tags resolved.
5. Start the workflow.

Each buyer receives:
- **SMS** at Day 0 (within 30 min of sheet publish)
- **Email** at Day 0 + 1 hour (deal sheet attached + inline)

### Step 4 — Log the outreach
Paste into the opportunity note log:
```
[YYYY-MM-DD HH:MM] [initials] — Outreach sent. Matched buyers: [N]. Top 3 personal: [names]. Standard blast to the remaining [N-3]. Workflow: Deal Blast — Standard. Next touch: Day 2.
```

### Step 5 — Follow-up cadence
| Day | Action | Audience |
|---|---|---|
| 0 | Initial SMS + email | All matched |
| 2 | "Still interested?" SMS | Non-responders only |
| 5 | "Final call — any interest?" SMS | Non-responders only |
| 7 | Move to stale; new broadcast to a second-tier list (buyers in neighboring states or slightly outside criteria) | if no offers |
| 14 | Price drop discussion with partner | if no offers |

**Never** send a fourth SMS without changing the message or the offer. That's how buyers unsubscribe us.

### Step 6 — Log replies and route them
Every reply:
1. Open the conversation in GHL.
2. **Interested:** tag the contact `interested_in_[opp_id]`, capture their specific question, reply within 1 hour with answers. Route details to [SOP 06](./06-offer-management-negotiation.md).
3. **Not interested:** reply with a polite "Got it, thanks for letting me know — I'll keep your buybox in mind." Log the reason (too expensive, wrong city, bad timing) in a note for SOP 10 buyer hygiene.
4. **Wants a showing:** coordinate per [SOP 07](./07-closing-title-coordination.md) access instructions. Do not send a showing request to the partner without confirming the partner is OK with it.
5. **Silent or unopened after Day 5:** no further action on this deal; leave the buyer alone. They'll see the next one.

### Step 7 — Daily digest to Brooke
End of each day in Marketing stage, send the daily ops ping:
```
[Deal address]
Day [N] in marketing
Sent: [initial send count] / Replies: [reply count] / Interested: [interested count] / Offers: [offer count]
Top activity: [bullet what happened today]
```

## Templates & scripts

### Top 3 — personal touch SMS
```
Hey [first_name] — got a [deal_type] deal in [city_state] you'd probably like. Asking $[asking_price]. [one-sentence personalization tied to their known buybox]. Full deal sheet: [drive_link]. Worth a look?
```

### Standard Day 0 SMS
```
{{contact.first_name}} — new [deal_type] deal in [city_state]. Asking $[asking_price] / ARV ~$[arv]. [one_line_hook]. Deal sheet: [drive_link]. Reply if you want more.
```

### Standard Day 0 email
Subject: `New [deal_type] — [city_state] — $[asking_price]`
```
Hi {{contact.first_name}},

Just pushed a new deal out in [city_state]. Quick highlights:

- [deal_type]
- Asking: $[asking_price]
- ARV: ~$[arv]
- Spread: [spread_explanation]
- [one_line_property_description]

Deal sheet attached. Reply to this email or text me back if you want to get in front of it.

— Dispo Buddy
[phone]
```

### Day 2 SMS (non-responders)
```
{{contact.first_name}} — quick follow up on the [city_state] deal. Still open, still moving. Any interest? [drive_link]
```

### Day 5 SMS (final call)
```
{{contact.first_name}} — last call on [address]. We're talking to other buyers this week and it'll likely move by [day]. If it fits, hit me back — if not, no worries, next one's coming.
```

### Reply — interested, wants more info
```
{{contact.first_name}} — awesome. What specific info do you need? I have [list what we have handy]. If you want to walk it, the access is [access]. Otherwise happy to hop on a call for 10 mins.
```

### Reply — not interested
```
Got it, {{contact.first_name}}. Appreciate the quick reply. I'll keep your buybox in mind for the next one.
```

### Reply — interested but price is high
```
{{contact.first_name}} — heard. Let me talk to the partner about wiggle room and I'll come back to you by [deadline]. Worst case: I'll keep you posted on any amendments.
```

*(For offer logistics, hand to [SOP 06](./06-offer-management-negotiation.md).)*

## SLAs / quality standards
- **Initial outreach within 30 minutes** of deal sheet publication
- **Match count ≥ 5** before blasting. If fewer than 5, escalate.
- **100% of replies acknowledged within 1 business hour**
- **Daily digest to Brooke** for every deal in Marketing
- **No buyer receives more than 3 SMS touches on the same deal**

## Escalation / edge cases
- **Fewer than 3 matched buyers** — escalate to Brooke. She may widen criteria or broadcast to a warm-but-not-matched list.
- **A buyer complains about frequency** — immediately reduce their outreach, add a `reduced_frequency` tag, never 3+ touches in a week.
- **A top-3 buyer ignores the personal message** — do not re-send personally. Let them flow into the standard cadence.
- **Two partners bring similar deals in the same week** — coordinate outreach so we don't double-send buyers; both partners' deals can still run, but use different buyer sub-lists if possible.
- **Unsubscribe / STOP during outreach** — respect immediately; do not argue; tag `do_not_contact`.

## Related SOPs
- [04 — Deal Packaging](./04-deal-packaging.md) (upstream)
- [06 — Offer Management & Negotiation](./06-offer-management-negotiation.md) (downstream)
- [09 — Buyer Network Intake](./09-buyer-network-intake.md)
- [10 — Buyer Network Hygiene](./10-buyer-network-hygiene.md)
- [14 — Partner Communication](./14-partner-communication.md)

## Bottleneck this SOP addresses
**[B2 — Deal → buyer matching is manual and memory-based](./00-bottlenecks.md#b2--deal--buyer-matching-is-manual-and-memory-based)** — primary fix. Also supports [B3](./00-bottlenecks.md#b3--buybox-is-not-collected-consistently-across-asset-types) by forcing the matching query through the canonical custom fields.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 06 — Offer Management & Negotiation

## Purpose
Offers are the moment of truth. This SOP defines how we log them, present them to the partner, negotiate within authority limits, and pick a winner — without letting a deal stall or a buyer feel ghosted.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (logging, routing, standard negotiation):** Dispo VA
- **Responsible (final acceptance / reject / counter):** Brooke + Partner (joint decision)

## Trigger
A buyer replies to outreach with an offer, OR a buyer initiates a conversation about terms.

## Inputs required
- Deal sheet + deal folder
- Underwriting memo (our walk-away floor)
- Partner's communicated priorities (price vs speed vs certainty)
- JV agreement (to confirm we have authority to negotiate)

## Tools & systems used
- GHL (opportunity + contact notes)
- Deal folder `/07 — Offers/`
- Phone / SMS / email to partner

## Step-by-step procedure

### Step 1 — Log every offer immediately
Within **15 minutes** of an offer landing:

1. Open the GHL opportunity.
2. Add a new note in the log:
   ```
   [YYYY-MM-DD HH:MM] OFFER RECEIVED
   Buyer: [name] (GHL contact id [id])
   Offer: $[amount]
   Deposit: $[emd]
   Close date: [date]
   Contingencies: [list]
   As-is / inspection window: [days]
   Funding: [cash / subject-to / SF / wholesale assignment]
   Notes: [anything the buyer said that matters]
   ```
3. Save the buyer's written offer (if any) to `/07 — Offers/[buyer]-[date].pdf`.
4. Add an `offer_received` tag to the opportunity.
5. Tag the buyer contact with `offered_on_[opportunity_id]`.

### Step 2 — Present the offer to the partner
**Within 2 business hours** of logging the offer, send the partner the "Offer Received" SMS from [SOP 14](./14-partner-communication.md):

```
{{contact.first_name}} — got an offer on {{custom_values.property_address}}. {{buyer_type}} buyer at ${{offer_amount}}, {{close_terms}}. My take: {{recommendation}}. Can you get back to me by {{deadline}}?
```

**Recommendation logic** (what the "my take" line should say):
- Offer ≥ 95% of asking AND cash AND reasonable close date → **"recommend accept"**
- Offer 85–95% of asking OR terms slightly off → **"recommend counter at [X]"**
- Offer < 85% of asking → **"recommend reject unless you want to negotiate"**
- Any offer with weird contingencies (long inspection, financing, sale of buyer's home) → **"needs discussion — call me"**

### Step 3 — Capture the partner's response and authority
Record the partner's decision in the opportunity note log:
```
[YYYY-MM-DD HH:MM] PARTNER RESPONSE
Decision: [accept / counter / reject]
Counter terms (if applicable): $[amount], [other terms]
Floor (lowest the partner will go): $[amount] — confidential, do not share
Authority granted: [what Brooke can negotiate without re-confirming]
```

**Key:** always capture a **floor** so the VA can negotiate without waking the partner up on every round.

### Step 4 — Counter or accept

**If accepting:**
1. Reply to the buyer within 1 hour of partner sign-off. Use the "accept" template below.
2. Request the signed purchase agreement + assignment from the buyer. Give a 24-hour deadline.
3. Move the opportunity to **Offer Received** stage (if not already) and note the target buyer.
4. Notify losing buyers **only after** the winning buyer has signed and EMD is in escrow — not before.

**If countering:**
1. Reply to the buyer within 1 hour with the counter. Use the "counter" template.
2. Give a 24-hour response window on the counter.
3. Log the counter in the opportunity note.

**If rejecting:**
1. Reply to the buyer within 1 hour with the reject template (polite, honest, leave the door open).
2. Log the reject in the opportunity note.

### Step 5 — Handle multiple offers
When 2+ offers are active:

1. Order them by: (a) net to partner, then (b) closing speed, then (c) certainty (cash > financed).
2. Send the partner a **comparison summary**:
   ```
   OFFERS on [address] as of [timestamp]:
   
   1. [buyer name] — $[offer] / EMD $[emd] / COE [date] / [financing] / net to us $[net]
   2. [buyer name] — $[offer] / EMD $[emd] / COE [date] / [financing] / net to us $[net]
   3. [buyer name] — $[offer] / EMD $[emd] / COE [date] / [financing] / net to us $[net]
   
   My take: #[N] because [reason].
   Which one do you want to move on?
   ```
3. Never accept two offers on the same deal. As soon as the partner picks, send politely-phrased "moving with another buyer" messages to the others.

### Step 6 — Once an offer is accepted
1. Request the signed assignment agreement from the buyer (use Deal Pros LLC's standard form; Brooke has it).
2. Confirm EMD is headed to the title company.
3. Move opportunity to **Under Contract (Buyer)** stage.
4. Hand off to [SOP 07 — Closing & Title Coordination](./07-closing-title-coordination.md).
5. Tag the buyer contact: `closed_deal_[YYYY]`, `last_closed_deal_[YYYY-MM]`.
6. Notify losing buyers with the "moved with another buyer" template.
7. Add a note:
   ```
   [YYYY-MM-DD HH:MM] [initials] — Offer accepted. Buyer: [name]. Price: $[amount]. Signed assignment on file in /07 — Offers/. Moving to Under Contract (Buyer). Title company: [name].
   ```

## Templates & scripts

### Counter the buyer
```
{{contact.first_name}} — thanks for the offer. The partner countered at $[counter_price] [+ any other terms]. Everything else on your offer stays the same. Deadline on this counter is [date + 24hrs]. Hit me back when you've had a look.
```

### Accept the buyer
```
{{contact.first_name}} — you've got it. We're moving with your offer at $[price]. Next step: I'll send over the assignment + contract for signature today. Please wire EMD ($[emd]) to [title_company] within 48 hours of signing.
```

### Reject the buyer (low offer)
```
{{contact.first_name}} — appreciate the offer but the partner's not going to move at $[offer]. If you can get to $[counter_suggestion] we'd look at it again. Otherwise I'll keep you posted on future deals in your buybox.
```

### Reject the buyer (terms)
```
{{contact.first_name}} — the number works but the [contingency/close_date] doesn't fit the seller's timeline. If you can do [change] we're in business. Otherwise we'll pass this round.
```

### Moved with another buyer
```
{{contact.first_name}} — wanted to close the loop on [address]. We went with another offer this round. Appreciate you looking and I'll send you the next deal in [market] as soon as it's in the door.
```

### Partner follow-up (silent partner — 4 hour nudge)
```
[partner_first_name] — still waiting for your call on the offer at [address]. The buyer is asking for a response by [time]. Need your decision.
```

### Partner follow-up (silent partner — 12 hour, voice call)
Call directly. No more text reminders. Script:
```
"Hey [partner], it's [your name] from Dispo Buddy. We have a $[amount] offer on [address] sitting with you and the buyer's about to walk. I need a yes, no, or counter in the next 30 minutes. What do you want me to do?"
```

## SLAs / quality standards
- **Every offer logged within 15 minutes** of receipt
- **Every offer presented to the partner within 2 business hours** of logging
- **Every buyer reply sent within 1 hour** of partner sign-off
- **Every rejected buyer notified within 1 hour** of acceptance of the winner
- **Zero silent offers** — every offer gets a reply (accept, counter, or reject)
- **Zero double-accept events** — the one-winner-at-a-time rule is absolute

## Escalation / edge cases
- **Partner is unreachable > 12 hours and there's an offer pending** — call directly. If still unreachable, use the authority the partner gave you in the JV agreement (if explicit) OR tell the buyer "waiting on my partner, 24-hour delay expected."
- **Buyer tries to renegotiate after accepting** — Brooke only. Potential re-trade. Do not concede anything without her.
- **Buyer wants to re-assign our assignment** (double-dip) — allowed but disclose to partner, and make sure our assignment fee is locked in regardless.
- **Partner wants to back out after accepting an offer** — Brooke + possible [SOP 15](./15-compliance.md) issue. This is a breach risk.
- **Buyer threatens legal action** — [SOP 15](./15-compliance.md) immediately. No reply.
- **Partner asks for an offer update every hour** — politely set expectations: "I'll ping you when there's news; outside that you can assume nothing has changed."

## Related SOPs
- [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md) (upstream)
- [07 — Closing & Title Coordination](./07-closing-title-coordination.md) (downstream)
- [14 — Partner Communication](./14-partner-communication.md)
- [15 — Compliance](./15-compliance.md)

## Bottleneck this SOP addresses
Supports the [B2](./00-bottlenecks.md#b2--deal--buyer-matching-is-manual-and-memory-based) fix — a working matching pipeline is useless without a working offer management pipeline.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 07 — Closing & Title Coordination

## Purpose
Deals die at closing more often than they die at underwriting. This SOP is the zero-surprises checklist for getting a deal from "offer accepted" to "wire received, partner paid, Closed Won" — with title issues, partner silence, and buyer flakiness all handled.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA
- **Consulted:** Title company, partner, buyer
- **Informed:** Brooke (daily, until close)

## Trigger
Opportunity moved to **Under Contract (Buyer)** per [SOP 06](./06-offer-management-negotiation.md).

## Inputs required
- Fully-signed buyer assignment (from SOP 06)
- Original purchase contract (from partner)
- Title company choice (from the preferred list below or buyer's choice)
- JV agreement (for the split disbursement instructions)
- Wire instructions for Deal Pros LLC

## Tools & systems used
- Email (primary — title companies prefer email)
- Phone (secondary for urgent items)
- DocuSign (amendments, assignments)
- Google Drive → `/08 — Title & Closing/`
- GHL (notes, stage)

## Preferred title companies by state

> **Brooke to maintain this list.** Once an assignment-friendly title company proves reliable, add them here and stop hunting.

| State | Title company | Contact | Notes |
|---|---|---|---|
| AZ | *TBD* | *TBD* | |
| TX | *TBD* | *TBD* | |
| FL | *TBD* | *TBD* | |
| KY | *TBD* | *TBD* | |
| TN | *TBD* | *TBD* | |
| GA | *TBD* | *TBD* | |
| OH | *TBD* | *TBD* | |
| IN | *TBD* | *TBD* | |

**New state / no preferred closer:** use the buyer's chosen title, but vet them quickly — call first, confirm they close assignments, confirm they will cut a JV disbursement check directly, confirm turnaround time.

## Day-1-of-contract packet

Within **1 business day** of the buyer signing the assignment, send this packet to title (one email, everything attached):

1. **Original purchase contract** (partner ↔ seller)
2. **Assignment of contract** (us ↔ buyer)
3. **JV agreement** (us ↔ partner) — **not** for recording, just for title to understand the disbursement
4. **EMD receipt** from the buyer
5. **Deal Pros LLC entity docs** (articles of organization, EIN letter)
6. **Wire instructions for Deal Pros LLC** (for our share of the assignment fee at close)
7. **Partner's wire instructions or mailing address** (for their share)
8. **Close of escrow target date**
9. **Seller contact info**
10. **Buyer contact info**

## Disbursement instructions (stapled to the day-1 email)

```
JV DISBURSEMENT INSTRUCTIONS

Total assignment fee: $[gross]
Title/escrow fees charged against the assignment: $[fees]
Net assignment fee: $[gross - fees]

Split:
- 50% to Deal Pros LLC (Dispo Buddy) = $[half], wire per attached instructions
- 50% to [partner_entity_or_name] = $[half], wire per attached instructions OR check mailed to [address]

Please confirm receipt and provide the settlement statement no later than 24 hours before close for both parties to review.
```

## Step-by-step procedure

### Step 1 — Open title (Day 1)
1. Pick the title company (preferred list OR buyer's choice if vetted).
2. Send the day-1 packet email (structure above).
3. In GHL, add a custom field `Title Company` with the company name and the closer's name.
4. Add a note:
   ```
   [YYYY-MM-DD HH:MM] [initials] — Title opened at [company], closer [name]. Day-1 packet sent. Target COE [date].
   ```

### Step 2 — Confirm title acceptance (Day 1-2)
1. Expect title to reply within 24 hours confirming receipt. If not, **call them**.
2. Confirm they will: (a) honor the assignment, (b) cut the JV disbursement check directly at close, (c) not require additional docs from the partner we haven't anticipated.
3. If they refuse any of these → escalate to Brooke; may need to change title company.

### Step 3 — Preliminary title check (Day 3-7)
1. Ask title to run a preliminary title search.
2. Review the prelim when it arrives. Look for:
   - Liens (mortgages, tax liens, HOA liens, mechanic's liens)
   - Cloudy title (probate, divorce decrees, heir issues)
   - Easements that might affect value
   - Existing judgments against the seller
3. Clean prelim → proceed.
4. Any issues → tag the note log with `title_issue`, call Brooke, brief the partner.

### Step 4 — Inspection period (contract-dependent)
1. If the buyer has an inspection window, confirm they schedule within 48 hours.
2. Coordinate showings with the partner (or directly with the seller if that's how the contract is set up).
3. Monitor for inspection repair requests or cancellation.
4. Day after inspection, get a status update from the buyer: proceed, request repairs, walk away.

### Step 5 — EMD confirmation (Day 2-5)
1. Confirm EMD is deposited at title. Get a receipt.
2. File the receipt in `/08 — Title & Closing/`.
3. If EMD does not arrive within 72 hours of signing → **escalate to Brooke.** This is a major flake signal.

### Step 6 — Weekly check-in with title
Every Monday while the deal is open:
1. Email title: "Quick status on [address]? Anything blocking us from closing on [COE]?"
2. Log the response in the opportunity note.
3. Update the partner with the same info (text or email).

### Step 7 — Final week
Starting **7 days before COE**:
1. Confirm title has everything they need (funds from buyer, signed seller docs, payoff statement on any existing mortgage).
2. Confirm the buyer is on track for cash-to-close.
3. Confirm the settlement statement / CD arrives **24 hours before close** for both parties to review.
4. Review the settlement statement:
   - Our assignment fee line item is present
   - Our wire instructions are correct
   - Partner's disbursement is correct
   - No surprise charges against us
5. Any issue on the settlement statement → immediate call to title to fix BEFORE signing.

### Step 8 — Close day
1. Confirm all parties signed.
2. Confirm funds disbursed by title.
3. Confirm our wire hit Deal Pros LLC's account.
4. Confirm the partner's wire or check was sent.
5. Update GHL: opportunity → **Closed Won**. Set `Closed At` date and `Final Assignment Fee`.
6. Tag contact with `closed_deal_[YYYY]`, `last_closed_[YYYY-MM]`.
7. Send partner the payout notification SMS from [SOP 14](./14-partner-communication.md):
   ```
   {{contact.first_name}} — {{custom_values.property_address}} closed! 🎉 Your 50/50 share is $[payout]. Title is wiring today. You should see it in 1–3 business days. Next deal?
   ```
8. Send the winning buyer a quick "thanks, looking forward to the next one" message.
9. File the final HUD / settlement statement in `/08 — Title & Closing/`.
10. Trigger [SOP 18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md).

## Templates & scripts

### Day-1 email to title
Subject: `Dispo Buddy — New Assignment — [City ST] — [Street] — COE [date]`
```
Hi [closer_name],

New assignment coming your way. Summary:

- Property: [address]
- Seller: [seller_name_entity]
- Partner-to-DispoBuddy contract: attached
- DispoBuddy-to-Buyer assignment: attached
- JV Agreement between DispoBuddy and [partner]: attached (for disbursement reference only)
- Target COE: [date]
- EMD: $[amount] — buyer is wiring by [date]

At close, please cut the net assignment fee 50/50 per the attached disbursement instructions:
- 50% to Deal Pros LLC (Dispo Buddy) — wire instructions attached
- 50% to [partner_name_or_entity] — wire instructions / mailing address attached

Please confirm receipt and let me know if anything is missing. We'd love to hit COE on [date].

Thanks,
[name]
Dispo Buddy • (480) 842-5332
```

### Weekly check-in
```
Hi [closer_name] — quick status on [address]? Anything blocking us from closing on [COE]? Happy to chase down whatever's open.

Thanks!
```

### Urgent title issue to partner
```
[partner_first_name] — title kicked back an issue on [address]: [one-sentence summary]. Calling you in 10 minutes to talk through it. Pick up.
```

### Settlement statement review request
```
Hi [closer_name] — can you send the settlement statement as soon as it's ready? Brooke will review our side within 2 hours of receipt so we're not holding up close day.
```

## SLAs / quality standards
- **Day-1 packet sent within 1 business day** of buyer signing
- **Weekly title check-in** every Monday until close
- **Settlement statement reviewed** within 2 hours of receipt
- **Our wire received AND partner wire confirmed** before marking Closed Won
- **Deal folder complete** — contract, assignment, JV, EMD receipt, settlement statement, wire confirmation, executed HUD all filed in `/08 — Title & Closing/` within 48 hours of close

## Escalation / edge cases
- **Title refuses to honor the assignment** → change title companies same day; escalate to Brooke.
- **Title refuses to cut a JV disbursement** → still closeable; we receive the full fee then ACH the partner their half per the JV agreement. Brooke authorizes this fallback.
- **Partner wants to re-trade on the fee at close** → absolute no; the JV agreement locks it. Brooke handles the pushback.
- **Buyer tries to extend COE past the contract deadline** → check the original purchase contract for extension rights; if the seller won't extend, the deal is at risk. Brooke + partner decide.
- **Seller backs out day-of-close** → collect EMD refund; mark opportunity as `Dead — Seller Backed Out`; brief the buyer and offer them the next similar deal.
- **Title company goes silent for > 48 hours** → escalate; second email + phone call; if still silent, consider whether to swap title companies (Brooke decides).
- **Partner is unreachable at close day** → we can close without them in most cases (they're not on title); just make sure their disbursement is wired per the JV agreement.
- **Mortgage payoff comes in higher than expected** (common on sub-to conversions) → re-run the math; if it eats too much of the spread, talk to partner immediately.

## Related SOPs
- [06 — Offer Management & Negotiation](./06-offer-management-negotiation.md) (upstream)
- [11 — Dead Deal / Rejection](./11-dead-deal-rejection.md) (for fall-throughs)
- [14 — Partner Communication](./14-partner-communication.md) (templates)
- [15 — Compliance](./15-compliance.md) (EMD handling)
- [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md) (downstream)

## Bottleneck this SOP addresses
**[B7 — Title coordination is ad-hoc per market](./00-bottlenecks.md#b7--title-coordination-is-ad-hoc-per-market)** — primary fix. The preferred-title list + day-1 packet is the whole solution.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 08 — Partner Onboarding

## Purpose
A new partner's first 7 days determine whether they become a repeat submitter. Today, most first-time partners submit a poor-quality deal, get a decline, and vanish. This SOP fixes that by front-loading education — so by the time they submit their first deal, they already know what "good" looks like.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA (drip execution, intro call scheduling)
- **Consulted:** Brooke (for intro calls with high-potential partners)

## Trigger
A new partner submits the `/join` form. `netlify/functions/partner-onboard.js` fires and:
1. Upserts a GHL contact
2. Applies partner role tag + partner type tag (wholesaler / bird dog / agent / investor)
3. Sends automated welcome SMS + email
4. Fires internal alert to Brooke

**The Dispo VA then runs the 7-day drip below.**

## Inputs required
- Internal alert (confirms something happened)
- GHL access
- Welcome pack assets (see "Welcome pack contents" below)

## Tools & systems used
- GHL → Contacts, Workflows, Templates, Conversations
- Calendly (or similar) for intro call booking
- Google Drive → shared welcome pack folder
- Loom (video library)

## The 7-day welcome drip

This is the single biggest lever on repeat submissions. Every new partner goes through it unless they opt out.

| Day | Channel | Content | Goal |
|---|---|---|---|
| 0 | SMS + Email | Welcome, what DispoBuddy does, link to `/process` | Set expectations |
| 1 | Email | "How to submit a great deal" guide (PDF or blog post) | Teach the rubric before they submit |
| 2 | Email | Sample deal sheet PDF | Show them our quality bar |
| 3 | Email | Buybox explainer — what our buyers want | Help them source better |
| 5 | SMS | "Want a 15-min intro call with Brooke?" + Calendly link | Build the human relationship |
| 7 | SMS | "Got a deal yet? Here's the 5-min submit form" | First-deal nudge |
| 14 | Email | If still no submission, "What's blocking you?" | Re-engage |
| 30 | Email | If still no submission, pause the drip; move to monthly newsletter | Graceful exit |

## Welcome pack contents

Stored in Google Drive → `/DispoBuddy/Partner Welcome Pack/` (shared link goes out in every Day 1 email).

1. **Welcome letter** (1 page) — who we are, why we exist, what we promise
2. **How to submit a great deal** (2 pages) — the 7 required items, with examples of good vs bad submissions
3. **Deal type playbook** (4 pages) — 1 page each on cash, sub-to, SF, novation, explaining when each makes sense
4. **Sample deal sheet** (1 page PDF) — our production quality
5. **Buybox explainer** (1 page) — "what our buyers want right now"
6. **FAQ** (2 pages) — mirrors `/faq` on the site
7. **Loom video library links** — 2-minute videos per deal type

## Step-by-step procedure

### Step 1 — On new partner signup
Within 2 hours of the internal alert:

1. Open the new contact in GHL.
2. Confirm the automated welcome SMS and email fired. If not, send manually from the template library.
3. Review the partner's self-reported info from the `/join` form:
   - Role (wholesaler / bird dog / agent / investor)
   - Primary markets
   - Deal types they work with
   - Monthly deal volume
   - "Got a deal ready now?"
4. Tag the contact:
   - `partner`
   - Role-specific: `partner_wholesaler` / `partner_bird_dog` / `partner_agent` / `partner_investor`
   - Volume-specific: `partner_low_volume` (1-3/mo) / `mid_volume` (4-10) / `high_volume` (11+)
   - `source_[source]` from the form
   - If `affiliate_id` is present in the form payload: `db-affiliate-referred` (the backend does this automatically via `partner-onboard.js`)
5. **If the partner was referred by an affiliate:**
   - The `referred_by_affiliate` custom field is already populated by the backend with the affiliate's ID
   - Verify the tag `db-affiliate-referred` is on the contact
   - When this partner closes their first deal, the affiliate earns the $200 bonus — see [SOP 20](./20-affiliate-program.md)
   - Do NOT tell the partner they were affiliate-referred; that's between us and the affiliate
6. **If they said "Got a deal ready now? = Yes"**:
   - Tag `hot_prospect`
   - Schedule an intro call within 48 hours (Brooke for high-volume, VA for low-volume)
   - Send the Day 5 SMS *immediately* — don't wait 5 days. They're ready, meet them there.

### Step 2 — Enroll in the drip workflow
1. Open the GHL workflow **"Partner Welcome Drip"**.
2. Add the new contact to the workflow (unless they're a `hot_prospect` — they're on a faster track).
3. Confirm the workflow is running.

### Step 3 — Monitor and personalize
Throughout the 7 days:

1. Watch their GHL activity log.
2. If they open the Day 1 guide and click through → all good, continue.
3. If they ignore Day 1 → send a personal SMS Day 3 asking if they have questions.
4. If they reply at any point → hand to [SOP 14](./14-partner-communication.md) for response.
5. If they book an intro call → Brooke or VA runs the call per the intro call script below.

### Step 4 — Intro call (15 minutes)
The script:

1. **Welcome** (1 min) — "Thanks for booking. Goal today: make sure you know how we work and get you set up to send your first deal."
2. **Their context** (3 min) — "Tell me about your business. What are you working on now? Any deals in your pipeline?"
3. **Our process** (3 min) — Walk through the 6 steps from `/process`. Emphasize 24-48hr, 50/50, non-exclusive.
4. **What we look for** (3 min) — "Here's how we underwrite. The non-negotiables are [list]. Here's what gets declined fast [list]."
5. **First deal coaching** (3 min) — "When you submit, send [list]. The difference between a 24-hour yes and a back-and-forth decline is whether you have [items]."
6. **Wrap** (2 min) — "Any questions? Great. Go submit something. Text me directly if you hit a snag."

**Log the call** in GHL with notes on what they're working on, their markets, and any commitments you made.

### Step 5 — First deal celebration
When the partner submits their first deal:
1. The automated first-deal welcome SMS fires (hardcoded in `dispo-buddy-submit.js`).
2. Add a personal note in the opportunity: "First deal for this partner — extra care on the review, extra patience on the feedback."
3. Route to [SOP 01](./01-deal-intake-triage.md).
4. After the decision (accept or decline), send a personal note of encouragement regardless of outcome.

### Step 6 — Graduation to repeat partner
After 2 closed deals with a partner:
1. Tag `repeat_partner`.
2. Send a "thank you for the repeat business" SMS with a VIP referral code (if applicable).
3. Offer to save their info for faster future submissions (we already do automatically — just remind them).

After 5 closed deals:
1. Tag `vip_partner`.
2. They get the top-3 personal outreach treatment on every deal submission (Brooke's direct line).

## Templates & scripts

### Day 0 welcome SMS (automated)
```
Welcome to Dispo Buddy, {{contact.first_name}}! You're now in our partner network. Over the next week I'll send you a few short resources on how to submit deals we can actually move. First one comes tomorrow. — Brooke
```

### Day 0 welcome email (automated)
Subject: `Welcome to Dispo Buddy`
```
Hi {{contact.first_name}},

You just joined the Dispo Buddy network — thanks for reaching out. Quick orientation:

**What we do:** We're your JV dispo partner. You find deals, we move them, we split 50/50 at close.

**What you do next:**
- Read our process: [link to /process]
- Check out what we look for: [link to /what-we-look-for]
- When you have a deal ready, submit it here: [link to /submit-deal]

Over the next week I'll send you 3 short resources so your first deal lands strong:

- Day 1: "How to submit a great deal"
- Day 2: Sample deal sheet (so you see what we produce)
- Day 3: What our buyers want right now

If you have a deal ready **right now**, skip ahead and [submit it] — I'll personally review it.

— Brooke
Dispo Buddy • (480) 842-5332
```

### Day 1 email
Subject: `How to submit a great deal (5-min read)`
```
Hi {{contact.first_name}},

Here's the difference between a 24-hour YES and a 3-day back-and-forth:

**You send us this (and the deal moves):**
1. Clear property address (full street, city, state, ZIP)
2. Contract price AND asking price
3. Your ARV estimate + 3 comps
4. Phone-quality photos (interior + exterior, 6+)
5. Deal type (cash, sub-to, SF, etc.)
6. Timeline (COE date, contract expiration)
7. Existing mortgage info (if creative finance)

**You don't send us this (and the deal sits):**
- Vague "house in Phoenix, good spread"
- "I'll get photos later"
- No comps / no ARV backup
- Padded numbers

Full how-to-submit guide: [Drive link to guide PDF]

Ready? [Submit a deal link]

— Brooke
```

### Day 2 email
Subject: `What our deal sheets look like`
```
Hi {{contact.first_name}},

Here's a sample of what we produce when you send us a good deal: [Drive link to sample deal sheet PDF]

This is what goes out to our buyer network. Professional, specific, defensible. This is why deals move.

When you submit a deal, we build this within 4 hours of signing the JV agreement. You focus on the next deal.

— Brooke
```

### Day 3 email
Subject: `What our buyers want right now`
```
Hi {{contact.first_name}},

Quick buyer update — here's what our active buyer network is asking for this month:

- **AZ, TX, FL** — cash SFR, $150k–$350k, 15%+ spread
- **TN, GA, KY** — sub-to and sub-to/hybrid, low-rate assumption
- **OH, IN** — small multi (2-4 unit) buy-and-hold, min 7% cap
- **All states** — motivated sellers with 30-45 day COE, no probate drama

If you're sourcing in those lanes, you're in our sweet spot.

Live buyer map: [link to /buyers-map]

— Brooke
```

### Day 5 SMS (intro call offer)
```
{{contact.first_name}} — want to hop on a 15-min call? I can walk you through what we look for in your specific markets and answer any questions. Book here: [Calendly link]
```

### Day 7 SMS (first deal nudge)
```
{{contact.first_name}} — ready to send your first deal? Takes 5 min. [Submit link]. If you want me to review before you submit, just text me the details and I'll take a look.
```

### Day 14 email (no submission yet)
Subject: `Checking in — any deals brewing?`
```
{{contact.first_name}},

Just checking in — nothing yet in the queue from you. What's blocking you? If there's a deal you're on the fence about, text me the numbers and I'll give you a gut-check before you submit.

— Brooke
```

### Day 30 email (graceful exit)
Subject: `Pausing our welcome series`
```
{{contact.first_name}},

Haven't heard from you in 30 days so I'm going to pause the welcome series. You're still in our network — when a deal comes up, just submit it at dispobuddy.com. We'll be here.

Monthly newsletter starts next month if you want market updates.

— Brooke
```

## SLAs / quality standards
- **100% of new partners enrolled** in the welcome drip within 2 hours of signup
- **Hot prospects booked for intro call within 48 hours**
- **Personal response to every reply** within 2 business hours
- **Tagging complete** within the first hour of signup
- **No unsubscribes or complaints** from the drip cadence (if we get even one, review the copy)

## Escalation / edge cases
- **Partner is a complete beginner** (no licensed activity, no past deals) → Brooke intro call; may need extra coaching or may not be a fit.
- **Partner has 10+ deals under contract right now** — VIP fast-track; Brooke runs the call personally; set up direct Slack/SMS channel.
- **Partner is also a licensed agent in a state with tight wholesaling rules** → Brooke + [SOP 15](./15-compliance.md) review before accepting any deal.
- **Partner pushes back on the 50/50 split** — we don't negotiate. Brooke replies with "here's why it's 50/50" pitch; if they still say no, they're not a fit.
- **Partner is hostile or rude during onboarding** — flag Brooke; we reserve the right to decline partners who can't work productively.
- **Partner wants to "become a buyer too"** — welcome! Route through [SOP 09](./09-buyer-network-intake.md) in parallel; tag `partner_and_buyer`.

## Related SOPs
- [09 — Buyer Network Intake](./09-buyer-network-intake.md) (if they also want to be a buyer)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (tagging conventions)
- [14 — Partner Communication](./14-partner-communication.md)
- [17 — Marketing & Lead Generation](./17-marketing-lead-generation.md) (source attribution)

## Bottleneck this SOP addresses
**[B4 — Partner onboarding has no education layer](./00-bottlenecks.md#b4--partner-onboarding-has-no-education-layer)** — primary fix.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version with 7-day drip + intro call script | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 09 — Buyer Network Intake

## Purpose
Our matching engine is only as good as the buyer data feeding it. This SOP defines the canonical buybox fields we capture per asset class, the intake script we use on every buyer call, and how the data lands in GHL so [SOP 05](./05-buyer-matching-outreach.md) can actually query it.

## Owner / Roles
- **Accountable:** Brooke (until a dedicated buyer-network manager is hired)
- **Responsible (call + data entry):** Brooke or Dispo VA (trained)
- **Consulted:** Dispo VA on repeat buyers

## Trigger
- A new buyer opts in (website form, referral, Facebook group, conference)
- An existing buyer wants to update their buybox
- A partner who closes deals with us expresses interest in buying too (tag `partner_and_buyer`)

## Inputs required
- Buyer's direct contact info (name, phone, email)
- 20-minute call slot (first-time intake) or 5-minute text exchange (update)
- GHL access (to create the contact and populate custom fields)

## Tools & systems used
- GHL → Contacts, Custom Fields, Tags, Notes
- Phone (primary — intake is a conversation, not a form)
- Optional Calendly for buyer booking

## Canonical buybox by asset class

Every buyer must be assigned to **one primary asset class** (they can have secondary classes). Each class has its own required fields on top of the universal fields below.

### Universal fields (every buyer, every asset class)

Map directly to the custom field IDs in `netlify/functions/buyer-demand.js`:

| Field (GHL name) | Field ID (buyer-demand.js) | Type | Example |
|---|---|---|---|
| Contact Role | `agG4HMPB5wzsZXiRxfmR` | select | `buyer` |
| Target States | `aewzY7iEvZh12JhMVi7E` | multi | `AZ, TX, FL` |
| Target Cities | `DbY7dHIXk8YowpaWrxYj` | text | `Phoenix, Tempe, Mesa` |
| Deal Structures | `0L0ycmmsEjy6OPDL0rgq` | multi | `cash, sub-to` |
| Property Type | `HGC6xWLpSqoAQPZr0uwY` | multi | `SFR, 2-4 multi` |
| Max Price | `BcxuopmSK4wA3Z3NyanD` | number | `350000` |
| Max Entry (sub-to/SF) | `SZmNHA3BQva2AZg00ZNP` | number | `50000` |
| Min ARV | `KKGEfgdaqu98yrZYkmoO` | number | `180000` |
| Exit Strategies | `98i8EKc3OWYSqS4Qb1nP` | multi | `flip, hold` |
| Buyer Type | `95PgdlIYfXYcMymnjsIv` | select | `individual_investor` |
| Purchase Timeline | (key: `purchase_timeline`) | select | `30_days` |
| Primary Asset Class | **new — create in GHL** | select | `sfr_flip` |
| Secondary Asset Classes | **new — create in GHL** | multi | `sfr_hold, small_multi` |

> **Note to Brooke:** "Primary Asset Class" and "Secondary Asset Classes" are new fields we need to create in GHL. Add them to the buyer contact type, configure the options below, and update `buyer-demand.js` to read them.

### Asset class rubrics

Each class below lists **additional required fields** on top of the universal ones.

#### SFR flip (`sfr_flip`)
Additional required fields:
- **Max repair budget** (number) — how much rehab capital they have per deal
- **Min post-rehab ROI %** (number) — e.g., 15%
- **Target neighborhood class** (multi-select: A / B / C / D)
- **Flip timeline** (select: ≤ 90 days / 90-180 / ≥ 180)
- **Contractor availability** (select: in-house crew / subcontractor / flexible)

Script questions:
- "What's the most you'll put into rehab on one deal?"
- "What post-rehab ROI do you need to pull the trigger?"
- "A / B / C / D neighborhoods — where do you play?"
- "How fast do you typically flip — under 3 months, 3-6, 6+?"

#### SFR buy-and-hold (`sfr_hold`)
Additional required fields:
- **Min rent** (number) — monthly
- **Min cap rate** (number) — e.g., 7%
- **Min DSCR** (number) — e.g., 1.2
- **Property condition tolerance** (select: turnkey only / light cosmetic OK / rehab OK)
- **Financing** (select: cash / DSCR loan / conventional / portfolio)

Script questions:
- "What's your minimum monthly rent per door?"
- "What cap rate floor are you working with?"
- "Are you funding with cash or a DSCR loan?"
- "Turnkey only or can you handle a light rehab?"

#### Small multi 2-4 units (`small_multi`)
Additional required fields:
- **Unit count preference** (select: 2 / 3 / 4 / any)
- **Min cap rate** (number)
- **Min cash-on-cash** (number)
- **Value-add appetite** (select: stabilized only / light reposition / heavy lift)
- **Unit mix preference** (text)

Script questions:
- "Prefer duplex, triplex, or 4-plex?"
- "What's your cap rate floor?"
- "Open to value-add deals or strictly stabilized?"

#### Large multi 5+ units (`large_multi`)
Additional required fields:
- **Min cap rate** (number)
- **Target IRR %** (number)
- **Structure** (select: direct / JV GP-LP / syndication)
- **Check size range** (number min/max)
- **Market class** (multi: A / B / C secondary / C tertiary)

Script questions:
- "Direct acquisitions or syndicating LP capital?"
- "Target IRR on exit?"
- "Minimum unit count to even look?"

#### Land (`land`)
Additional required fields:
- **Zoning type** (multi: residential / commercial / agricultural / industrial / mixed)
- **Acreage range** (number min/max)
- **Entitlement status** (select: raw / entitled / pad-ready)
- **Utility access required** (select: all in / partial OK / none OK)

Script questions:
- "Raw land only or entitled?"
- "What zoning are you hunting?"
- "Utility requirements?"

#### Mobile home / MHP (`mobile_home`)
Additional required fields:
- **Lot count** (number min/max)
- **Park-owned homes tolerance** (select: none / some OK / all OK)
- **Utilities** (multi: city water / city sewer / well / septic)
- **Location** (select: city / suburb / rural)

Script questions:
- "Single mobile, park, or both?"
- "How do you feel about POHs (park-owned homes)?"
- "Utility infrastructure — willing to do well/septic?"

#### Commercial (`commercial`)
Additional required fields:
- **Sub-type** (multi: retail / office / industrial / mixed-use / special purpose)
- **Min cap rate** (number)
- **Lease term preference** (select: triple-net / absolute NNN / gross / any)
- **Tenant credit preference** (select: investment grade / local / any)

Script questions:
- "What asset sub-types are you focused on?"
- "NNN only or gross leases OK?"

#### Sub-to buyer (`sub_to`)
Additional required fields:
- **Max UPB** (number) — max existing loan balance willing to assume
- **Min equity required** (number) — min seller equity after assumption
- **Down payment available** (number) — their cash to close
- **Loan type preference** (multi: conventional / FHA / VA / portfolio)
- **DOS (due-on-sale) risk tolerance** (select: low / medium / high)

Script questions:
- "What's your max UPB — the biggest loan you'll take over?"
- "How much cash do you have to close?"
- "FHA / VA loans OK or conventional only?"

#### Novation (`novation`)
Additional required fields:
- **Max entry fee** (number) — what they'll pay us
- **Retail marketing budget** (number)
- **Target markets for retail sale** (multi — states)
- **Agent relationship** (select: in-house / outside / both)

Script questions:
- "Max entry you'll pay on a novation?"
- "How do you handle retail listings — your own agent or outside?"

#### Seller finance (`seller_finance`)
Additional required fields:
- **Max loan amount** (number)
- **Max interest rate** (number)
- **Balloon tolerance** (select: none / 3+ years / 5+ years / flexible)
- **Down payment available** (number)

Script questions:
- "What's your interest rate ceiling on a seller-carry?"
- "Balloon OK or strictly amortizing?"

## Step-by-step intake procedure

### Step 1 — Confirm consent and schedule the call
When a new buyer opts in:

1. Send a welcome SMS within 2 hours:
   ```
   Hey {{contact.first_name}} — [your_name] with Dispo Buddy. Thanks for reaching out. Want to hop on a 15-20 min call so I can learn your buybox and start sending you deals that fit? Here's my calendar: [Calendly link]. Or text me a time that works.
   ```
2. Schedule the call.
3. Pre-fill what you know: name, phone, email, any info from how they found us.

### Step 2 — The intake call (15–20 minutes)

**Part 1 — Warm-up (2 min)**
- "Tell me about your real estate business. What's your primary play?"
- Listen for: asset type, investment approach, volume.

**Part 2 — Asset class clarification (3 min)**
- "So your main thing is [what they said]. Anything else you buy?"
- Assign primary + secondary asset classes.

**Part 3 — Universal fields (5 min)**
Walk through the universal fields above. Use open questions:
- "What states and cities are you active in?"
- "What deal structures do you look at — cash, sub-to, seller finance, novation?"
- "What's your max purchase price — the ceiling you won't go above?"
- "What ARV are you looking for, minimum?"
- "Buying for yourself or with capital partners?"
- "Timeline — can you close in 30, 60, 90 days?"

**Part 4 — Asset class specifics (5 min)**
Use the asset class rubric above. Ask the script questions for their primary class. If they have secondary classes, ask the top 2 questions for each.

**Part 5 — Relationship close (2 min)**
- "A few expectations so we work well:
  - I'll text or email you deals that match your buybox. Not spam. If you don't like the frequency, tell me.
  - If you see a deal you're interested in, reply fast — we move quickly.
  - If your buybox changes, tell me so I don't waste your time."
- "Last thing: any buyers or partners you think I should connect with? Referrals get VIP access."

**Part 6 — Log the call**
Immediately after the call, while it's fresh:
1. Open the GHL contact.
2. Fill every required custom field (universal + asset-specific).
3. Apply tags:
   - `buyer`
   - `asset_[primary_class]` (e.g., `asset_sfr_flip`)
   - One `source_*` tag
   - `active_buyer` (set expiration date = today + 90 days)
4. Write the call note:
   ```
   INTAKE CALL — [YYYY-MM-DD]
   Duration: [N] min
   Primary asset: [class]
   Secondary: [classes]
   Key highlights: [what stood out]
   Next touch: [date / action]
   Referrals mentioned: [names if any]
   ```

### Step 3 — Send a recap + confirmation
Within 1 hour of the call:

```
Hey {{contact.first_name}} — great talking. To recap, I've got you in as:

- Primary: [asset class]
- Markets: [states/cities]
- Deal structures: [list]
- Max price: $[X]
- Min ARV: $[X]
- [3-4 key asset-specific fields]

Is that right? Text me if anything's off. Otherwise I'll start sending matched deals as they come in.
```

This gives the buyer one last chance to correct anything + locks in the data.

### Step 4 — Add to matching rotation
1. The smart lists in [SOP 05](./05-buyer-matching-outreach.md) will automatically pick them up once custom fields are populated.
2. Send them the *most recent* matched deal as a "here's an example of what you'll get" touch within 48 hours.

## Templates & scripts

### Intro SMS
See Step 1.

### Recap SMS
See Step 3.

### Buybox update SMS (existing buyer)
```
Hey {{contact.first_name}} — quick buybox check-in. Anything changed on your end? New markets, different price range, different deal types? Shoot me the updates so I'm sending you the right deals.
```

### Frequency complaint reply
```
Heard. I'll dial it back. I'll only send deals that are a direct hit on your buybox from now on. If you want to pause entirely just reply PAUSE.
```

## SLAs / quality standards
- **Intake call booked within 48 hours** of buyer opt-in
- **All required custom fields filled** on every new buyer — 100%
- **Recap message sent within 1 hour** of the call
- **First matched deal sent within 48 hours** of intake
- **Call note written** on every intake — no silent intakes

## Escalation / edge cases
- **Buyer is vague on buybox** ("I'll look at anything good") — push them. We need real numbers or we can't match. If they won't give numbers after prompting, tag `vague_buybox` and reduce outreach frequency.
- **Buyer wants to buy in a state we don't serve** — take their info, tag `out_of_market`, and flag Brooke. We may be able to grow into their market.
- **Buyer wants exclusivity / first look** — politely no. We're not an exclusive buyer. Offer top-3 status if they're VIP.
- **Buyer pushes back on the 50/50 split (they want our margin)** — they're asking us to be a free lead service. No. Escalate.
- **Buyer tries to go around us to the partner** — Brooke + [SOP 15](./15-compliance.md). That's a JV agreement breach on their side if we caught them.

## Related SOPs
- [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md) (the matching engine this SOP feeds)
- [10 — Buyer Network Hygiene](./10-buyer-network-hygiene.md) (keeping the data fresh)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (tags + custom fields)

## Bottleneck this SOP addresses
**[B2 — Deal → buyer matching is manual and memory-based](./00-bottlenecks.md#b2--deal--buyer-matching-is-manual-and-memory-based)** and **[B3 — Buybox is not collected consistently across asset types](./00-bottlenecks.md#b3--buybox-is-not-collected-consistently-across-asset-types)** — both primary fixes.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version with canonical buybox per asset class | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 10 — Buyer Network Hygiene

## Purpose
Buyer criteria drift. People move, raise capital, lose capital, pivot strategies. A buybox that was right 6 months ago is wrong today. This SOP is the monthly maintenance routine that keeps our buyer data accurate so the matching engine ([SOP 05](./05-buyer-matching-outreach.md)) actually works.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (monthly sweep):** Dispo VA
- **Responsible (quarterly refresh):** Brooke + Dispo VA
- **Consulted:** Brooke on any buyer being dropped

## Trigger
- **Monthly** — first business day of every month
- **Quarterly** — first business day of every quarter (deeper refresh)
- **Ad-hoc** — whenever a buyer complains about relevance or a matching query returns zero results in an active market

## Inputs required
- GHL access
- Current list of active buyers
- Smart lists for hygiene queries (listed below)

## Tools & systems used
- GHL → Contacts, Smart Lists, Custom Fields, Conversations
- Google Sheet: "Buyer Hygiene Log" (monthly tracking)

## Standing hygiene smart lists (build once, reuse forever)

Create these smart lists in GHL and use them every month:

| Smart list name | Filter | Used for |
|---|---|---|
| **Buyers — Missing Required Fields** | Contact role = buyer, AND any of (Target States / Deal Structures / Property Type / Max Price / Min ARV / Buyer Type) is empty | Monthly cleanup |
| **Buyers — Stale** | Contact role = buyer, AND last activity > 60 days ago | Monthly re-engagement |
| **Buyers — Unresponsive** | Contact role = buyer, AND sent 3+ SMS in last 30 days with 0 replies | Frequency audit |
| **Buyers — Never Replied** | Contact role = buyer, AND total inbound replies = 0 all-time | Deep stale |
| **Buyers — Complained About Frequency** | Contact role = buyer, AND tag `frequency_complaint` | Frequency adjustment |
| **Buyers — Quarterly Refresh Due** | Contact role = buyer, AND last buybox refresh > 90 days ago | Quarterly sweep |
| **Buyers — Hot (Recent Offers)** | Contact role = buyer, AND has `interested_in_*` or `offered_on_*` tag in last 30 days | Priority list |

## Monthly sweep procedure (90 minutes, first business day of every month)

### Step 1 — Missing fields cleanup (30 min)
1. Open smart list **Buyers — Missing Required Fields**.
2. For each buyer on the list (work your way down, most recently active first):
   1. Check the GHL note history. Any past call notes with the missing data?
   2. If yes → populate the field from the notes, save.
   3. If no → send the "buybox update" SMS from [SOP 09](./09-buyer-network-intake.md) and schedule a 5-min follow-up call if needed.
3. **Goal:** zero buyers on this list by end of sweep. Any buyer who can't be fixed in this pass goes on the "Pending Cleanup" list and gets re-attempted next month.

### Step 2 — Stale re-engagement (20 min)
1. Open smart list **Buyers — Stale** (60+ days silent).
2. Send the "still active?" SMS from the templates below.
3. Watch replies over the next 3 business days. Any buyer who replies → update their last activity note and any new buybox info. Any buyer who doesn't reply after 3 business days → move to smart list **Buyers — Never Replied**.

### Step 3 — Frequency audit (15 min)
1. Open smart list **Buyers — Unresponsive**.
2. For each buyer: reduce outreach frequency to 50% (tag `reduced_frequency`). Note the change.
3. Open smart list **Buyers — Complained About Frequency**.
4. Confirm their outreach frequency is set to minimum (matched deals only, no blasts).

### Step 4 — Deep stale archive (15 min)
1. Open smart list **Buyers — Never Replied**.
2. For each buyer who's been in the system > 120 days with zero replies:
   1. Remove `active_buyer` tag.
   2. Add `archived_buyer` tag.
   3. Note: `[YYYY-MM-DD] Archived — 120+ days no response. Removed from matching rotation.`
3. Archived buyers stop receiving blasts but remain queryable if someone asks about them later.

### Step 5 — Hygiene log update (10 min)
Open the Google Sheet "Buyer Hygiene Log" and fill in:

| Date | Missing-fields fixed | Stale re-engaged | Reduced frequency | Archived | Net active buyers |
|---|---|---|---|---|---|
| YYYY-MM-DD | N | N | N | N | N |

Submit the row as part of the Monday ops digest on the first Monday of the month.

## Quarterly refresh procedure (3 hours, first business day of Jan/Apr/Jul/Oct)

The quarterly refresh is a **proactive** touch to every active buyer to re-confirm their criteria. This is what keeps the buybox data fresh across asset types — the [B3](./00-bottlenecks.md#b3--buybox-is-not-collected-consistently-across-asset-types) fix.

### Step 1 — Segment the list (15 min)
1. Export the full active buyer list.
2. Segment by Primary Asset Class.
3. For each asset class, rank by: (a) closed deals with us, (b) recent reply engagement, (c) total time on network.

### Step 2 — Send the quarterly check-in
Use the template below. Send it via the **"Quarterly Buybox Refresh"** workflow in GHL so responses flow back to a single thread.

### Step 3 — Process replies (2 hours)
For each reply:
1. Update universal custom fields if anything changed.
2. Update asset-class-specific fields.
3. If they added a new asset class → run a mini intake per [SOP 09](./09-buyer-network-intake.md) for the new class.
4. If they want to pause or leave → tag `paused_buyer` or `do_not_contact` as appropriate; remove from matching.
5. Log the refresh in a note:
   ```
   [YYYY-MM-DD] Quarterly refresh completed. Changes: [list] OR no changes.
   ```

### Step 4 — Non-responders
Buyers who don't respond to the quarterly refresh within 7 business days:
1. Tag `stale_buybox` (implies matching results may be inaccurate)
2. Reduce outreach to *matched only* until they re-engage
3. Add to next month's stale re-engagement list

### Step 5 — Update the `/buyers-map`
After the quarterly refresh is complete, check the live `/buyers-map` page (powered by `netlify/functions/buyer-demand.js`). Counts per state should reflect the updated data. If the map looks wrong (e.g., suspiciously low numbers in an active market), investigate the function logs.

## Templates & scripts

### Monthly — missing fields SMS
```
Hey {{contact.first_name}} — quick update so I don't waste your time. I don't have your [field] on file. Can you tell me: [question specific to the missing field]? 30 seconds to reply.
```

### Monthly — stale re-engagement SMS
```
{{contact.first_name}} — haven't sent you a deal in a bit. Still actively buying in [their_market]? Same buybox or did it change? Let me know so I send you the right stuff.
```

### Monthly — frequency reduction notice
```
{{contact.first_name}} — noticed I might be sending too much. I'm cutting back. From here you'll only get deals that are a direct hit on your buybox. If you want to pause entirely just reply PAUSE.
```

### Quarterly refresh — full check-in
```
Hey {{contact.first_name}} — quarterly check-in. Want to make sure my list of what you're buying is still accurate.

Last time we talked you were looking for:
- [primary asset class]
- In: [states/cities]
- Max price: $[X]
- Min ARV: $[X]
- [1 key asset-specific field]

Is any of that different now? Reply "same" or tell me what changed. I'll update your file either way.

— [your name] at Dispo Buddy
```

### Archive notice (internal only, no outbound)
No SMS to the buyer. They just stop receiving blasts. If they ever reach back out, un-archive them.

## SLAs / quality standards
- **Monthly sweep completed** within 2 business days of month start
- **Quarterly refresh completed** within 5 business days of quarter start
- **Hygiene log updated** same day as each sweep
- **Zero required-field gaps** on any active buyer by end of each monthly sweep
- **Reply rate target** — 60%+ on quarterly refresh. If it drops below 40%, the message copy or cadence needs work; flag Brooke.

## Escalation / edge cases
- **Buyer complains** during a hygiene sweep ("why are you asking me this again?") — apologize, explain we do quarterly check-ins to avoid sending irrelevant deals, reduce outreach frequency one notch as a good-will gesture.
- **Buyer says they're out of the market for 6+ months** — tag `paused_buyer` with a reactivation date; do not blast; re-engage after the date.
- **Buyer says they closed deals with someone else and you didn't send them the ones that closed** — this is a matching failure. Pull the last 30 days of deals in their criteria, see which ones we did or didn't match them to. Root-cause and fix.
- **Buyer asks to stop receiving SMS but keep email** — respect; set their contact preference and reduce SMS frequency to zero.
- **Any buyer you can't find a clean match for in 6 months** — have a candid call with Brooke about whether their criteria is realistic for our deal flow.

## Related SOPs
- [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md) (downstream beneficiary)
- [09 — Buyer Network Intake](./09-buyer-network-intake.md) (upstream)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md)
- [14 — Partner Communication](./14-partner-communication.md)

## Bottleneck this SOP addresses
**[B2 — Deal → buyer matching is manual and memory-based](./00-bottlenecks.md#b2--deal--buyer-matching-is-manual-and-memory-based)** and **[B3 — Buybox is not collected consistently across asset types](./00-bottlenecks.md#b3--buybox-is-not-collected-consistently-across-asset-types)**.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 11 — Dead Deal / Rejection

## Purpose
How we handle a "no" matters as much as how we handle a "yes." A good rejection keeps the partner in the network for their next deal; a bad one burns the bridge forever. This SOP defines the honest-but-kind rejection template library and the process for logging dead deals so the data feeds back into marketing and underwriting.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (drafting the decline):** Dispo VA
- **Responsible (sign-off + sending):** Brooke (until VA is trained, then VA solo for clear-cut rubric declines)

## Trigger
Any one of:
1. Underwriting per [SOP 02](./02-deal-underwriting.md) returns RED (auto-decline)
2. Brooke overrides a YELLOW deal with a decline
3. A deal sits in "Needs Info" for > 72 hours with no partner response (dead by neglect)
4. A deal in Marketing sits > 30 days with zero traction and no path forward
5. A deal goes under contract with a buyer and then falls through (seller backs out, title issue)

## Inputs required
- The underwriting memo (if underwriting decline)
- The specific reason for decline (tied to the rubric or the situation)
- Partner's contact record

## Tools & systems used
- GHL (opportunity stage + notes)
- SMS/email (template library)
- Notion (closing out the row)

## Step-by-step procedure

### Step 1 — Classify the decline type
Use one of these categories. Each one gets a different message treatment.

| Category | Tag | Message treatment |
|---|---|---|
| **Underwriting fail — numbers** | `declined_numbers` | Specific feedback on what didn't work |
| **Underwriting fail — market** | `declined_market` | Honest about buyer demand gap |
| **Underwriting fail — compliance / legal** | `declined_compliance` | Minimal detail, route to partner's attorney |
| **Incomplete submission** | `declined_incomplete` | Warm — "send it back when you have X" |
| **Ghosted — partner didn't respond** | `declined_ghosted` | No message; we move on |
| **No buyer interest** | `declined_no_interest` | Honest report of what we tried |
| **Seller backed out** | `dead_seller_backed_out` | Empathetic; mark the partner positively |
| **Title issue killed it** | `dead_title_issue` | Explain the issue, file for insurance review |

### Step 2 — Draft the message
Use the matching template below, customized for the specific deal. **Be specific.** A vague "we're going to pass" message is worse than a detailed decline.

### Step 3 — Brooke sign-off (until VA is certified)
1. Paste the draft into the daily ops thread.
2. Brooke approves or edits.
3. Once 10 consecutive VA drafts have been approved without meaningful edits, Brooke certifies the VA to send declines in the `numbers`, `incomplete`, and `no_interest` categories solo. The other categories always need Brooke.

### Step 4 — Send the message
Via GHL SMS + follow-up email for formality.

### Step 5 — Update GHL
1. Move the opportunity to the appropriate stage: **Declined** or **Dead — Seller Backed Out**
2. Apply the decline tag from the table above
3. Fill in the `Decline Reason` custom field (free text — the one-sentence why)
4. Paste into the note log:
   ```
   [YYYY-MM-DD HH:MM] [initials] — DECLINED. Category: [category]. Reason: [one sentence]. Message sent.
   ```

### Step 6 — Update Notion
Per [SOP 13](./13-notion-deal-tracker.md), update the row:
- Status → Declined / Dead
- Decision At → today
- Closed At → today
- Notes → decline reason

### Step 7 — Update partner record
1. If this is the partner's first deal AND it's a soft decline (numbers, incomplete) → leave a positive note: `first_deal_declined_but_coachable`. Do NOT let them fall off the welcome drip.
2. If this is the partner's third decline in a row → tag `declined_streak`; offer a coaching call.
3. If this is a partner with closed deals in the past → send a warmer, more personal decline.
4. If the deal died through no fault of theirs (seller backed out, title issue) → **positive note**, e.g., `deal_died_external_reason`. Do not penalize them. Actively encourage them to send the next deal.

### Step 8 — Feed data back
At the end of every month:
1. Pull the list of declined deals.
2. Tally by category.
3. Feed into the Monday cadence ([SOP 19](./19-weekly-operations-cadence.md)):
   - High `declined_numbers` count? → Partner education (SOP 08) needs stronger coaching on the rubric
   - High `declined_incomplete` count? → Form UX needs work (SOP 16) OR onboarding needs better "how to submit" content
   - High `declined_no_interest` count in a specific market? → Buyer network gaps (SOP 09 + 10 + active sourcing)
   - High `dead_seller_backed_out`? → Look for a pattern (partner sourcing motivated sellers poorly? Or normal noise?)

## Templates & scripts

### Decline — numbers (rubric failed)
SMS:
```
{{contact.first_name}} — tough call, but we're going to pass on [address]. Reason: [specific rubric failure — e.g., "spread is 6%, we need 12%+ to move a cash deal in this market"]. If you can get the contract price down to $[X] or the asking up to $[Y], we'd take another look. Keep the deals coming.
```

Email (longer form):
Subject: `[address] — a pass (and why)`
```
{{contact.first_name}},

Thanks for sending [address] over. We looked at it seriously but we're going to pass. Here's why:

We underwrite every cash deal against these thresholds:
- Spread % ≥ 12%
- ARV cushion ≥ 25%
- Fee-to-ARV ≤ 8%

On this one:
- Spread is $[X] on $[Y] asking = [X]%
- ARV cushion is [X]%
- Fee-to-ARV is [X]%

The spread is the one that's too tight for our buyers in this market. What would make us look at this again:
- Drop the contract price to $[X]
- OR raise the asking to $[Y]
- OR find a different structure (sub-to, novation) that changes the math

This is not a "we're too busy" pass — we genuinely underwrote it. If you can adjust, send it back.

Keep the deals coming — one pass doesn't mean anything about the next one.

— Dispo Buddy
```

### Decline — market (no buyer demand)
```
{{contact.first_name}} — numbers work on [address] but we don't have enough buyers in [market] right now to move it fast. We'd rather be honest than sit on it. If you have deals in [markets where we're strong], we're your people. Try us in [list of strong markets].
```

### Decline — compliance
```
{{contact.first_name}} — on [address], we're going to pass for compliance reasons specific to [state]. Without getting into legal specifics, you'll want your real estate attorney to walk through the assignment rules in this state before moving this one. Not a knock on the deal or you — just how we operate in that market.
```

### Decline — incomplete
```
{{contact.first_name}} — we need [specific missing items] to even underwrite [address]. Couldn't reach you on [date/date]. When you have those, just reply to this or resubmit and we'll pick it up.
```

### No message — ghosted partner
No message. Close out internally only.

Internal note:
```
[YYYY-MM-DD HH:MM] [initials] — Ghosted. Partner didn't respond to [X] follow-ups over [Y] days. Closing as declined_ghosted. No outbound.
```

### Decline — no buyer interest after marketing
```
{{contact.first_name}} — wanted to close the loop on [address]. We ran it through our matched buyers, got [N] looks, no offers that worked. A few buyers said [common feedback]. If you can [suggested adjustment], send it back. Otherwise, next one.
```

### Dead — seller backed out
```
{{contact.first_name}} — frustrating update: seller backed out on [address]. Had a buyer in a good spot and everything. Not on you at all — sellers are sellers. I'm refunding EMD to the buyer and closing the file. Send me your next one — we want to work with you again.
```

### Dead — title issue
```
{{contact.first_name}} — [address] is dead. Title came back with [issue type]. Your attorney may be able to clean it up down the road, but for our timeline we can't move it. Not your fault. Your next deal: I want it. Send it over.
```

### First-deal soft landing (always append when declining a first-time partner)
Append this to any decline for a first-time partner:
```

P.S. This was your first deal with us and I know a decline stings. Most partners who hit us with a great deal on attempt 3 or 4 had a pass on their first. You're not blacklisted, you're not on a list, and I want the next one. — Brooke
```

## SLAs / quality standards
- **Decline sent within 2 hours** of decision (or within business hours if decision was overnight)
- **Specific reason** on every decline — no vague "not a fit" messages
- **Category tag applied** on every decline for the monthly report
- **100% of Notion rows closed out** same day
- **First-deal partners always get the soft landing** P.S.

## Escalation / edge cases
- **Partner reacts angrily to a decline** — hand to Brooke. Do not engage.
- **Partner pushes for a re-review** — if the numbers genuinely changed, yes. If they're just hoping we'll change our mind, politely no.
- **A buyer offers on a deal we declined** (they saw it through the partner directly) — that's fine, we were non-exclusive. No action needed.
- **Partner accuses us of declining so we can buy it ourselves** — **never do this**. Brooke + [SOP 15](./15-compliance.md) immediately if accused. We do not acquire deals we declined to JV on.
- **Serial decliner** (partner has 5+ declines, no accepts) — offer a coaching call (Brooke). They may be in the wrong lane for us entirely.

## Related SOPs
- [02 — Deal Underwriting](./02-deal-underwriting.md) (upstream, rubric defines most declines)
- [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md) (upstream for no-interest declines)
- [08 — Partner Onboarding](./08-partner-onboarding.md) (for first-deal soft landing)
- [14 — Partner Communication](./14-partner-communication.md) (tone guide)
- [15 — Compliance](./15-compliance.md) (compliance-category declines)
- [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md) (monthly tally feeds back)

## Bottleneck this SOP addresses
Supports [B4](./00-bottlenecks.md#b4--partner-onboarding-has-no-education-layer) — a good decline keeps the partner in the funnel, which is the same goal as the welcome drip.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 12 — GHL CRM Hygiene

## Purpose
GoHighLevel is the single source of truth for every contact, deal, conversation, and workflow at DispoBuddy. If GHL is messy, every other SOP fails downstream. This SOP defines the canonical pipeline, tags, custom fields, and daily hygiene routine so the CRM stays trustworthy.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (daily):** Dispo VA
- **Responsible (weekly sweep):** Admin VA

## Trigger
- **Daily** — end of business day (inbox zero sweep)
- **Weekly** — every Monday as part of [SOP 19](./19-weekly-operations-cadence.md)
- **On-demand** — any time a new automation or tag is added

## Inputs required
- GHL login (`login.leadconnectorhq.com`)
- Current list of pipelines, tags, custom fields (below)

## Tools & systems used
- GoHighLevel — Conversations, Contacts, Opportunities, Workflows, Custom Fields

## Canonical pipeline: "3. JV Deals"

Pipeline ID: `XbZojO2rHmYtYa8C0yUP` (hardcoded in `netlify/functions/dispo-buddy-submit.js`)

| Stage | Stage ID | What it means | Who moves it | Target time-in-stage |
|---|---|---|---|---|
| New JV Lead | `cf2388f0-fdbf-4fb1-b633-86569034fcce` | Deal submitted via `/submit-deal` | automated | ≤ 2 hours |
| Under Review | *(add)* | Underwriting in progress | Dispo VA | ≤ 24 hours |
| Needs Info | *(add)* | Waiting on partner for missing fields | Dispo VA | ≤ 12 hours |
| Accepted — Package | *(add)* | Underwriting pass, JV agreement going out | Dispo VA | ≤ 6 hours |
| JV Signed | *(add)* | Fully executed agreement in file | automated via DocuSign webhook | ≤ 2 hours to next stage |
| Marketing | *(add)* | Deal sheet out, buyers being contacted | Dispo VA | 1–7 days |
| Offer Received | *(add)* | At least one written offer in hand | Dispo VA | ≤ 24 hours |
| Under Contract (Buyer) | *(add)* | Buyer signed, heading to title | Dispo VA | varies by COE |
| Closed Won | *(add)* | Funded at close, JV disbursed | Dispo VA | final |
| Declined | *(add)* | We passed — see [SOP 11](./11-dead-deal-rejection.md) | Dispo VA | final |
| Dead — Seller Backed Out | *(add)* | Deal died through no fault of ours | Dispo VA | final |

> **Note to Brooke:** The stages marked *(add)* need to be created in GHL. Today only "New JV Lead" is confirmed in the code. Once created, paste the new stage IDs into this table and into `netlify/functions/dispo-buddy-submit.js` where stage transitions are triggered.

## Canonical tag taxonomy

Tags are applied automatically by the Netlify functions and manually by the VA. Use **lowercase with underscores**. Never create a tag outside this list without Brooke's approval.

### Contact role tags
- `partner` — wholesaler / bird dog / agent who submits deals
- `buyer` — investor in our buyer network
- `partner_and_buyer` — does both
- `vendor` — title, attorney, contractor, etc.

### Partner source tags
- `source_social_media`
- `source_referral`
- `source_google_search`
- `source_facebook_group`
- `source_youtube`
- `source_podcast`
- `source_other`

### Deal type tags (applied to the opportunity, not the contact)
- `deal_cash`
- `deal_subto`
- `deal_seller_finance`
- `deal_novation`
- `deal_hybrid`
- `deal_morby_stack`
- `deal_lease_option`
- `deal_wrap_mortgage`

### Asset type tags (buyers only)
- `asset_sfr_flip`
- `asset_sfr_hold`
- `asset_small_multi`
- `asset_large_multi`
- `asset_land`
- `asset_mobile_home`
- `asset_commercial`

### Affiliate tags
- `db-affiliate` — is an affiliate in our program
- `affiliate-active` — currently active affiliate
- `db-affiliate-referred` — this partner/lead was referred by an affiliate

### Status tags
- `first_deal` — partner's first submission
- `repeat_partner` — ≥ 2 closed deals
- `vip_partner` — ≥ 5 closed deals OR referred us
- `do_not_contact` — opted out (STOP keyword or manual)
- `declined_recent` — deal declined in last 30 days

## Canonical custom fields (buyers)

These map 1:1 to the field IDs in `netlify/functions/buyer-demand.js`. Every buyer record must have all of them filled in.

| Field name (GHL) | Field ID | Type | Required |
|---|---|---|---|
| Target States | `aewzY7iEvZh12JhMVi7E` | multi-select | yes |
| Target Cities | `DbY7dHIXk8YowpaWrxYj` | text | yes |
| Deal Structures | `0L0ycmmsEjy6OPDL0rgq` | multi-select | yes |
| Property Type | `HGC6xWLpSqoAQPZr0uwY` | multi-select | yes |
| Max Price | `BcxuopmSK4wA3Z3NyanD` | number | yes |
| Max Entry | `SZmNHA3BQva2AZg00ZNP` | number | yes |
| Min ARV | `KKGEfgdaqu98yrZYkmoO` | number | yes |
| Exit Strategies | `98i8EKc3OWYSqS4Qb1nP` | multi-select | yes |
| Buyer Type | `95PgdlIYfXYcMymnjsIv` | select | yes |
| Contact Role | `agG4HMPB5wzsZXiRxfmR` | select | yes |
| Purchase Timeline | (by key: `purchase_timeline`) | select | yes |

See [SOP 09](./09-buyer-network-intake.md) for the canonical intake script that captures all of these.

## Canonical custom fields (affiliates)

These are created by `netlify/functions/affiliate-signup.js` and updated by `affiliate-track.js`.

| Field name (GHL) | Type | Set by |
|---|---|---|
| `affiliate_id` | text | signup function |
| `affiliate_referral_link` | text | signup function |
| `affiliate_status` | select (active/paused/terminated) | signup function / manual |
| `affiliate_joined_at` | date | signup function |
| `affiliate_payout_method` | text | post-approval (manual) |
| `affiliate_payout_details` | text | post-approval (manual) |
| `affiliate_clicks` | number | track function |
| `affiliate_signups` | number | track function |
| `affiliate_deals_submitted` | number | track function |
| `affiliate_deals_closed` | number | track function |
| `affiliate_commission_earned` | number | track function |
| `affiliate_commission_paid` | number | manual (on payout) |
| `affiliate_last_event` | text | track function |
| `referred_by_affiliate` | text | submit / onboard functions (on the referred partner's record) |

See [SOP 20](./20-affiliate-program.md) for the full affiliate management workflow.

## Step-by-step daily hygiene procedure

End of business day, every day:

1. **Conversation inbox zero**
   1. Open **GHL → Conversations**.
   2. Filter by "Unread."
   3. Reply, mark resolved, or snooze every unread message. Target: zero unread at EOD.
   4. If a reply is waiting on Brooke, **tag it `@brooke`** in the internal note and move on.

2. **Pipeline walk (JV Deals)**
   1. Open **GHL → Opportunities → 3. JV Deals** (kanban view).
   2. For each deal in "New JV Lead" that was submitted > 2 hours ago → move to "Under Review" and assign reviewer.
   3. For each deal in "Under Review" that is > 24 hours old → escalate to Brooke in the daily Slack/text.
   4. For each deal in "Needs Info" that is > 12 hours old → re-ping the partner (use the template in [SOP 14](./14-partner-communication.md)).
   5. For each deal in "Marketing" with zero activity in 5 days → escalate per [SOP 05](./05-buyer-matching-outreach.md).

3. **Note hygiene**
   1. On every deal you touched today, add a dated internal note summarizing the action. Format:
      ```
      [YYYY-MM-DD HH:MM] [initials] — [what you did]
      ```
   2. Never rely on the activity log alone. Always write an explicit note for any decision.

4. **Tag audit (weekly on Mondays)**
   1. Smart list: "contacts with no role tag." Fix each one.
   2. Smart list: "opportunities with no deal type tag." Fix each one.
   3. Smart list: "buyers with any required custom field empty." Route to [SOP 10](./10-buyer-network-hygiene.md) for cleanup.

5. **Workflow health**
   1. Open **GHL → Automation → Workflows**.
   2. Check the execution log for the "Deal Submission Notifications" and "Partner Onboarding Drip" workflows.
   3. Any errors in the last 24 hours → screenshot and send to Brooke.

## Templates & scripts

**Internal note format (paste into every deal note):**
```
[YYYY-MM-DD HH:MM] BW — Reviewed comps. Spread 22%, fee 8% of ARV. GREEN. Moving to Accepted — Package.
```

**Escalation ping to Brooke (Slack/text):**
```
ESC — Deal [partner name] [city, state] stuck in [stage] for [X hours]. Reason: [blocker]. Need: [decision or action from you].
```

## SLAs / quality standards
- **Conversation inbox:** 0 unread at 6 PM local every day
- **Pipeline stage transitions:** hit every target time-in-stage in the table above. Miss twice in a month → retrospective at next Monday cadence.
- **Note density:** every deal has at least one note per business day while in an active stage
- **Tag completeness:** 100% of contacts have a role tag; 100% of opportunities have a deal type tag

## Escalation / edge cases
- **An opportunity is in the wrong pipeline entirely** → do NOT move it cross-pipeline. Flag Brooke; she may need to re-create it.
- **A contact has conflicting tags** (e.g., `partner` + `do_not_contact`) → keep `do_not_contact`, remove the other, leave a note.
- **A custom field has an unknown option** (someone typed a freeform value in a select field) → fix it to the canonical value, tag Brooke in a note explaining what you changed.
- **Workflow appears stuck** → never "unstick" it manually. Screenshot and escalate.

## Related SOPs
- [01 — Deal Intake & Triage](./01-deal-intake-triage.md)
- [09 — Buyer Network Intake](./09-buyer-network-intake.md)
- [10 — Buyer Network Hygiene](./10-buyer-network-hygiene.md)
- [13 — Notion Deal Tracker](./13-notion-deal-tracker.md)
- [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md)

## Bottleneck this SOP addresses
[B8 — GHL and Notion drift apart](./00-bottlenecks.md#b8--ghl-and-notion-drift-apart-dual-source-of-truth-problem), [B1 — Underwriting single-threaded](./00-bottlenecks.md#b1--underwriting-is-single-threaded-on-the-founder) (upstream of the hygiene routine)

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 13 — Notion Deal Tracker

## Purpose
Notion is DispoBuddy's read-only reporting and historical view of every deal. It exists because pipeline views in GHL are great for active work but terrible for (a) retrospective reporting, (b) slicing by attributes, and (c) giving Brooke a calm weekly overview. This SOP defines the schema, when each field is updated, and how to keep it synchronized with GHL (the actual source of truth).

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (weekly reconciliation):** Admin VA
- **Consulted:** Dispo VA

## Trigger
- **Automatic:** a new deal is submitted via `/submit-deal`. `netlify/functions/dispo-buddy-submit.js` creates a Notion page in database `a3c0a38fd9294d758dedabab2548ff29` as part of the submission flow.
- **Manual:** weekly reconciliation sweep (every Monday) to catch any drift between GHL and Notion.

## Inputs required
- Notion login with access to the "DispoBuddy Deals" database
- GHL login (to reconcile against)
- Database ID: `a3c0a38fd9294d758dedabab2548ff29` (env var `NOTION_DB_ID`)
- Notion integration token (env var `NOTION_TOKEN`) — do not share, do not paste into any doc

## Tools & systems used
- Notion (database view)
- GHL (source of truth)

## Canonical Notion database schema

The deal database has these properties. Do not add, rename, or delete properties without updating this SOP and the `createNotionDeal` function in `netlify/functions/dispo-buddy-submit.js`.

| Notion property | Type | Source | Updated by |
|---|---|---|---|
| Name (title) | title | `{{deal_type}} — {{city}}, {{state}}` | intake function |
| Partner Name | rich text | form field `jv_partner_name` | intake function |
| Partner Phone | phone | form field `jv_phone_number` | intake function |
| Partner Email | email | form field `jv_partner_email` | intake function |
| Property Address | rich text | form field `property_address` | intake function |
| City | rich text | form field `property_city` | intake function |
| State | select | form field `property_state` | intake function |
| ZIP | rich text | form field `property_zip` | intake function |
| Deal Type | select | form field `deal_type` | intake function |
| Contract Price | number | form field `contracted_price` | intake function |
| Asking Price | number | form field `desired_asking_price` | intake function |
| ARV Estimate | number | form field `arv_estimate` | intake function |
| Assignment Fee | number | `asking - contract` | intake function |
| Stage | select | mirrors GHL pipeline stage | weekly reconciliation (until automated) |
| Status | select | New / Review / Needs Info / Accepted / Marketing / Closed Won / Declined / Dead | weekly reconciliation |
| GHL Contact ID | rich text | returned from GHL upsert | intake function |
| GHL Opportunity ID | rich text | returned from GHL opp create | intake function |
| Submitted At | date | automatic | intake function |
| Decision At | date | when moved out of "Under Review" | weekly reconciliation |
| Closed At | date | when moved to Closed Won / Dead | weekly reconciliation |
| Source | select | form field `how_heard_about_us` | intake function |
| First Deal? | checkbox | form field `is_this_your_first_deal_with_dispo_buddy` | intake function |
| Notes | rich text | free-form | manual |

## Step-by-step weekly reconciliation procedure

Every **Monday morning**, before the Monday cadence meeting (SOP 19). Budget: 30 minutes.

1. **Open both systems side-by-side:**
   - Tab 1: GHL → Opportunities → 3. JV Deals (kanban + list view)
   - Tab 2: Notion → DispoBuddy Deals database (filter: Stage ≠ "Closed Won" AND Stage ≠ "Dead")

2. **Walk every active deal in GHL** (top to bottom of the kanban):
   1. Find the matching row in Notion by GHL Opportunity ID (or by partner name + address if the ID is missing).
   2. Compare **Stage**. If different → update Notion to match GHL. Log the change in a note.
   3. Compare **Status**. If different → update Notion to match GHL.
   4. Compare **Contract Price / Asking Price / ARV** (partners sometimes amend). If different → update Notion.
   5. If the GHL opportunity has no matching Notion row → **create one manually** using the schema above and flag Brooke (the intake function should have created it).
   6. If a Notion row has no matching GHL opportunity → check archived GHL opps. If still nothing → tag as `orphan` and flag Brooke.

3. **Walk every newly-closed deal** (last 7 days):
   1. Set **Closed At** date.
   2. Set **Status** to Closed Won (or Dead).
   3. Confirm the assignment fee number in Notion matches the actual wire received (pull from the bank reconciliation — see [SOP 18](./18-financial-payout-reconciliation.md)).

4. **Generate the Monday report** (saved view in Notion):
   - Deals by Stage (count)
   - Deals by Source (count + closed $ last 30 days)
   - Deals by Deal Type (count + closed $ last 30 days)
   - Aging: deals in Review > 48h, deals in Marketing > 10 days
   - Closed Won last 7 days (count + sum of assignment fees)
   - Submit this as part of [SOP 19](./19-weekly-operations-cadence.md).

## Canonical Notion views (create once, save forever)

| View name | Filter | Sort | Used in |
|---|---|---|---|
| Active Pipeline | Status ≠ Closed Won AND ≠ Dead AND ≠ Declined | Submitted At desc | daily check |
| Under Review Aging | Status = Review | Submitted At asc | SLA watch |
| Marketing Aging | Status = Marketing | Last Activity asc | SLA watch |
| Closed Won (MTD) | Status = Closed Won AND Closed At = this month | Closed At desc | monthly close |
| By Source | group by Source | — | SOP 17 |
| By Deal Type | group by Deal Type | — | analytics |
| Orphans | no GHL Opportunity ID | Submitted At desc | reconciliation |

## Templates & scripts

**Reconciliation note format (paste into Notion page):**
```
[YYYY-MM-DD] Reconciled with GHL. Changes: [list]. No discrepancies remaining.
```

**Escalation to Brooke for an orphan:**
```
ORPHAN — Notion row "{{name}}" has no matching GHL opportunity. Submitted {{date}}. Partner: {{partner}}. Need you to decide: recreate in GHL, archive in Notion, or investigate as missing data.
```

## SLAs / quality standards
- **Reconciliation cadence:** every Monday before 10 AM local
- **Drift tolerance:** zero. A discrepancy found on Monday must be resolved the same day.
- **Closed deals:** Notion Closed Won number must match QuickBooks revenue line exactly by end of month (see [SOP 18](./18-financial-payout-reconciliation.md))

## Escalation / edge cases
- **Notion page failed to create** at intake time (check Netlify function logs for "Notion creation failed"). Resolution: run the manual intake SOP step in [SOP 01](./01-deal-intake-triage.md) → create the Notion page by hand using the schema above.
- **Schema drift** — someone added a new Notion property not in this SOP. Fix: remove the property OR add it to the table above, update `createNotionDeal` in the submit function, test, deploy. Never leave schema drift alive.
- **Automation conflict** — if GHL → Notion sync is ever set up (to eliminate manual reconciliation, per [B8](./00-bottlenecks.md#b8--ghl-and-notion-drift-apart-dual-source-of-truth-problem)), disable manual edits in Notion and update this SOP.

## Related SOPs
- [01 — Deal Intake & Triage](./01-deal-intake-triage.md)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md)
- [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md)
- [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md)

## Bottleneck this SOP addresses
[B8 — GHL and Notion drift apart](./00-bottlenecks.md#b8--ghl-and-notion-drift-apart-dual-source-of-truth-problem)

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 14 — Partner Communication

## Purpose
Our public promise is "no ghosting" and "24–48 hour review." Partners need to feel a human on the other end of every message. This SOP defines the tone, channels, SLAs, TCPA compliance, and ready-to-paste templates for every routine partner interaction.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible:** Dispo VA (day-to-day), Brooke (partner escalations)
- **Informed:** Admin VA (for billing/payout questions)

## Trigger
Any inbound partner message (SMS, email, form submission, phone call) OR any scheduled outbound partner touch.

## Inputs required
- GHL Conversations access
- Partner's contact record (so you know their tier, first-deal status, and any prior notes)
- Template library (below)

## Tools & systems used
- GHL → Conversations (primary)
- GHL → Email / SMS templates
- Personal phone (Brooke only, for VIPs)

## Response SLAs

| Channel | Business hours (Mon–Fri, 8a–6p local AZ) | After hours / weekends |
|---|---|---|
| SMS inbound | < 2 hours | first response by 9 AM next business day |
| Email inbound | < 24 hours | first response by 10 AM next business day |
| Phone voicemail | < 4 hours (SMS or callback) | first response by 10 AM next business day |
| Form submission | automated confirmation immediately; human follow-up within 24 hours |
| Decision on a submitted deal | within 48 hours from submission |

**If a response will be delayed**, send a holding message. **Do not go silent.** Ever.

## Tone & voice guide

DispoBuddy writes like a plain-spoken real estate pro who respects the partner's time. Copy the voice from the website:

- **Short sentences.** No fluff, no corporate speak, no emoji spam.
- **Confident, not cocky.** We know what we're doing and we say so, but we don't dunk on anyone.
- **Specific over vague.** "Spread is 12%, we'd need to see 18% for this market to move" beats "numbers are a little tight."
- **Honest.** Declines are honest. "This won't move because X" is always better than "we'll keep you posted."
- **Lowercase "dispo", "wholesaler", "buyer"** in conversational text. Proper nouns for brand names only.

Banned phrases:
- "Touching base" (we're not a 1998 sales training video)
- "Circle back"
- "Per my last email"
- "As discussed" without saying what was discussed
- Any apology longer than one sentence

## TCPA + consent rules

1. **Every form we accept contains an explicit consent checkbox.** See `submit-deal.html` and `join.html` — the consent language is:
   > "I agree to receive SMS and email communications from Dispo Buddy regarding my partner application and deal opportunities. Message & data rates may apply. Reply STOP to opt out."
2. **Never text a contact who didn't consent.** If a contact came from a referral or list, you must get consent on a recorded call or via a double opt-in link before the first SMS.
3. **STOP handling** — GHL handles this automatically at the platform level. If a contact texts STOP, they are flagged `do_not_contact` and removed from all automations. Do NOT text them again even if Brooke asks — route the request through Brooke and she'll re-consent them manually on a call.
4. **Quiet hours** — no outbound SMS before 8 AM or after 9 PM in the recipient's local time zone.
5. **Record every consent event** in the contact's activity log.
6. See [SOP 15](./15-compliance.md) for the full compliance picture.

## Canonical templates

All templates use merge tags. Paste into GHL templates library once, reuse forever.

### SMS — Deal received confirmation
*(automated by `dispo-buddy-submit.js`, do not duplicate manually)*
```
{{contact.first_name}}, we got your deal at {{custom_values.property_address}}. You'll hear from us in 24–48 hours with a yes, no, or what we need. — Dispo Buddy
```

### SMS — First-deal welcome
*(automated for `first_deal = yes`)*
```
Welcome to the Dispo Buddy network, {{contact.first_name}}! Since this is your first deal with us, here's what to expect:

1. We review your deal within 24–48 hrs
2. If accepted, we send a simple JV agreement
3. We handle packaging, marketing & buyer outreach
4. 50/50 split paid at close through title

Questions? Text us anytime.
```

### SMS — Needs info (missing photos)
```
{{contact.first_name}} — loving the spread on {{custom_values.property_address}} but we need photos before we can move on this. A quick phone-quality Drive or Dropbox link works. Can you send by EOD?
```

### SMS — Needs info (missing comps / ARV backup)
```
{{contact.first_name}} — good deal structure on {{custom_values.property_address}}, but we need your comp data to verify the ARV. Send 3 recent comps (sold in last 6 months) and we'll close out review today.
```

### SMS — Needs info (missing mortgage info for sub-to / SF)
```
{{contact.first_name}} — for {{custom_values.property_address}} we need the existing mortgage info to underwrite the sub-to. Need: balance, rate, monthly payment, lender. Can be approximate if you don't have the statement handy.
```

### SMS — Accepted, JV agreement incoming
```
{{contact.first_name}} — deal accepted. Spread works, fee is reasonable, we have buyers for this one. JV agreement is coming to your email from DocuSign in the next hour. Sign it and we start marketing immediately.
```

### SMS — Declined (honest reason template)
```
{{contact.first_name}} — tough call, but we're going to pass on {{custom_values.property_address}}. Reason: {{decline_reason}}. If {{what_would_change_it}} we'd take another look. Keep the deals coming.
```

### SMS — Deal gone to marketing
```
{{contact.first_name}} — just pushed {{custom_values.property_address}} out to matched buyers in our network. You'll hear from me when offers come in. ETA first offer: 48–72 hrs.
```

### SMS — Offer received, need partner review
```
{{contact.first_name}} — got an offer on {{custom_values.property_address}}. {{buyer_type}} buyer at ${{offer_amount}}, {{close_terms}}. My take: {{recommendation}}. Can you get back to me by {{deadline}}?
```

### SMS — Going to close / title opened
```
{{contact.first_name}} — {{custom_values.property_address}} is opening at {{title_company}} today. COE {{coe_date}}. You'll get updates from title directly plus a ping from me at each milestone.
```

### SMS — Payout notification
```
{{contact.first_name}} — {{custom_values.property_address}} closed! 🎉 Your 50/50 share is ${{payout_amount}}. Title is wiring today. You should see it in 1–3 business days. Next deal?
```

### Email — Partner confirmation (longer form, first deal)
Subject: `Deal Received — Dispo Buddy`
```
Hi {{contact.first_name}},

We just received your deal at {{custom_values.property_address}}.

Here's what happens next:

1. **Review (24–48 hrs)** — Our underwriting team looks at comps, spread, and marketability.
2. **Decision** — You'll get a yes, a no, or a "we need X to move forward" — never silence.
3. **If yes** — We send a simple, non-exclusive JV agreement via DocuSign. You sign, we start marketing.
4. **Marketing** — We package the deal and push it to matched buyers in our network.
5. **Close** — 50/50 split through title at close. No invoicing, no chasing.

In the meantime, if anything changes on the deal (price, timing, seller) just reply to this email or text {{internal_alert_phone}}.

— The Dispo Buddy team
```

### Email — Decline with feedback (longer form)
Subject: `{{custom_values.property_address}} — a pass (and why)`
```
{{contact.first_name}},

Thanks for sending {{custom_values.property_address}} over. We looked at it seriously but we're going to pass. Here's why:

{{decline_reason_paragraph}}

What would make us look at this again:
- {{change_1}}
- {{change_2}}
- {{change_3}}

This is not a "we're too busy" pass — we genuinely underwrote it. If you can adjust the numbers or the structure, send it back anytime.

And keep the deals coming — one pass doesn't mean anything about the next one.

— Dispo Buddy
```

### Email — JV agreement intro
Subject: `JV Agreement — {{custom_values.property_address}}`
```
{{contact.first_name}},

Deal accepted. JV agreement is attached (or incoming from DocuSign). The terms:

- **Split:** 50/50 of net assignment fee at close
- **Non-exclusive:** you can still market the deal yourself
- **Term:** 90 days from signature (auto-terminates if not closed)
- **Fee:** Actual assignment fee, minus title / escrow costs, split 50/50 at close through title

Sign when you get a chance. As soon as it's signed, we start buyer outreach.

— Brooke
```

## Step-by-step inbound triage procedure

For every new inbound message the Dispo VA sees:

1. **Open the conversation in GHL.** Read the whole thread, not just the latest message.
2. **Classify the message:**
   - Deal question → route based on deal's current stage, use templates above
   - Payment question → route to Admin VA ([SOP 18](./18-financial-payout-reconciliation.md))
   - New deal idea (not yet submitted) → send `/submit-deal` link + offer help
   - Complaint / grievance → **escalate to Brooke immediately**
   - Off-topic / spam → mark as read, do not reply
3. **Pull the contact record** to check role tag, VIP status, and recent deal history. Adjust tone accordingly.
4. **Compose reply** using the closest template. Edit merge tags if GHL didn't fill them.
5. **Send and log** — GHL auto-logs the send. Add an internal note if the message required judgment.
6. **If you cannot answer with 95% confidence** → respond with a holding message and tag Brooke:
   ```
   {{contact.first_name}} — pulling Brooke in on this one so you get the right answer. She'll respond within {{N}} hours.
   ```

## SLAs / quality standards
- **First response times** above
- **Holding messages** — any delay > SLA gets a holding message, never silence
- **Tone match** — no slang, no emoji, no fluff, no banned phrases
- **Template compliance** — if a template exists for the situation, use it (you may edit for context, but don't invent a new voice)
- **Internal notes** — every judgment call gets a note

## Escalation / edge cases
- **Partner complains** (about payout, timing, communication, agreement terms) → Brooke, same day, always
- **Legal threat or attorney letter** → Brooke AND [SOP 15 — Compliance](./15-compliance.md) immediately. Do not reply yourself.
- **Angry partner at 11 PM** — reply with a calming holding message; do not try to resolve at 11 PM; ping Brooke first thing next morning
- **Partner asks for exclusivity** → remind them we're non-exclusive by design (see process page); if they push, route to Brooke
- **Partner asks to renegotiate the 50/50 split** → Brooke only. Never commit to different terms on behalf of her.

## Related SOPs
- [01 — Deal Intake & Triage](./01-deal-intake-triage.md)
- [08 — Partner Onboarding](./08-partner-onboarding.md)
- [11 — Dead Deal / Rejection](./11-dead-deal-rejection.md)
- [15 — Compliance](./15-compliance.md)

## Bottleneck this SOP addresses
[B4 — Partner onboarding has no education layer](./00-bottlenecks.md#b4--partner-onboarding-has-no-education-layer) and [B10 — Founder single-point-of-failure](./00-bottlenecks.md#b10--founder-single-point-of-failure) (the template library is how a VA replaces Brooke for routine messages)

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 15 — Compliance

## Purpose
DispoBuddy operates at the intersection of real estate wholesaling, creative finance, and SMS/email marketing — three areas that carry real legal exposure. This SOP names the compliance perimeters we operate inside, how we prove compliance if asked, and what to do when we hit a grey area. **When in doubt: stop and escalate to Brooke.** Nothing in this SOP is legal advice; it's DispoBuddy's operating policy.

## Owner / Roles
- **Accountable:** Brooke (founder, principal broker equivalent for DispoBuddy's activities)
- **Responsible (recordkeeping):** Admin VA
- **Consulted:** outside counsel (as retained)
- **Informed:** Dispo VA (must know the rules, even if they don't own them)

## Trigger
Always on. This SOP is reviewed quarterly (first Monday of Jan / Apr / Jul / Oct).

## Inputs required
- Current list of states where DispoBuddy accepts deals (see [SOP 07](./07-closing-title-coordination.md))
- Executed JV agreements archive
- TCPA consent records in GHL
- Retained counsel contact info (in the secure vault)

## Tools & systems used
- GHL (consent + STOP records)
- Google Drive → `/DispoBuddy/Compliance/` folder (JV agreements, HUDs, counsel correspondence)
- Password vault (emergency access for compliance docs)
- Secretary of State filings for Deal Pros LLC

## Compliance areas

### 1. TCPA / SMS consent
**Rule:** We do not text anyone who has not given express written consent. Consent is captured via the checkbox on `submit-deal.html`, `join.html`, and `contact.html`.

**How to prove it:**
1. Every form submission records consent in the contact's GHL activity log with a timestamp and the consent language shown at the time of submit.
2. The consent checkbox language is version-controlled in git (see the HTML pages). Any change to the language is committed and PR'd.
3. Manual consent (from a phone call) must be logged as a GHL note: `CONSENT — spoken, {{date}}, {{method}}, language: "I agreed to receive SMS and email from Dispo Buddy for deal opportunities"`.

**STOP handling:**
1. GHL automatically flags a contact who replies STOP.
2. Verify the `do_not_contact` tag is on their record within 24 hours.
3. Never, ever, send another message to them — not even a "goodbye" — unless Brooke personally re-obtains consent on a call.

**Quiet hours:** 8 AM – 9 PM recipient's local time. No exceptions.

**Audit cadence:** monthly, Admin VA spot-checks 10 random contacts to confirm consent is logged.

### 2. State-specific wholesaling rules

Real estate wholesaling is regulated differently in every state. DispoBuddy accepts deals nationwide, but the regulations below are high-risk and must be surfaced to Brooke before underwriting.

| State | Rule | What we do |
|---|---|---|
| **Illinois** | Licensed "real estate wholesaler" registration required; cap on # of unlicensed assignments per year | Route every IL deal to Brooke before review |
| **Oklahoma** | License required to market property you don't own | Brooke review + disclosure on deal sheet |
| **Pennsylvania** | "Business of dealing in real estate" triggers licensing | Brooke review |
| **Virginia** | Licensing implications for marketing equitable interest | Brooke review |
| **Maryland** | Assignment + marketing restrictions | Brooke review |
| **Kansas** | Registration rules | Brooke review |
| **Texas, Arizona, Florida, Kentucky, Tennessee, Georgia, Ohio, Indiana** | Active markets; wholesaling generally permitted with proper disclosures | Standard underwriting per [SOP 02](./02-deal-underwriting.md) |

**General discipline everywhere:**
- We are selling our **equitable interest** in the contract, not the property itself. Our marketing language (deal sheets, SMS blasts) must reflect this: "equitable interest," "rights under contract," "assignment opportunity."
- We disclose our position to the end buyer in the assignment agreement.
- We disclose our intent to assign to the seller in the original purchase contract (or via a rider).

**New state intake:** before we run the first deal in a new state, Brooke runs a state-specific compliance check with counsel and logs the result in `/Drive/DispoBuddy/Compliance/state-rules.md`.

### 3. Unauthorized practice of law

**Rule:** We do not give legal advice. We do not draft contracts for partners. We do not explain what a contract "means" to a seller.

**What we CAN say:**
- "Here's the template we use" (for partner convenience)
- "You should have your attorney review this"
- "Here's what we've seen work in similar deals — not legal advice"

**What we CANNOT say:**
- "This contract is fine, you don't need a lawyer"
- "That clause means X and you're legally obligated to Y"
- "Don't worry, we've done hundreds of these" (implies legal sufficiency)

**If a partner asks a legal question**: redirect to their attorney. If they don't have one, offer to refer them to a real estate attorney Brooke knows — but the referral is just a name, not an endorsement.

### 4. Earnest money handling

**Rule:** We do not hold earnest money. Ever. All EMD goes to a licensed title company or escrow agent.

**Procedure:**
1. When a buyer goes under contract, the assignment agreement directs EMD to the title company named in the contract.
2. EMD is never deposited into DispoBuddy's or Deal Pros LLC's accounts.
3. EMD receipts are filed in the deal's Drive folder within 24 hours of receipt.
4. If a partner asks us to hold EMD → **absolute no**, refer to this SOP.

### 5. JV agreement retention

**Rule:** Every fully-executed JV agreement is retained for 7 years in Google Drive.

**Filing structure:**
```
/DispoBuddy/JV Agreements/
  └── YYYY/
       └── YYYY-MM-DD — [Partner Name] — [Property Address].pdf
```

**Procedure:**
1. DocuSign fires a webhook on full execution; the PDF is archived to Drive automatically. If the automation fails, Admin VA downloads the executed PDF from DocuSign within 1 business day.
2. Executed PDF is also attached to the GHL contact record as a file.
3. Executed PDF is attached to the Notion deal row as a file.

### 6. Anti-fraud / truthful marketing

**Rule:** Every number on every deal sheet must be defensible.

**Procedure:**
1. ARV on the deal sheet = the ARV underwritten in [SOP 02](./02-deal-underwriting.md). If we can't back it with 3 comps, we lower it or remove it.
2. Repair estimates come from the partner or an independent contractor, never made up.
3. "Spread" is calculated from the contract price to the buyer, not from the seller's price.
4. We never represent a property as "under contract" when it isn't.
5. Photos come from the partner or our own site visit. We do not use stock photos or Zillow photos on deal sheets.

### 7. Entity + banking

**Rule:** DispoBuddy is a trade name of Deal Pros LLC. All contracts, wires, and receipts flow through Deal Pros LLC's bank account.

**Procedure:**
1. JV agreements name **Deal Pros LLC dba Dispo Buddy** as the counterparty.
2. Wire instructions sent to title name Deal Pros LLC.
3. EIN, articles of organization, and operating agreement live in `/Drive/DispoBuddy/Entity/`.
4. Annual state filing reminders go on Brooke's calendar on Jan 2 every year.

### 8. Insurance

**Rule:** DispoBuddy maintains (or Brooke personally maintains) appropriate business liability + E&O coverage.

**Procedure:**
1. Review policy annually (January).
2. Update coverage when deal volume or state footprint materially changes.
3. Proof of insurance stored in `/Drive/DispoBuddy/Insurance/`.

### 9. Affiliate program compliance

**FTC disclosure:** Affiliates who promote Dispo Buddy publicly (social media, blogs, YouTube, email) must disclose their financial relationship. Our affiliate terms (`affiliate-terms.html`) require this. If we discover an affiliate promoting without disclosure:
1. First violation: send a warning SMS + email with the FTC disclosure requirement
2. Second violation: pause the affiliate (`affiliate_status` → `paused`)
3. Third violation: terminate

**Prohibited affiliate activities** (from the terms):
- Spam, unsolicited messaging, bulk SMS/email to purchased lists
- Misleading claims about earnings, guarantees, or our services
- Bidding on "Dispo Buddy" brand terms in paid search
- Cookie stuffing, click fraud, or deceptive tracking
- Impersonating Dispo Buddy or Deal Pros LLC

**Self-referral detection:** An affiliate cannot refer themselves or their own business entities. If the affiliate's email matches a referred partner's email, or the same phone number appears on both records → flag for Brooke and withhold the commission pending investigation.

**Affiliate consent:** The signup form at `/affiliates` includes a consent checkbox and a link to the full terms. This is version-controlled in git.

**Quarterly audit addition:** Add to the quarterly compliance review: pull 5 random affiliate payouts, verify the commission math matches the deal values, verify the 12-month trailing window was enforced, verify no self-referrals.

## Step-by-step compliance review procedure

**Quarterly compliance review** (first Monday of Jan / Apr / Jul / Oct), run by Brooke:

1. **State list audit** — review the list of states where we took deals last quarter. Any new state? Run a fresh compliance check.
2. **Consent spot-check** — pull 20 random contacts from last quarter. Confirm each has a logged consent event with timestamp.
3. **STOP audit** — pull every STOP event from last quarter. Confirm `do_not_contact` tag is applied and no subsequent outbound.
4. **JV agreement audit** — pull 5 random closed deals. Confirm executed JV agreement is in Drive, GHL, and Notion.
5. **Deal sheet audit** — pull 5 random deal sheets. Verify ARV is backed by 3 comps, repair estimate source is documented, no stock photos.
6. **Counsel touchpoint** — quarterly 30-min check-in with retained counsel (if engaged). Topics: new state activity, new regulations, open matters.
7. **Document the review** — write a short memo to `/Drive/DispoBuddy/Compliance/Quarterly Reviews/YYYY-Q.md`.

## Templates & scripts

**Partner asks a legal question:**
```
{{contact.first_name}} — that's a question for your real estate attorney, not us. We can share our standard process but we can't advise on your specific legal situation. If you don't have an attorney, text me back and I can share a couple of names of attorneys we've seen partners use in your state.
```

**Seller asks if this is a scam:**
```
Completely fair question. Dispo Buddy is a joint venture partner — we help wholesalers and investors sell their contracts to qualified buyers. We're a brand of Deal Pros LLC, and you're welcome to verify the entity at the [your state] Secretary of State site. The deal still closes through the title company you pick; we don't touch your earnest money directly.
```

**Legal threat or attorney letter received:**
```
[Do not reply to the sender.]
[Immediately:]
1. Forward to Brooke
2. Forward to retained counsel
3. Save a copy in /Drive/DispoBuddy/Compliance/Legal Matters/
4. Note the incoming channel, timestamp, and sender
5. Do not discuss with the partner, buyer, or any third party until counsel responds
```

## SLAs / quality standards
- **Consent logging** — 100% of marketing-channel contacts have a logged consent
- **STOP compliance** — 100% of STOP events flagged within 24 hours; 0% subsequent outbound
- **JV agreement retention** — 100% of executed agreements in Drive + GHL + Notion within 1 business day of execution
- **State compliance** — zero new states entered without a pre-entry check

## Escalation / edge cases
- **Any attorney letter or legal threat** → Brooke + counsel, same day, no reply
- **Seller complaint** (e.g., "I didn't know you were going to assign this") → Brooke, same day
- **Buyer complaint about misrepresentation** → Brooke, same day, deal sheet audit
- **A VA is asked to provide legal advice** → refuse, escalate
- **A deal in an ambiguous state** → Brooke reviews before underwriting
- **A partner asks to be paid outside the title company** → absolute no, escalate to Brooke

## Related SOPs
- [03 — JV Agreement](./03-jv-agreement.md)
- [07 — Closing & Title Coordination](./07-closing-title-coordination.md)
- [14 — Partner Communication](./14-partner-communication.md)
- [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md)

## Bottleneck this SOP addresses
Foundational — compliance isn't on the bottleneck list directly, but a compliance failure halts every other bottleneck solution.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 16 — Website & Functions Deploy

## Purpose
dispobuddy.com is the front door to the business. If the site breaks, we lose submissions; if a Netlify function breaks, the entire deal-intake pipeline silently fails. This SOP defines how changes are made, tested, deployed, and smoke-tested — so we never ship a regression that costs us deals.

## Owner / Roles
- **Accountable:** Brooke (technical approval + deploys)
- **Responsible:** Brooke (all code changes go through her today; a future dev contractor can be added to the RACI)
- **Consulted:** Dispo VA (for copy changes and content review)

## Trigger
- A bug on the live site or in a Netlify function
- A request for new functionality (new field, new form, new page)
- A copy/content update
- A compliance-required change (e.g., consent language update)
- An env var rotation

## Inputs required
- GitHub repo access: `brooke-wq/dispobuddy-site`
- Netlify dashboard access
- GHL API credentials (stored in env vars, never in code)
- Notion integration token (stored in env var)
- A local development environment (git + a text editor)

## Tools & systems used
- GitHub — `brooke-wq/dispobuddy-site` (source of truth)
- Netlify — hosting, deploy previews, env vars, function logs
- Local editor — VS Code or similar
- Terminal — git + Netlify CLI (optional but recommended)
- Browser — smoke-testing the deployed site

## Repo layout

```
dispobuddy-site/
├── *.html                          # Static pages (index, process, submit-deal, etc.)
├── logo-*.svg                      # Brand assets
├── robots.txt
├── netlify.toml                    # Netlify build config
├── netlify/
│   └── functions/
│       ├── dispo-buddy-submit.js   # /submit-deal form handler
│       ├── partner-onboard.js      # /join and /contact form handler
│       ├── buyer-demand.js         # /buyers-map data source
│       └── sitemap.js              # generated sitemap
└── sops/                           # These SOPs (this folder)
```

## Required Netlify environment variables

**Never commit these to git. Always set in Netlify dashboard → Site settings → Environment variables.**

| Variable | Purpose | Where it's used |
|---|---|---|
| `GHL_API_KEY` | GHL private integration API key | all 3 functions |
| `GHL_LOCATION_ID` | GHL sub-account / location ID | all 3 functions |
| `NOTION_TOKEN` | Notion integration token | `dispo-buddy-submit.js` |
| `NOTION_DB_ID` | Notion deal database ID (`a3c0a38fd9294d758dedabab2548ff29`) | `dispo-buddy-submit.js` |
| `INTERNAL_ALERT_PHONE` | Brooke's phone for internal SMS alerts | submit + onboard |
| `INTERNAL_ALERT_EMAIL` | Brooke's email for internal alerts | submit + onboard |

Confirm all six are set in every environment (production, deploy previews).

## Branch strategy

- `main` — production. Auto-deploys to dispobuddy.com on every merge.
- `claude/*` — feature branches Claude Code creates for automated tasks.
- `brooke/*` — feature branches Brooke creates for manual changes.
- All changes go through a pull request. **Never push directly to `main`** unless fixing a critical production bug and Brooke explicitly approves.

## Step-by-step deploy procedure

### Step 1 — Plan the change (5 min)
1. Write a one-sentence description of what's changing and why.
2. Identify which files will be touched.
3. Identify any env var changes needed.
4. Identify any GHL/Notion schema changes needed.

### Step 2 — Create a branch
```bash
git checkout main
git pull origin main
git checkout -b brooke/<short-description>
```

### Step 3 — Make the change
1. Edit files in your local editor.
2. For HTML changes, preview in the browser by opening the file directly.
3. For Netlify function changes, test locally with `netlify dev` (requires Netlify CLI). This proxies the functions through a local dev server so you can hit them with Postman or curl.
4. **Never hardcode credentials.** Read from `process.env.*` exactly like the existing functions do.

### Step 4 — Test locally (HTML changes)
1. Open the modified HTML file in your browser.
2. Click through the interaction paths.
3. Validate responsive behavior (resize the window).
4. Check the browser console for JavaScript errors.

### Step 5 — Test locally (function changes)
1. Start `netlify dev`.
2. Post a test payload to the function:
   ```bash
   curl -X POST http://localhost:8888/.netlify/functions/dispo-buddy-submit \
     -H "Content-Type: application/json" \
     -d '{"jv_partner_name":"Test","jv_phone_number":"5555555555","property_address":"123 Test","deal_type":"Cash"}'
   ```
3. Check the response status and body.
4. Check GHL manually to confirm the contact/opportunity was created (use a throwaway contact, not a real one).
5. Check Netlify function logs in the terminal for any warnings.

### Step 6 — Commit and push
```bash
git add -A
git commit -m "Short imperative description of the change"
git push -u origin brooke/<short-description>
```

### Step 7 — Open a PR
1. Go to `github.com/brooke-wq/dispobuddy-site`.
2. Open a pull request from your branch to `main`.
3. Description: what changed, why, what to test.
4. Wait for the Netlify deploy preview to build.

### Step 8 — Test the deploy preview
The preview URL looks like `https://deploy-preview-<N>--dispobuddy.netlify.app`.

1. Hit every page you changed.
2. Submit a test form submission on the preview. **Use a throwaway email and phone** — the submission still fires real GHL and Notion writes because deploy previews share env vars with prod. Clean up the test contact after.
3. Check browser console for errors.
4. Check Netlify function logs in the deploy preview (Netlify → Site → Deploys → Preview → Functions).

### Step 9 — Merge and deploy to prod
1. Once the deploy preview checks out, merge the PR.
2. Netlify auto-deploys `main` to dispobuddy.com within 2–5 minutes.
3. Watch the build log for any errors.

### Step 10 — Smoke test prod (critical — never skip)
Hit every form and verify end-to-end:

| Test | Steps | Expected |
|---|---|---|
| Deal submission | Submit a full deal with a test email/phone on `/submit-deal` | 200 response, confirmation SMS received, GHL contact + opportunity created, Notion row created, internal alert fired to Brooke |
| Partner onboarding | Submit `/join` form with test info | 200 response, welcome SMS received, GHL contact created, internal alert to Brooke |
| Contact form | Submit `/contact` form with test info | 200 response, GHL message, internal alert to Brooke |
| Buyers map | Load `/buyers-map` | Map loads with live data, function returns a 200, data looks sensible |
| FAQ, Process, What We Look For, Proof, Home | Click-through | No 404s, no broken images, no console errors |

**If any test fails:** immediately revert the merge (`git revert <commit>` on main, force-push to main with Brooke's explicit OK) or roll back via Netlify (Netlify → Deploys → previous deploy → Publish deploy).

### Step 11 — Clean up
1. Delete the test contact from GHL.
2. Delete the test Notion row.
3. Delete the feature branch locally and on GitHub.
4. Update any related SOPs if the change affected a documented process.
5. Update the changelog in any SOP that references the changed code.

## Emergency hotfix procedure

If the production site is broken (forms failing, 500 errors, down):

1. **Revert first, diagnose later.** In Netlify → Deploys, click the last-known-good deploy and "Publish deploy." That takes < 30 seconds.
2. **Then** investigate and fix on a branch.
3. Never edit live files directly in the Netlify dashboard — always go through git.
4. After the fix is deployed, write a 3-paragraph post-mortem in `/sops/Incidents/YYYY-MM-DD-description.md`: what broke, what we did, what we'll do differently.

## Templates & scripts

### Test curl for the submit function
```bash
curl -X POST https://dispobuddy.com/.netlify/functions/dispo-buddy-submit \
  -H "Content-Type: application/json" \
  -d '{
    "jv_partner_name": "Test Partner",
    "jv_phone_number": "5555551234",
    "jv_partner_email": "test@example.com",
    "property_address": "123 Test St",
    "property_city": "Phoenix",
    "property_state": "AZ",
    "property_zip": "85001",
    "deal_type": "Cash",
    "contracted_price": "150000",
    "desired_asking_price": "165000",
    "arv_estimate": "210000",
    "is_this_your_first_deal_with_dispo_buddy": "No",
    "under_contract": "Yes"
  }'
```

### Revert a merged PR
```bash
git checkout main
git pull origin main
git revert <commit-hash>
git push origin main
```

### Set/update an env var in Netlify
1. Netlify dashboard → Site settings → Environment variables
2. Add / edit / delete
3. **Redeploy** to pick up the new value (env vars are only read at build/runtime start)

## SLAs / quality standards
- **Every change in a branch + PR** (zero direct pushes to main)
- **Every change smoke-tested on the deploy preview**
- **Every prod deploy smoke-tested** within 10 minutes of deploy
- **Hotfix revert within 5 minutes** of a broken deploy being noticed
- **Post-mortem within 24 hours** of any production incident

## Escalation / edge cases
- **Env var rotation** (GHL rotates the key, we update it) — set the new value in Netlify, trigger a redeploy, smoke-test, document the rotation date
- **New env var added** — update this SOP's "Required Netlify environment variables" table, update the function code to read it, update `.env.example` if we ever add one
- **Schema change to GHL pipeline / stages / tags** — update [SOP 12](./12-ghl-crm-hygiene.md), then update the function code if stage IDs are hardcoded, then deploy
- **Netlify outage** — we can't do much; check status.netlify.com; partners will get errors on form submit; drop a Twitter/LinkedIn update if it's prolonged
- **GHL outage** — function calls will fail at the GHL step. The Netlify function still returns 500. Monitor GHL status. Consider temporarily buffering submissions to a queue if outages get common.

## Related SOPs
- [01 — Deal Intake & Triage](./01-deal-intake-triage.md) (downstream consumer)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (schema ownership)
- [13 — Notion Deal Tracker](./13-notion-deal-tracker.md) (schema ownership)
- [15 — Compliance](./15-compliance.md) (consent language changes)

## Bottleneck this SOP addresses
[B5 — Incomplete deal submissions](./00-bottlenecks.md#b5--incomplete-deal-submissions-force-back-and-forth) — the submit form hardening lives in this deploy flow.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 17 — Marketing & Lead Generation

## Purpose
Every partner and every buyer comes from somewhere — and today we don't know where. This SOP defines the marketing channels we use, the UTM taxonomy that makes attribution possible, the content cadence, and the monthly source-attribution report that tells us where to double down and where to cut.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (content creation):** Brooke
- **Responsible (publishing + tracking):** Dispo VA
- **Consulted:** Admin VA (for report cross-check against revenue)

## Trigger
- **Daily** — content posting per the cadence
- **Weekly** — channel-level performance check (part of [SOP 19](./19-weekly-operations-cadence.md))
- **Monthly** — full source-attribution report

## Inputs required
- GHL data on `source` field for each new contact
- Notion deal data with Source property
- Channel-level metrics (Google Analytics, YouTube analytics, podcast downloads, Facebook group engagement)

## Tools & systems used
- GHL (source tagging, contact creation reporting)
- Notion (deal data with source)
- Google Analytics (dispobuddy.com traffic + UTM breakdown)
- Canva (graphics + short-form content)
- Loom / screen capture (video)
- YouTube / Facebook / LinkedIn / podcast hosts
- Buffer or Later (content scheduling, optional)

## Active channels

| Channel | What we publish | Frequency | Primary audience |
|---|---|---|---|
| YouTube | 5-10 min case study videos on deals we moved | weekly | Wholesalers considering JV dispo |
| Facebook groups (wholesaler / dispo) | Short wins + "here's what moved this week" posts | 2x/week | Active wholesalers |
| LinkedIn (Brooke's profile) | Thought leadership, deal breakdowns | 2x/week | Agents, investors |
| Referral program | Word of mouth with formal incentives | always-on | All |
| Paid Google (optional) | "real estate wholesaler dispo partner" intent searches | paused until B9 lands | Wholesalers in buying mode |
| Podcast guest appearances | Guest on investor / wholesaler shows | ad-hoc | Broad |
| Email newsletter | Monthly market update + featured deals | monthly | Warm partners + buyers |
| **Affiliate program** | Affiliates share referral links (`?ref=`) to their audiences | always-on | Wholesalers, agents, investors (through affiliates' networks) |

The affiliate program is a distinct growth channel. Affiliates sign up at `/affiliates`, get a unique `?ref=` link, and earn $200 on first closed deal + 5% trailing for 12 months. Tracking is handled by `affiliate.js` (client-side) and `affiliate-track.js` (server-side). See [SOP 20](./20-affiliate-program.md) for full management details.

**Affiliate-sourced leads show up in the source report as:**
- `utm_source=affiliate_[affiliate_id]` (if the affiliate used our UTM-tagged link)
- OR `referred_by_affiliate` custom field on the contact (always set when `?ref=` is present)

## UTM taxonomy

Every outbound link to dispobuddy.com carries a UTM. Without this, SOP 19 can't report anything.

**Format:** `?utm_source=<source>&utm_medium=<medium>&utm_campaign=<campaign>&utm_content=<content>`

| Parameter | Value | Examples |
|---|---|---|
| `utm_source` | The specific channel | `youtube`, `fb_group_wholesalerpros`, `linkedin_brooke`, `podcast_realestatepod`, `referral_partner_[name]`, `email_newsletter` |
| `utm_medium` | The medium type | `video`, `social`, `email`, `referral`, `cpc`, `organic` |
| `utm_campaign` | The specific initiative | `march_newsletter`, `q2_partner_push`, `youtube_casestudy_series` |
| `utm_content` | The specific piece | `deal_case_study_phoenix`, `dispo_guide_pdf`, `homepage` |

**Example:** a YouTube video description link → `https://dispobuddy.com/submit-deal?utm_source=youtube&utm_medium=video&utm_campaign=casestudy_series&utm_content=phoenix_subto_march`

**Rule:** **No link goes live without a UTM.** Period. If you don't have time to build the UTM, you don't have time to post.

## UTM capture on the forms

The submit and join forms already capture the `hearAboutUs` freeform field. To make UTMs actionable:

1. Site JS reads `utm_*` from the query string on page load.
2. Stores in `sessionStorage`.
3. On form submit, populates hidden form fields named `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
4. `dispo-buddy-submit.js` and `partner-onboard.js` push those values into GHL custom fields on the contact.
5. See [SOP 16](./16-website-functions-deploy.md) for the deploy path if this isn't wired up yet — it's part of the B9 fix.

## Content cadence — weekly template

| Day | Channel | Task |
|---|---|---|
| Mon | LinkedIn | 1 thought-leadership post (200-400 words) |
| Mon | Facebook group | 1 "deal of the week" short post |
| Tue | YouTube | Upload the week's case-study video (pre-recorded) |
| Wed | LinkedIn | 1 short win post (photo + caption) |
| Wed | Facebook group | Answer 3 questions in active wholesaler threads (not our own threads) |
| Thu | Email | Monthly newsletter (once per month, first Thursday) |
| Fri | (all) | Engage with replies from the week |

**Content backlog:** maintain a minimum of 4 videos and 8 posts in the queue at all times. If the backlog runs dry, pause other work and refill it.

## Referral program

For every closed deal a partner or buyer refers to us, the referrer gets:

- **Partner referral (they send us a wholesaler who closes):** $500 referral bonus at close of the referred partner's first deal with us
- **Buyer referral (they send us a buyer who closes):** $250 referral bonus at close of the referred buyer's first deal with us
- **Tagged in GHL:** `referrer` on their contact record; `referred_by_[name]` on the new contact

**How it works:**
1. When we onboard a new contact, ask: "How'd you hear about us?"
2. If they say a name → pull up the referrer's GHL contact, add `referred_by_[referrer_name]` to the new contact
3. When the new contact closes their first deal, trigger the referral payout per [SOP 18](./18-financial-payout-reconciliation.md)
4. Send a personal thank-you SMS to the referrer

**Formal referral link** (for the referrer to share): `https://dispobuddy.com/join?utm_source=referral_[their_name]&utm_medium=referral&utm_campaign=always_on`

## Monthly source-attribution report

Run on the **first Monday** of every month for the prior month. Part of [SOP 19](./19-weekly-operations-cadence.md).

### Step 1 — Pull the data
1. Export GHL contacts created in the prior month with columns: created date, source tag, utm_source, utm_medium, utm_campaign.
2. Export Notion deals created in the prior month with columns: created date, status, source, assignment fee.

### Step 2 — Build the table
For each unique `utm_source` (or `source` tag if no UTM):

| Source | New contacts | Deal submissions | Accepted | Closed Won | GCI from Closed | Cost (paid channels only) | ROI |
|---|---|---|---|---|---|---|---|
| youtube | N | N | N | N | $X | $0 | ∞ |
| fb_group_* | N | N | N | N | $X | $0 | ∞ |
| linkedin_brooke | N | N | N | N | $X | $0 | ∞ |
| referral_* | N | N | N | N | $X | $0 | ∞ |
| paid_google | N | N | N | N | $X | $Y | (GCI-Y)/Y |
| email_newsletter | N | N | N | N | $X | $0 | ∞ |
| unknown | N | N | N | N | $X | — | — |

### Step 3 — Interpret
- Sort descending by **Closed Won GCI**.
- Top 3 sources → **double down.** More volume, more budget.
- Bottom 3 sources → **consider cutting** if they haven't closed a deal in 90 days.
- Any source with high "new contacts" but zero closings → quality problem (wrong audience).
- Any source with low "new contacts" but decent closings → scale problem (audience is tight but qualified).

### Step 4 — Publish
Save the table to `/Drive/DispoBuddy/Marketing/Monthly Reports/YYYY-MM.md`. Share in the Monday cadence. Decide channel actions for the coming month.

## Templates & scripts

### Monthly newsletter (first Thursday)
Subject line pattern: `DispoBuddy Monthly — [X] deals closed, [Y] buyers looking in [markets]`

Body structure:
1. **Opener** (2-3 sentences, market update)
2. **Closed this month** (2-3 deals with one-sentence highlights)
3. **What our buyers want right now** (3-4 bullets by market)
4. **A tip from the trenches** (1 actionable tip partners can use this week)
5. **CTA:** "Got a deal? Submit it here: [link with UTM]"

### Case study video outline
1. **Hook** (10 sec) — "We moved a sub-to deal in Tempe last week. Here's how."
2. **Partner backstory** (30 sec) — who sent it, how they sourced it
3. **Numbers** (60 sec) — contract, asking, ARV, spread, buyer profile
4. **The match** (60 sec) — how we found the buyer, how fast offers came
5. **Close** (60 sec) — the title process, any hiccups, the wire
6. **Lesson** (30 sec) — 1 thing partners watching should take away
7. **CTA** (10 sec) — "Got a deal? Hit dispobuddy.com. Link in description."

### Referrer thank-you SMS
```
{{referrer_first_name}} — quick heads-up: {{new_contact_name}} you sent us just closed their first deal. Your referral bonus ($500 or $250) is going out with next week's wire. Thanks for the intro. Send me more.
```

### UTM pre-flight checklist (before posting anything)
- [ ] Does the link include `utm_source`?
- [ ] Does the link include `utm_medium`?
- [ ] Does the link include `utm_campaign`?
- [ ] Does the link include `utm_content`?
- [ ] Does the link open correctly when clicked?
- [ ] Does it land on the right page (submit-deal / join / home)?

## SLAs / quality standards
- **100% of outbound links UTM-tagged** — no exceptions
- **Weekly content cadence** hit every week — if a week is missed, double up the following week
- **Monthly report published** by the first Monday of every month
- **Newsletter sent** on the first Thursday of every month, every month
- **Referral bonuses paid** with the closing wire for the referred deal, not later

## Escalation / edge cases
- **Paid channel ROI goes negative** for 2 consecutive months → pause, re-evaluate, consult Brooke
- **A viral moment** on one channel (video blows up, group post trends) → shift extra effort there for 2 weeks; don't force the normal cadence on top
- **Spam complaint on the newsletter** → audit the list; confirm everyone opted in via [SOP 15](./15-compliance.md); remove anyone not double-verified
- **Partner wants to stop being featured** in content — immediate respect; pull the content; no debate
- **Compliance asks to remove a piece of content** — do it within 24 hours (see [SOP 15](./15-compliance.md))

## Related SOPs
- [08 — Partner Onboarding](./08-partner-onboarding.md) (downstream — where leads become partners)
- [09 — Buyer Network Intake](./09-buyer-network-intake.md) (downstream for buyers)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (source tagging)
- [15 — Compliance](./15-compliance.md) (truthful marketing)
- [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md) (referral payouts)
- [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md) (monthly report integration)

## Bottleneck this SOP addresses
**[B9 — No lead-source attribution → marketing spend is blind](./00-bottlenecks.md#b9--no-lead-source-attribution--marketing-spend-is-blind)** — primary fix via UTM taxonomy and monthly report.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 18 — Financial / Payout Reconciliation

## Purpose
Money in. Money out. Books clean. Partners paid. This SOP defines how DispoBuddy tracks assignment fees, reconciles them against the GHL pipeline and Notion deal log, pays out 50/50 splits and referral bonuses, and closes the month in QuickBooks.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (day-to-day bookkeeping):** Admin VA
- **Responsible (monthly close, categorization, payout approval):** Brooke + Admin VA
- **Consulted:** CPA (for quarterly tax prep and year-end)

## Trigger
- **Per deal** — at close (wire received) and payout (wire sent to partner)
- **Weekly** — Friday reconciliation of GHL closed-won vs bank
- **Monthly** — first business day of each month, close the prior month's books
- **Quarterly** — CPA hand-off for tax prep

## Inputs required
- QuickBooks Online access
- Deal Pros LLC bank account access (read-only for Admin VA, full for Brooke)
- GHL → Opportunities filtered by Closed Won
- Notion → Closed Won view
- Executed JV agreements (to verify the split)
- Final HUD / settlement statements (to verify the fee)

## Tools & systems used
- QuickBooks Online (primary books)
- Bank (Deal Pros LLC operating account)
- GHL (pipeline data)
- Notion (deal data)
- Google Drive → `/DispoBuddy/Finance/`
- Secure doc vault for tax documents

## Canonical chart of accounts (relevant lines)

| Account | Type | Used for |
|---|---|---|
| 4000 — JV Assignment Fee Income | Revenue | Our 50% share of assignment fees |
| 5000 — Partner Payouts | COGS or Expense | The other 50% we wire to partners |
| 5010 — Referral Bonuses | Expense | SOP 17 referral payouts |
| 5100 — Marketing | Expense | Paid channels, content tools |
| 5200 — Software | Expense | GHL, Notion, Canva, etc. |
| 5300 — Professional Services | Expense | CPA, legal, contractor VAs |
| 5400 — Title / Escrow Costs | COGS | Title fees charged against our assignments |
| 6000 — Operating Expenses | Expense | Everything else |

**Note:** Structural decision pending — should partner payouts be a COGS (contra-revenue on the P&L) or an Expense? CPA to confirm. Default to **COGS** for now because it most accurately represents "what we keep vs what we distribute."

## Per-deal payout flow

When a deal hits **Closed Won** per [SOP 07](./07-closing-title-coordination.md):

### Step 1 — Verify the wire
1. Check the Deal Pros LLC bank account for an incoming wire from the title company.
2. Confirm amount matches: **50% of net assignment fee** (per the settlement statement).
3. If amount is off → reconcile with title same day. Do NOT update books until the numbers match.

### Step 2 — Record income in QuickBooks
1. QB → Banking → match the deposit to a new sales receipt.
2. Customer: the deal's partner (or create if first deal)
3. Class/location: the deal's state
4. Line items:
   - Gross assignment fee: $[X] (memo: "Full fee for [address]")
   - Less title/escrow fee: -$[Y]
   - Less partner share (50%): -$[Z]
   - Net to Deal Pros LLC: $[X - Y - Z]
5. The net should equal the bank deposit exactly.

Alternative simpler structure (preferred): record only our 50% as income, and the partner's 50% never touches our books because title paid them directly.

**Which structure we use depends on whether title disbursed 50/50 directly or wired us the full fee and we pay the partner.** See steps 3a vs 3b.

### Step 3a — Title disbursed 50/50 directly (preferred)
If title cut a separate check to the partner per the JV disbursement instructions:
1. Only our 50% shows up in our bank
2. Record it as income (account 4000)
3. No separate "partner payout" transaction on our books
4. File the settlement statement and both disbursement receipts in `/Drive/DispoBuddy/Finance/YYYY/Closings/YYYY-MM-DD — [address].pdf`

### Step 3b — Title wired us the full fee, we pay the partner
If title wired us the full assignment fee:
1. Record full fee as income (account 4000)
2. Create a bill (or pay directly) to the partner for their 50%
3. Categorize as Partner Payouts (account 5000)
4. Pay by ACH or wire within 1 business day of receiving our wire
5. File the wire/ACH confirmation in `/Drive/DispoBuddy/Finance/YYYY/Payouts/`
6. Send the partner the payout notification SMS from [SOP 14](./14-partner-communication.md)

**We should push title companies toward structure 3a.** It reduces our bookkeeping and our fraud surface. If title won't disburse split, use 3b.

### Step 4 — Referral bonus (if applicable)
If the partner was referred per [SOP 17](./17-marketing-lead-generation.md) AND this is their first closed deal:
1. Look up the referrer from the `referred_by_*` tag on the partner contact
2. Create a bill to the referrer for $500 (partner referral) or $250 (buyer referral)
3. Categorize as Referral Bonuses (account 5010)
4. Wire / ACH within 1 week
5. Send the referrer the thank-you SMS from [SOP 17](./17-marketing-lead-generation.md)
6. File confirmation

### Step 4b — Affiliate commission (if applicable)
If the closed deal's partner has a `referred_by_affiliate` custom field on their GHL contact:

1. Look up the affiliate by the `referred_by_affiliate` value (this is the affiliate's `affiliate_id`)
2. The `affiliate-track.js` function should have already incremented `affiliate_commission_earned` when the `deal_closed` event was fired. **Verify** the amount is correct:
   - **First close for this partner + within 6 months of partner signup?** → $200 flat bonus should be credited
   - **Within the affiliate's 12-month trailing window?** → 5% of our net dispo fee should be credited
   - **Outside the 12-month window?** → no ongoing commission; only verify the $200 first-close bonus if applicable
3. If the automated counter is wrong, manually update `affiliate_commission_earned` in GHL
4. The actual ACH payout happens monthly on the 15th — see "Monthly affiliate payout" below

**Monthly affiliate payout (on or around the 15th):**
1. Pull all affiliates with `affiliate_commission_earned` > `affiliate_commission_paid`
2. Calculate pending: `earned - paid`
3. If pending ≥ $100 (minimum payout threshold): issue ACH
4. Update `affiliate_commission_paid` in GHL after the ACH is confirmed
5. Add a note on the affiliate's GHL contact: `[YYYY-MM-DD] Affiliate payout: $[amount] via ACH for [month]`
6. Categorize in QB as account 5010 — Referral Bonuses
7. File ACH confirmation in `/Drive/DispoBuddy/Finance/YYYY/Affiliate Payouts/`
8. If pending < $100: rolls over to next month. No action.

See [SOP 20](./20-affiliate-program.md) for the full affiliate program management workflow.

### Step 5 — Update records
1. GHL opportunity → confirm **Closed Won** stage, `Final Assignment Fee` custom field populated
2. Notion row → Status = Closed Won, Closed At = today, Assignment Fee = the exact amount
3. Monthly finance sheet (see below) → add a row

## Weekly reconciliation (Fridays, 30 min)

### Step 1 — Pull the lists
1. GHL → opportunities moved to Closed Won this week
2. Notion → deals with Status = Closed Won and Closed At within the week
3. Bank → all incoming wires this week
4. QB → all sales receipts / income entries this week

### Step 2 — Match
Walk each GHL Closed Won:
- Is there a matching Notion row? (should be)
- Is there a matching bank wire? (should be, within 2 business days of Closed Won)
- Is there a matching QB entry? (should be)

Any mismatches → fix same day or escalate to Brooke by EOD Friday.

### Step 3 — Log
Update the weekly finance log in Google Sheets: "DispoBuddy Finance Log" with a row per closed deal. Columns:
- Close date, deal (address), partner, gross fee, title cost, our 50%, partner 50%, referral if any, net to us, notes

## Monthly close (first business day, 2-3 hours)

### Step 1 — Reconcile the bank
1. QB → Banking → Reconcile the operating account against the bank statement
2. Every deposit and withdrawal matched
3. Variance = 0 before you mark it reconciled

### Step 2 — Review the P&L
1. Pull P&L for the prior month
2. Gross revenue = sum of all assignment fees received (or 50% if using structure 3a)
3. COGS = title costs + partner payouts (if 3b)
4. Gross profit = gross revenue − COGS
5. Operating expenses = software, marketing, referral bonuses, professional services, etc.
6. Net profit = gross profit − OpEx

### Step 3 — Sanity-check against GHL + Notion
- Number of Closed Won in GHL = number of revenue entries in QB? (should be)
- Sum of Closed Won assignment fees in GHL = gross revenue in QB? (should match within rounding)
- Any discrepancy → find the missing deal; most common cause is a deal closed in GHL but the wire hasn't arrived yet (timing), or a deal closed in the bank but not moved in GHL

### Step 4 — Monthly finance report
Produce a one-page summary in `/Drive/DispoBuddy/Finance/YYYY/Monthly/YYYY-MM-summary.md`:

```
# DispoBuddy — [Month YYYY] Summary

## Deal metrics
- Closed Won: N deals
- Total assignment fees: $X (gross)
- Our net revenue (after title costs and partner payouts): $Y
- Avg net per deal: $Y/N = $Z
- Largest deal: $A
- Smallest deal: $B

## Profitability
- Gross revenue: $Y
- COGS: $
- Gross profit: $
- OpEx: $
- Net profit: $
- Net margin: $net / $gross × 100 = X%

## Cash position
- Operating account balance (month-end): $
- Delta from prior month: $

## Red flags
- [any discrepancies, late wires, disputes]

## Action items
- [1-3 things Brooke should do in the next 7 days]
```

### Step 5 — Save and share
Save to Drive. Submit to the first-Monday cadence ([SOP 19](./19-weekly-operations-cadence.md)).

## Quarterly / year-end handoff to CPA

First week of each quarter (Apr, Jul, Oct, Jan):

1. Export QB P&L, Balance Sheet, and General Ledger for the quarter
2. Export a CSV of all Closed Won deals with fees
3. Save to `/Drive/DispoBuddy/Finance/YYYY/Qx/`
4. Email the CPA: "Q[N] tax package ready, please review at your convenience. Call me with anything you need."
5. Respond to any CPA follow-ups within 48 hours

**Year-end:**
1. Additional: inventory of open deals (we shouldn't have any "inventory" but 1099s need clean data)
2. 1099 preparation for partners who received > $600 in payouts (if structure 3b)
3. Brooke signs off on all 1099s before CPA files

## Templates & scripts

### Payout notification SMS (to partner)
See [SOP 14](./14-partner-communication.md) → "Payout notification"

### Referral bonus thank-you SMS (to referrer)
See [SOP 17](./17-marketing-lead-generation.md) → "Referrer thank-you"

### Wire mismatch escalation to title
```
Hi [closer] — quick question on [address]. Our records show the net assignment fee at $[X] and the disbursement on our side at $[Y]. Can you help me reconcile? I'm looking at the settlement statement line [line] and it doesn't match what hit our account. Thanks.
```

### Monthly close ready-to-review ping to Brooke
```
Brooke — monthly close done for [Month]. [N] deals, $[gross] gross, $[net] net. Summary at /Drive/DispoBuddy/Finance/YYYY/Monthly/YYYY-MM-summary.md. Red flags: [list or "none"]. Ready for your 15-min review.
```

## SLAs / quality standards
- **Per-deal payout within 1 business day** of receiving our wire (structure 3b)
- **Weekly reconciliation** every Friday, same day
- **Monthly close by day 5** of the following month
- **Zero variance** on bank reconciliation — variance = 0 before marking complete
- **Referral bonuses paid within 1 week** of the referred deal closing
- **1099s issued** by Jan 31 every year for qualifying partners

## Escalation / edge cases
- **Title wired the wrong amount** → call title same day; do not update books until fixed
- **Partner disputes the payout amount** → Brooke; pull the settlement statement + JV agreement; reconcile within 24 hours
- **Wire didn't arrive within 3 business days of Closed Won** → call title; something's stuck
- **Partner payout fails** (bad wire info) → call partner; re-verify bank info; re-send; do not release the payment to a different account without written confirmation
- **We owe a partner a correction** from a prior month → pay promptly; note in the current month's report; transparent with the partner
- **Overpaid partner** → call them immediately; request return of overage; document everything; **never** silently take money back from a future payout
- **Suspected fraud** (fake wire, identity theft on a partner, phishing on a title request) → immediate Brooke + [SOP 15](./15-compliance.md); do not wire, do not respond via the potentially compromised channel

## Related SOPs
- [07 — Closing & Title Coordination](./07-closing-title-coordination.md) (upstream)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (Closed Won stage source of truth)
- [13 — Notion Deal Tracker](./13-notion-deal-tracker.md) (Closed Won Notion view)
- [15 — Compliance](./15-compliance.md) (entity + wire discipline)
- [17 — Marketing & Lead Generation](./17-marketing-lead-generation.md) (referral payouts)
- [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md) (monthly report integration)

## Bottleneck this SOP addresses
Not a direct bottleneck, but supports [B8](./00-bottlenecks.md#b8--ghl-and-notion-drift-apart-dual-source-of-truth-problem) by forcing Friday reconciliation.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 19 — Weekly Operations Cadence

## Purpose
This is the Monday-morning operating system for DispoBuddy. Every other SOP in this manual feeds into this one: pipeline health, deal flow, partner activity, buyer activity, marketing performance, finance, compliance, and site health all get reviewed in a single 60-minute block so Brooke can walk into the week knowing exactly what to work on and what to delegate.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (prep the dashboards):** Dispo VA + Admin VA (completed Sunday evening or Monday 8 AM)
- **Responsible (run the meeting):** Brooke

## Trigger
Every **Monday morning, 9:00 AM local time**, 60 minutes blocked on Brooke's calendar. Non-negotiable. If Brooke is traveling, it's 60 minutes anywhere with wifi.

## Inputs required (prepped by VAs Sunday night or by 8:30 AM Monday)

1. **Pipeline snapshot** from GHL — count of deals by stage, aging counts
2. **Notion reconciliation summary** from [SOP 13](./13-notion-deal-tracker.md) — drift resolved, orphans flagged
3. **Closed Won last week** — count + assignment fees + partner payouts
4. **New partner signups last week** — count + where they came from
5. **Hot prospect list** — partners who are ready for intro calls
6. **Stuck deals report** — deals in any stage beyond target time-in-stage
7. **Buyer hygiene status** — pending cleanups from [SOP 10](./10-buyer-network-hygiene.md)
8. **Marketing channel performance** — last week's UTM breakdown from [SOP 17](./17-marketing-lead-generation.md)
9. **Finance quick-check** — bank balance, any reconciliation issues from [SOP 18](./18-financial-payout-reconciliation.md)
10. **Site / function health** — any Netlify errors last week from [SOP 16](./16-website-functions-deploy.md)
11. **Compliance exceptions** — anything escalated in the last week from [SOP 15](./15-compliance.md)

All of this lives in one Google Doc or Notion page called **"DispoBuddy — Monday Dashboard"** and is filled in by VAs before 9 AM Monday.

## Tools & systems used
- Google Doc / Notion — "DispoBuddy — Monday Dashboard"
- GHL (live during the meeting)
- Notion deals DB (live during the meeting)
- Finance summary sheet (live during the meeting)

## The 60-minute agenda

### Minute 0-10 — Last week's numbers

Review the numbers block on the dashboard:

| Metric | Last week | Prior week | Delta | Target |
|---|---|---|---|---|
| Submissions | N | N | +/-% | depends |
| Under review (backlog at end of week) | N | N | +/-% | ≤ 3 |
| Accepted | N | N | +/-% | 30-50% of submissions |
| Declined | N | N | +/-% | 50-70% of submissions |
| Moved to Marketing | N | N | +/-% | = Accepted rate |
| Offers received | N | N | +/-% | ≥ 1 per deal in Marketing |
| Closed Won | N | N | +/-% | varies |
| Gross assignment fees collected | $X | $X | +/-% | trend line |
| Our 50% net | $X | $X | +/-% | trend line |

**Ask:** is the trend up, flat, or down? What's the leading indicator (submissions) vs the lagging indicator (closings)?

### Minute 10-20 — Pipeline walk

Open GHL → Opportunities → 3. JV Deals kanban view. Walk it left to right:

1. **New JV Lead** — anything stuck here > 2 hours? (Should always be moving)
2. **Under Review** — any aging > 24 hours? → action: ping Brooke, clear by EOD
3. **Needs Info** — any aging > 48 hours? → action: escalate to Brooke for a phone call
4. **Accepted — Package** — is the JV agreement signed yet? Any delays? → [SOP 03](./03-jv-agreement.md)
5. **JV Signed** — is the deal sheet done? Any delays? → [SOP 04](./04-deal-packaging.md)
6. **Marketing** — for every deal here: how many buyers matched, how many contacted, how many replied, any offers?
7. **Offer Received** — is the partner responding? Any stuck offers?
8. **Under Contract (Buyer)** — on track for COE? Any title issues?
9. **Closed Won** — new this week, anything to celebrate?
10. **Declined / Dead** — any patterns to note (next step)?

**Ask:** is there any deal in this pipeline that's stuck for a reason I can fix TODAY?

### Minute 20-30 — Dead deal retrospective

Look at the declined / dead deals from last week:

- How many?
- By category (numbers / market / incomplete / ghosted / no interest / seller / title)?
- Any pattern?

Patterns → actions:
- High `declined_numbers` → strengthen the "how to submit" education in [SOP 08](./08-partner-onboarding.md)
- High `declined_incomplete` → harden the submit form per [SOP 16](./16-website-functions-deploy.md)
- High `declined_no_interest` in a specific market → buyer sourcing gap; flag for [SOP 09](./09-buyer-network-intake.md)
- High `dead_seller_backed_out` → Brooke investigates partner sourcing habits

### Minute 30-40 — Partner & buyer network health

1. **New partners last week** — count, source breakdown, hot prospects with intro calls booked
2. **Partner activity** — any VIPs who haven't submitted in 30+ days? (outreach touch)
3. **Buyer hygiene** — missing-field count, stale count, archived count this month
4. **Top-of-funnel marketing** — channel performance ([SOP 17](./17-marketing-lead-generation.md)); any channel needs more attention?

### Minute 40-50 — Finance & ops

1. **Bank balance** — current operating account
2. **Wires in last week** — did every Closed Won wire arrive? Any late?
3. **Partner payouts last week** — all completed?
4. **Referral bonuses due?** — any to pay this week?
5. **Marketing spend last week** — total; any channel over budget?
6. **Burn rate check** — runway if income stopped
7. **Any finance red flags** from [SOP 18](./18-financial-payout-reconciliation.md)

### Minute 50-55 — Compliance, site, and exceptions

1. **Compliance escalations** from last week — anything open?
2. **Site / function errors** from Netlify logs — any to triage?
3. **Customer complaints** from last week — resolution status?
4. **Anything weird** anywhere that someone should eyeball?

### Minute 52-55 — Affiliate program health

1. **New affiliate signups last week** — count
2. **Total affiliate clicks last week** — sum of `affiliate_clicks` deltas (or pull from GHL)
3. **Affiliate-referred partners last week** — count of contacts tagged `db-affiliate-referred` created this week
4. **Affiliate-referred deals closed last week** — count + GCI
5. **Commission owed** — sum of `affiliate_commission_earned - affiliate_commission_paid` across all active affiliates. If the 15th is this week, confirm payout list is ready.
6. **Any affiliate flags** — self-referral suspicion, FTC violations, complaints

See [SOP 20](./20-affiliate-program.md) for full affiliate management.

### Minute 55-60 — This week's priorities

Brooke picks **3 priorities** for this week. That's it. Three. Not ten.

Examples:
- "Close the IL deal by Thursday"
- "Onboard 2 new sub-to buyers in AZ"
- "Finalize the Q2 marketing copy for the sub-to partner video"

Write them in the dashboard doc. Each priority gets an owner (Brooke, Dispo VA, Admin VA) and a deliverable.

## Step-by-step VA prep procedure (Sunday evening)

The dashboard must be fully populated before Brooke opens it at 9 AM Monday.

### Dispo VA prep (30 minutes)
1. GHL pipeline count by stage → paste numbers into dashboard
2. Aging flags → list any deal beyond target time-in-stage
3. New partner signups → count + sources
4. Hot prospect list → names + next action
5. Buyer hygiene status → current counts on the standing smart lists from [SOP 10](./10-buyer-network-hygiene.md)
6. Marketing channel UTM breakdown from last week → copy the table from [SOP 17](./17-marketing-lead-generation.md) weekly report

### Admin VA prep (20 minutes)
1. Bank balance (from QB)
2. Last week's Closed Won $ and partner payouts $
3. Any referral bonuses due
4. Finance red flags (reconciliation issues, late wires, etc.)
5. Compliance exceptions (pulled from the compliance log)
6. Site / function errors (pulled from Netlify function logs)

### Both VAs — end state
Dashboard is 100% filled in by 8:30 AM Monday. Any blanks = the VA owns a follow-up on Monday.

## Templates & scripts

### Monday Dashboard template
Copy this verbatim to create a new dashboard each Monday. Title format: `[YYYY-MM-DD] DispoBuddy Monday Dashboard`

```markdown
# [YYYY-MM-DD] DispoBuddy Monday Dashboard

## 1. Last week's numbers
| Metric | Last week | Prior week | Delta |
|---|---|---|---|
| Submissions | | | |
| Accepted | | | |
| Declined | | | |
| Closed Won (count) | | | |
| Gross assignment fees | | | |
| Our net 50% | | | |
| New partners | | | |
| New buyers | | | |

## 2. Pipeline snapshot (by stage)
- New JV Lead: N
- Under Review: N (aging: N beyond 24h)
- Needs Info: N (aging: N beyond 48h)
- Accepted — Package: N
- JV Signed: N
- Marketing: N (aging: N beyond 10d)
- Offer Received: N
- Under Contract (Buyer): N
- Closed Won this week: N

## 3. Stuck deals
- [deal 1] — [stage] — [reason]
- [deal 2] — [stage] — [reason]

## 4. Dead deal retrospective
- Total declined last week: N
- By category: numbers N / market N / incomplete N / ghosted N / no interest N / seller N / title N
- Patterns: [notes]

## 5. Partner & buyer network
- New partners: N (sources: list)
- Hot prospects with intro calls booked: list
- VIP partners silent > 30 days: list
- Buyer hygiene: missing fields N, stale N, archived N
- Marketing channel performance: [top 3 sources by GCI]

## 6. Finance
- Bank balance: $X
- Wires received last week: N, total $X
- Partner payouts last week: N, total $X
- Referral bonuses due this week: $X
- Marketing spend last week: $X
- Red flags: [list or "none"]

## 7. Affiliate program
- New affiliate signups: N
- Affiliate clicks last week: N
- Affiliate-referred partners: N
- Affiliate-referred deals closed: N ($X GCI)
- Commission owed (all affiliates): $X
- Payout due this month (if 15th upcoming): $X to N affiliates
- Flags: [self-referral, FTC violation, or "none"]

## 8. Compliance / Site / Exceptions
- Compliance escalations: [list or "none"]
- Site / function errors: [list or "none"]
- Complaints: [list or "none"]
- Other weirdness: [list or "none"]

## 8. This week's priorities (max 3)
1. [priority] — owner: [name] — deliverable: [what done looks like]
2. [priority] — owner: [name] — deliverable: [what done looks like]
3. [priority] — owner: [name] — deliverable: [what done looks like]

## 9. Notes for next week
- [anything to track]
```

### Priority-setting prompt (Brooke's internal check)
Before writing the 3 priorities, ask:
- "If I could only close one deal this week, which one is it and what does it need?"
- "If I could only fix one bottleneck this week, which one moves the most deals?"
- "What's the one thing that, if I skip it, next Monday's numbers will hurt?"

### End-of-week delta email (Friday, optional)
Template:
```
Team — quick Friday check-in.

Wins this week:
- [list]

Losses / learnings:
- [list]

What I'm watching into Monday:
- [list]

— Brooke
```

## SLAs / quality standards
- **Dashboard prepped by 8:30 AM Monday** — no exceptions
- **Meeting starts and ends on time** — 9:00-10:00 AM
- **3 priorities set every week** — no more, no less
- **Each priority has an owner** — never unowned work
- **Last week's priorities are reviewed** — did they happen? Why or why not?

## Escalation / edge cases
- **Dashboard not ready by 8:30** — Brooke pings the VAs; meeting may slip but does NOT cancel
- **Critical issue mid-week** (production down, legal threat, major fall-through) — do not wait for Monday; escalate immediately per the relevant SOP
- **Brooke is unavailable** for a Monday — the cadence still happens; VAs run the dashboard and leave their 3 priority recommendations for Brooke to review async
- **A priority isn't done by Friday** — it rolls to next week with a note explaining why; second week in a row = something's wrong, investigate
- **Numbers are bad** — do not panic. Look at the *leading* indicators (submissions, new partners, new buyers) rather than the lagging ones (closed deals). Are the inputs healthy?

## Related SOPs
- Everything. This SOP is the aggregator.
- Most directly:
  - [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md)
  - [13 — Notion Deal Tracker](./13-notion-deal-tracker.md)
  - [17 — Marketing & Lead Generation](./17-marketing-lead-generation.md)
  - [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md)

## Bottleneck this SOP addresses
[B10 — Founder single-point-of-failure](./00-bottlenecks.md#b10--founder-single-point-of-failure) — the weekly cadence is the discipline that makes the delegation model work. Also supports every other bottleneck by making progress visible.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |

---

<!-- PAGE BREAK -->

# 20 — Affiliate Program Management

## Purpose
The affiliate program turns our partners, buyers, and fans into a paid growth channel. This SOP covers the full lifecycle: affiliate signup → approval → tracking → commission calculation → payout → fraud detection → offboarding. It is the single source of truth for how the program runs operationally.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (approval, fraud, terms):** Brooke
- **Responsible (payout prep, commission math, dashboard data):** Admin VA
- **Consulted:** Dispo VA (on affiliate-referred deal activity)

## Trigger
- **New signup:** form submitted at `/affiliates` → `affiliate-signup.js` fires
- **Click/event:** visitor lands with `?ref=` → `affiliate.js` fires beacon → `affiliate-track.js` logs it
- **Deal closed:** `affiliate-track.js` receives a `deal_closed` event and calculates commission
- **Monthly payout:** on/around the 15th of each month
- **Quarterly audit:** first Monday of each quarter

## Inputs required
- GHL access (affiliate contacts, custom fields, tags)
- Deal Pros LLC bank account (for ACH payouts)
- QuickBooks (for recording payouts)

## Tools & systems used
- GHL → Contacts, Custom Fields, Tags, Notes
- `netlify/functions/affiliate-signup.js` — signup handler
- `netlify/functions/affiliate-track.js` — event tracker + commission calculator
- `netlify/functions/affiliate-stats.js` — dashboard data lookup
- `affiliate.js` — client-side tracker (cookie + localStorage + beacon)
- QuickBooks → account 5010 (Referral Bonuses)
- Google Drive → `/DispoBuddy/Finance/YYYY/Affiliate Payouts/`

## Program terms (source of truth)

The canonical terms live in `affiliate-terms.html`. Current structure:

| Term | Value |
|---|---|
| First-close bonus | $200 flat, paid when a referred partner closes their first deal |
| First-close window | 6 months from partner signup |
| Ongoing commission | 5% of Dispo Buddy's net dispo fee per closed deal |
| Trailing window | 12 months from the affiliate's enrollment date |
| Attribution model | Last-click, 90-day cookie |
| Payout method | ACH |
| Payout cadence | Monthly, on/around the 15th |
| Minimum payout | $100 (balances below carry over) |
| Self-referral | Not allowed |
| Exclusivity | None — affiliates can promote competitors |
| Termination | Either party, any time; earned commissions paid out |

**If these terms change**, update: `affiliate-terms.html`, the commission constants in `affiliate-track.js`, the welcome email in `affiliate-signup.js`, the copy on `affiliates.html`, and this SOP.

## Step-by-step: new affiliate signup

### Step 1 — Automated flow (handled by `affiliate-signup.js`)
When a visitor submits the `/affiliates` form:
1. GHL contact is upserted with all affiliate custom fields (see [SOP 12](./12-ghl-crm-hygiene.md))
2. Tags applied: `dispo-buddy`, `db-affiliate`, `affiliate-active`
3. Unique `affiliate_id` generated (name-slug + random suffix, checked for uniqueness against GHL)
4. Welcome SMS + email sent with the referral link and dashboard URL
5. Internal alert SMS + email to Brooke
6. Note added to the GHL contact

### Step 2 — Manual review (Brooke, within 24 hours)
1. Open the new affiliate's GHL contact (from the internal alert)
2. Review: who are they? What's their audience? What's their promo plan?
3. **Approve:** no action needed — they're already active by default
4. **Pause:** if the application is suspicious, set `affiliate_status` → `paused`, send a "we're reviewing your application" SMS, investigate
5. **Reject:** set `affiliate_status` → `terminated`, send a polite decline, remove `affiliate-active` tag

### Step 3 — Collect payout details (post-approval)
Payout details are **not** collected on the signup form. After approval:
1. Send the affiliate an SMS or email requesting their ACH details (bank name, routing number, account number) OR Zelle/PayPal as a backup
2. Enter the details into the `affiliate_payout_method` and `affiliate_payout_details` custom fields on their GHL contact
3. Note: `[YYYY-MM-DD] Payout details collected: [method]`

## Step-by-step: tracking and attribution

### How clicks are tracked
1. Visitor clicks an affiliate link: `https://dispobuddy.com/?ref=john-doe-a7x3`
2. `affiliate.js` (loaded on every page) reads `?ref=`, stores attribution in localStorage + a 90-day cookie
3. Fires a `click` beacon to `/api/affiliate-track` (debounced: one per session per affiliate)
4. `affiliate-track.js` increments `affiliate_clicks` on the affiliate's GHL contact

### How signups are tracked
1. Visitor fills out `/join` or `/submit-deal` with the affiliate cookie active
2. Form JS calls `DBAffiliate.getId()` and includes `affiliate_id` in the payload
3. `partner-onboard.js` or `dispo-buddy-submit.js` writes `referred_by_affiliate` custom field + `db-affiliate-referred` tag on the new partner's GHL contact
4. `affiliate-track.js` receives a `signup` event and increments `affiliate_signups`

### How deal closes are tracked
When a deal closes (per [SOP 07](./07-closing-title-coordination.md)):
1. Dispo VA (or automation) fires a `deal_closed` event to `affiliate-track.js` with:
   - `affiliate_id` (from the partner's `referred_by_affiliate` field)
   - `deal_value` (Dispo Buddy's net dispo fee — our 50% share)
   - `first_close: true/false` (is this the partner's first closed deal with us?)
2. `affiliate-track.js` calculates the commission:
   - If `first_close` and within 6 months of partner signup → +$200
   - If within the affiliate's 12-month trailing window → +5% of `deal_value`
   - If outside the 12-month window → $0 ongoing (first-close bonus still possible if within 6 months)
3. `affiliate_commission_earned` is incremented on the affiliate's GHL contact
4. An audit note is added to the affiliate's contact

**Important:** The `deal_closed` event must be fired manually or via a GHL workflow today. It is NOT automatic from the closing flow. Until this is automated, the Dispo VA must fire it when marking a deal as Closed Won. Add to the [SOP 07](./07-closing-title-coordination.md) close-day checklist:
> "If the partner has a `referred_by_affiliate` field → fire the affiliate `deal_closed` event via the track endpoint."

## Step-by-step: monthly payout (on/around the 15th)

### Step 1 — Pull the payout list (Admin VA)
1. In GHL, filter contacts: tag = `affiliate-active`, `affiliate_commission_earned` > `affiliate_commission_paid`
2. For each affiliate, calculate: `pending = earned - paid`
3. Filter out anyone with pending < $100 (below the minimum; rolls over)
4. Build the payout spreadsheet:

| Affiliate | ID | Pending | Payout method | Account details | Notes |
|---|---|---|---|---|---|
| John Doe | john-doe-a7x3 | $340 | ACH | ****1234 | |

### Step 2 — Verify the math (Admin VA)
For each affiliate on the payout list:
1. Pull their affiliate note history in GHL
2. Cross-check: every `deal_closed` event note should show a commission delta
3. Sum the deltas → should equal `affiliate_commission_earned`
4. Subtract `affiliate_commission_paid` → should equal the pending amount
5. Flag any discrepancy for Brooke

### Step 3 — Brooke approves
1. Admin VA sends the payout list to Brooke
2. Brooke reviews and approves (or holds specific affiliates for investigation)
3. Once approved, Admin VA processes the ACH transfers

### Step 4 — Process payouts (Admin VA)
1. Issue ACH from the Deal Pros LLC operating account
2. For each payout:
   - Update `affiliate_commission_paid` in GHL: `paid + this payout`
   - Add note: `[YYYY-MM-DD] Affiliate payout: $[amount] via ACH for [month]. New balance: earned $[X], paid $[Y], pending $[Z].`
   - Record in QuickBooks as account 5010 (Referral Bonuses)
   - Save ACH confirmation in `/Drive/DispoBuddy/Finance/YYYY/Affiliate Payouts/`
3. Send each affiliate a confirmation SMS:
   ```
   {{contact.first_name}} — your Dispo Buddy affiliate payout of $[amount] for [month] just went out via ACH. Should hit in 1-3 business days. Keep those referrals coming!
   ```

### Step 5 — 1099 tracking
Any affiliate who receives $600+ in a calendar year needs a 1099-NEC. Track cumulative payouts by affiliate across the year. Flag at $500 to collect a W-9 proactively (see [SOP 15](./15-compliance.md)).

## Fraud detection

### Self-referral detection
Check monthly:
1. Pull all contacts tagged `db-affiliate-referred` created in the last 30 days
2. For each, compare the `referred_by_affiliate` value to the partner's own email/phone
3. If the affiliate's email or phone matches the referred partner's → **flag**
4. Also check: same IP address on the affiliate click beacon and the partner signup (if logged)
5. Flagged → withhold commission, notify Brooke, investigate

### Click inflation detection
Check monthly:
1. Pull affiliates with click counts disproportionate to their signups (e.g., 500 clicks, 0 signups)
2. The client-side debounce (one beacon per session) limits casual inflation, but a determined actor can still inflate
3. If suspicious → check the click note trail for patterns (same user agent, same IP, rapid-fire timestamps)
4. Flagged → pause the affiliate, notify Brooke

### Affiliate-to-affiliate referral loop
Not currently tracked, but watch for: Affiliate A refers Affiliate B, who refers partners that earn Affiliate A a commission through a separate arrangement. If this pattern emerges, set a policy and update these SOPs.

## Affiliate offboarding

### Voluntary exit
1. Affiliate texts or emails asking to leave
2. Set `affiliate_status` → `terminated`
3. Remove `affiliate-active` tag
4. Pay out any earned, unpaid commissions ≥ $100 in the next payout cycle
5. Pending commissions below $100 are forfeited per the terms
6. Note: `[YYYY-MM-DD] Affiliate terminated — voluntary. Final payout: $[X] or "below minimum, forfeited."`

### Involuntary termination (by Brooke)
Triggers:
- 3 FTC disclosure violations
- Confirmed self-referral
- Confirmed click fraud
- Spam or brand impersonation
- Any violation of the prohibited activities in `affiliate-terms.html`

Procedure:
1. Set `affiliate_status` → `terminated`
2. Remove `affiliate-active` tag
3. Send termination notice (SMS + email):
   ```
   {{contact.first_name}} — we're terminating your Dispo Buddy affiliate account effective immediately due to [reason]. Per the program terms, earned and verified commissions will be paid out; pending/unverified commissions are forfeited. If you believe this is an error, reply to this message.
   ```
4. Withhold any commission from suspicious activity
5. Pay out clean, verified commissions in the next cycle
6. Note: `[YYYY-MM-DD] Affiliate terminated — involuntary. Reason: [X]. Withheld: $[Y]. Paid: $[Z].`
7. If the affiliate pushes back → Brooke + [SOP 15](./15-compliance.md)

## SLAs / quality standards
- **New affiliate reviewed within 24 hours** of signup
- **Payout details collected within 1 week** of approval
- **Monthly payout processed by the 17th** (2-day buffer past the 15th)
- **Commission math verified** on every payout before Brooke signs off
- **Self-referral check run monthly** (first business day)
- **Click inflation check run monthly** (first business day)
- **Quarterly audit:** 5 random payouts verified end-to-end

## Escalation / edge cases
- **Affiliate asks for a higher commission rate** → Brooke only. We don't negotiate individual rates in V1; if we ever do, it's a separate agreement.
- **Affiliate's referred partner disputes being "affiliated"** → the attribution is between us and the affiliate; the partner's deal terms don't change. But investigate if the partner feels misled.
- **Affiliate refers a partner who was already in our pipeline** → last-click attribution applies. If the partner was already a contact before the affiliate's cookie was set, the affiliate does NOT get credit.
- **Affiliate wants to be a JV partner too** → fine, route through [SOP 08](./08-partner-onboarding.md). But they cannot self-refer (earn affiliate commission on their own deals).
- **Two affiliates claim the same partner** → last-click wins per the terms. The cookie timestamp is the tiebreaker. Losing affiliate gets a courteous explanation.
- **Affiliate's trailing window expires mid-deal** → if the deal was *submitted* before expiry but *closes* after, the affiliate still earns the 5%. The window applies to when the deal is submitted, not when it closes.
- **Payout ACH fails** → re-verify bank details with the affiliate. Do not re-send without verified details. Note the failed attempt.

## Related SOPs
- [08 — Partner Onboarding](./08-partner-onboarding.md) (affiliate-referred partners)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (affiliate tags + custom fields)
- [15 — Compliance](./15-compliance.md) (FTC, prohibited activities, self-referral)
- [17 — Marketing & Lead Generation](./17-marketing-lead-generation.md) (affiliate as a channel)
- [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md) (commission payouts)
- [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md) (affiliate metrics in dashboard)

## Bottleneck this SOP addresses
Growth lever — the affiliate program scales partner acquisition without proportional marketing spend. It also addresses [B9 — No lead-source attribution](./00-bottlenecks.md#b9--no-lead-source-attribution--marketing-spend-is-blind) by adding a trackable, performance-based channel.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-13 | Initial version | Claude (on behalf of Brooke) |
