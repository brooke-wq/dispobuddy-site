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
