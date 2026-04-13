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
