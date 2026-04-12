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
