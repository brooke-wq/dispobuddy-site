# 17 — Marketing & Lead Generation

## Purpose
Every partner and every buyer comes from somewhere — and today we don't know where. This SOP defines the marketing channels we use, the UTM taxonomy that makes attribution possible, the content cadence, and the monthly source-attribution report that tells us where to double down and where to cut.

## Owner / Roles
- **Accountable:** Brooke
- **Responsible (content creation):** Brooke
- **Responsible (publishing + tracking):** Dispo VA
- **Consulted:** Admin VA (for report cross-check against revenue)

## Trigger
- **Daily** — content posting per the cadence
- **Weekly** — channel-level performance check (part of [SOP 19](./19-weekly-operations-cadence.md))
- **Monthly** — full source-attribution report

## Inputs required
- GHL data on `source` field for each new contact
- Notion deal data with Source property
- Channel-level metrics (Google Analytics, YouTube analytics, podcast downloads, Facebook group engagement)

## Tools & systems used
- GHL (source tagging, contact creation reporting)
- Notion (deal data with source)
- Google Analytics (dispobuddy.com traffic + UTM breakdown)
- Canva (graphics + short-form content)
- Loom / screen capture (video)
- YouTube / Facebook / LinkedIn / podcast hosts
- Buffer or Later (content scheduling, optional)

## Active channels

| Channel | What we publish | Frequency | Primary audience |
|---|---|---|---|
| YouTube | 5-10 min case study videos on deals we moved | weekly | Wholesalers considering JV dispo |
| Facebook groups (wholesaler / dispo) | Short wins + "here's what moved this week" posts | 2x/week | Active wholesalers |
| LinkedIn (Brooke's profile) | Thought leadership, deal breakdowns | 2x/week | Agents, investors |
| Referral program | Word of mouth with formal incentives | always-on | All |
| Paid Google (optional) | "real estate wholesaler dispo partner" intent searches | paused until B9 lands | Wholesalers in buying mode |
| Podcast guest appearances | Guest on investor / wholesaler shows | ad-hoc | Broad |
| Email newsletter | Monthly market update + featured deals | monthly | Warm partners + buyers |

## UTM taxonomy

Every outbound link to dispobuddy.com carries a UTM. Without this, SOP 19 can't report anything.

**Format:** `?utm_source=<source>&utm_medium=<medium>&utm_campaign=<campaign>&utm_content=<content>`

| Parameter | Value | Examples |
|---|---|---|
| `utm_source` | The specific channel | `youtube`, `fb_group_wholesalerpros`, `linkedin_brooke`, `podcast_realestatepod`, `referral_partner_[name]`, `email_newsletter` |
| `utm_medium` | The medium type | `video`, `social`, `email`, `referral`, `cpc`, `organic` |
| `utm_campaign` | The specific initiative | `march_newsletter`, `q2_partner_push`, `youtube_casestudy_series` |
| `utm_content` | The specific piece | `deal_case_study_phoenix`, `dispo_guide_pdf`, `homepage` |

**Example:** a YouTube video description link → `https://dispobuddy.com/submit-deal?utm_source=youtube&utm_medium=video&utm_campaign=casestudy_series&utm_content=phoenix_subto_march`

**Rule:** **No link goes live without a UTM.** Period. If you don't have time to build the UTM, you don't have time to post.

## UTM capture on the forms

The submit and join forms already capture the `hearAboutUs` freeform field. To make UTMs actionable:

1. Site JS reads `utm_*` from the query string on page load.
2. Stores in `sessionStorage`.
3. On form submit, populates hidden form fields named `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
4. `dispo-buddy-submit.js` and `partner-onboard.js` push those values into GHL custom fields on the contact.
5. See [SOP 16](./16-website-functions-deploy.md) for the deploy path if this isn't wired up yet — it's part of the B9 fix.

## Content cadence — weekly template

| Day | Channel | Task |
|---|---|---|
| Mon | LinkedIn | 1 thought-leadership post (200-400 words) |
| Mon | Facebook group | 1 "deal of the week" short post |
| Tue | YouTube | Upload the week's case-study video (pre-recorded) |
| Wed | LinkedIn | 1 short win post (photo + caption) |
| Wed | Facebook group | Answer 3 questions in active wholesaler threads (not our own threads) |
| Thu | Email | Monthly newsletter (once per month, first Thursday) |
| Fri | (all) | Engage with replies from the week |

**Content backlog:** maintain a minimum of 4 videos and 8 posts in the queue at all times. If the backlog runs dry, pause other work and refill it.

## Referral program

For every closed deal a partner or buyer refers to us, the referrer gets:

- **Partner referral (they send us a wholesaler who closes):** $500 referral bonus at close of the referred partner's first deal with us
- **Buyer referral (they send us a buyer who closes):** $250 referral bonus at close of the referred buyer's first deal with us
- **Tagged in GHL:** `referrer` on their contact record; `referred_by_[name]` on the new contact

**How it works:**
1. When we onboard a new contact, ask: "How'd you hear about us?"
2. If they say a name → pull up the referrer's GHL contact, add `referred_by_[referrer_name]` to the new contact
3. When the new contact closes their first deal, trigger the referral payout per [SOP 18](./18-financial-payout-reconciliation.md)
4. Send a personal thank-you SMS to the referrer

**Formal referral link** (for the referrer to share): `https://dispobuddy.com/join?utm_source=referral_[their_name]&utm_medium=referral&utm_campaign=always_on`

## Monthly source-attribution report

Run on the **first Monday** of every month for the prior month. Part of [SOP 19](./19-weekly-operations-cadence.md).

### Step 1 — Pull the data
1. Export GHL contacts created in the prior month with columns: created date, source tag, utm_source, utm_medium, utm_campaign.
2. Export Notion deals created in the prior month with columns: created date, status, source, assignment fee.

### Step 2 — Build the table
For each unique `utm_source` (or `source` tag if no UTM):

| Source | New contacts | Deal submissions | Accepted | Closed Won | GCI from Closed | Cost (paid channels only) | ROI |
|---|---|---|---|---|---|---|---|
| youtube | N | N | N | N | $X | $0 | ∞ |
| fb_group_* | N | N | N | N | $X | $0 | ∞ |
| linkedin_brooke | N | N | N | N | $X | $0 | ∞ |
| referral_* | N | N | N | N | $X | $0 | ∞ |
| paid_google | N | N | N | N | $X | $Y | (GCI-Y)/Y |
| email_newsletter | N | N | N | N | $X | $0 | ∞ |
| unknown | N | N | N | N | $X | — | — |

### Step 3 — Interpret
- Sort descending by **Closed Won GCI**.
- Top 3 sources → **double down.** More volume, more budget.
- Bottom 3 sources → **consider cutting** if they haven't closed a deal in 90 days.
- Any source with high "new contacts" but zero closings → quality problem (wrong audience).
- Any source with low "new contacts" but decent closings → scale problem (audience is tight but qualified).

### Step 4 — Publish
Save the table to `/Drive/DispoBuddy/Marketing/Monthly Reports/YYYY-MM.md`. Share in the Monday cadence. Decide channel actions for the coming month.

## Templates & scripts

### Monthly newsletter (first Thursday)
Subject line pattern: `DispoBuddy Monthly — [X] deals closed, [Y] buyers looking in [markets]`

Body structure:
1. **Opener** (2-3 sentences, market update)
2. **Closed this month** (2-3 deals with one-sentence highlights)
3. **What our buyers want right now** (3-4 bullets by market)
4. **A tip from the trenches** (1 actionable tip partners can use this week)
5. **CTA:** "Got a deal? Submit it here: [link with UTM]"

### Case study video outline
1. **Hook** (10 sec) — "We moved a sub-to deal in Tempe last week. Here's how."
2. **Partner backstory** (30 sec) — who sent it, how they sourced it
3. **Numbers** (60 sec) — contract, asking, ARV, spread, buyer profile
4. **The match** (60 sec) — how we found the buyer, how fast offers came
5. **Close** (60 sec) — the title process, any hiccups, the wire
6. **Lesson** (30 sec) — 1 thing partners watching should take away
7. **CTA** (10 sec) — "Got a deal? Hit dispobuddy.com. Link in description."

### Referrer thank-you SMS
```
{{referrer_first_name}} — quick heads-up: {{new_contact_name}} you sent us just closed their first deal. Your referral bonus ($500 or $250) is going out with next week's wire. Thanks for the intro. Send me more.
```

### UTM pre-flight checklist (before posting anything)
- [ ] Does the link include `utm_source`?
- [ ] Does the link include `utm_medium`?
- [ ] Does the link include `utm_campaign`?
- [ ] Does the link include `utm_content`?
- [ ] Does the link open correctly when clicked?
- [ ] Does it land on the right page (submit-deal / join / home)?

## SLAs / quality standards
- **100% of outbound links UTM-tagged** — no exceptions
- **Weekly content cadence** hit every week — if a week is missed, double up the following week
- **Monthly report published** by the first Monday of every month
- **Newsletter sent** on the first Thursday of every month, every month
- **Referral bonuses paid** with the closing wire for the referred deal, not later

## Escalation / edge cases
- **Paid channel ROI goes negative** for 2 consecutive months → pause, re-evaluate, consult Brooke
- **A viral moment** on one channel (video blows up, group post trends) → shift extra effort there for 2 weeks; don't force the normal cadence on top
- **Spam complaint on the newsletter** → audit the list; confirm everyone opted in via [SOP 15](./15-compliance.md); remove anyone not double-verified
- **Partner wants to stop being featured** in content — immediate respect; pull the content; no debate
- **Compliance asks to remove a piece of content** — do it within 24 hours (see [SOP 15](./15-compliance.md))

## Related SOPs
- [08 — Partner Onboarding](./08-partner-onboarding.md) (downstream — where leads become partners)
- [09 — Buyer Network Intake](./09-buyer-network-intake.md) (downstream for buyers)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (source tagging)
- [15 — Compliance](./15-compliance.md) (truthful marketing)
- [18 — Financial / Payout Reconciliation](./18-financial-payout-reconciliation.md) (referral payouts)
- [19 — Weekly Operations Cadence](./19-weekly-operations-cadence.md) (monthly report integration)

## Bottleneck this SOP addresses
**[B9 — No lead-source attribution → marketing spend is blind](./00-bottlenecks.md#b9--no-lead-source-attribution--marketing-spend-is-blind)** — primary fix via UTM taxonomy and monthly report.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version | Claude (on behalf of Brooke) |
