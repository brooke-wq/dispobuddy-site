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
