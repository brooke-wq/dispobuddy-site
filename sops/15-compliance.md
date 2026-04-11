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
