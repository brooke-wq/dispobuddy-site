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
