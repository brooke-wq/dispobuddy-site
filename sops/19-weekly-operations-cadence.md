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

## 7. Compliance / Site / Exceptions
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
