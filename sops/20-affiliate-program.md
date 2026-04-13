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
