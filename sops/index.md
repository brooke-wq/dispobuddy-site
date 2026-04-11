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
