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
