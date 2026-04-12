# 09 — Buyer Network Intake

## Purpose
Our matching engine is only as good as the buyer data feeding it. This SOP defines the canonical buybox fields we capture per asset class, the intake script we use on every buyer call, and how the data lands in GHL so [SOP 05](./05-buyer-matching-outreach.md) can actually query it.

## Owner / Roles
- **Accountable:** Brooke (until a dedicated buyer-network manager is hired)
- **Responsible (call + data entry):** Brooke or Dispo VA (trained)
- **Consulted:** Dispo VA on repeat buyers

## Trigger
- A new buyer opts in (website form, referral, Facebook group, conference)
- An existing buyer wants to update their buybox
- A partner who closes deals with us expresses interest in buying too (tag `partner_and_buyer`)

## Inputs required
- Buyer's direct contact info (name, phone, email)
- 20-minute call slot (first-time intake) or 5-minute text exchange (update)
- GHL access (to create the contact and populate custom fields)

## Tools & systems used
- GHL → Contacts, Custom Fields, Tags, Notes
- Phone (primary — intake is a conversation, not a form)
- Optional Calendly for buyer booking

## Canonical buybox by asset class

Every buyer must be assigned to **one primary asset class** (they can have secondary classes). Each class has its own required fields on top of the universal fields below.

### Universal fields (every buyer, every asset class)

Map directly to the custom field IDs in `netlify/functions/buyer-demand.js`:

| Field (GHL name) | Field ID (buyer-demand.js) | Type | Example |
|---|---|---|---|
| Contact Role | `agG4HMPB5wzsZXiRxfmR` | select | `buyer` |
| Target States | `aewzY7iEvZh12JhMVi7E` | multi | `AZ, TX, FL` |
| Target Cities | `DbY7dHIXk8YowpaWrxYj` | text | `Phoenix, Tempe, Mesa` |
| Deal Structures | `0L0ycmmsEjy6OPDL0rgq` | multi | `cash, sub-to` |
| Property Type | `HGC6xWLpSqoAQPZr0uwY` | multi | `SFR, 2-4 multi` |
| Max Price | `BcxuopmSK4wA3Z3NyanD` | number | `350000` |
| Max Entry (sub-to/SF) | `SZmNHA3BQva2AZg00ZNP` | number | `50000` |
| Min ARV | `KKGEfgdaqu98yrZYkmoO` | number | `180000` |
| Exit Strategies | `98i8EKc3OWYSqS4Qb1nP` | multi | `flip, hold` |
| Buyer Type | `95PgdlIYfXYcMymnjsIv` | select | `individual_investor` |
| Purchase Timeline | (key: `purchase_timeline`) | select | `30_days` |
| Primary Asset Class | **new — create in GHL** | select | `sfr_flip` |
| Secondary Asset Classes | **new — create in GHL** | multi | `sfr_hold, small_multi` |

> **Note to Brooke:** "Primary Asset Class" and "Secondary Asset Classes" are new fields we need to create in GHL. Add them to the buyer contact type, configure the options below, and update `buyer-demand.js` to read them.

### Asset class rubrics

Each class below lists **additional required fields** on top of the universal ones.

#### SFR flip (`sfr_flip`)
Additional required fields:
- **Max repair budget** (number) — how much rehab capital they have per deal
- **Min post-rehab ROI %** (number) — e.g., 15%
- **Target neighborhood class** (multi-select: A / B / C / D)
- **Flip timeline** (select: ≤ 90 days / 90-180 / ≥ 180)
- **Contractor availability** (select: in-house crew / subcontractor / flexible)

Script questions:
- "What's the most you'll put into rehab on one deal?"
- "What post-rehab ROI do you need to pull the trigger?"
- "A / B / C / D neighborhoods — where do you play?"
- "How fast do you typically flip — under 3 months, 3-6, 6+?"

#### SFR buy-and-hold (`sfr_hold`)
Additional required fields:
- **Min rent** (number) — monthly
- **Min cap rate** (number) — e.g., 7%
- **Min DSCR** (number) — e.g., 1.2
- **Property condition tolerance** (select: turnkey only / light cosmetic OK / rehab OK)
- **Financing** (select: cash / DSCR loan / conventional / portfolio)

Script questions:
- "What's your minimum monthly rent per door?"
- "What cap rate floor are you working with?"
- "Are you funding with cash or a DSCR loan?"
- "Turnkey only or can you handle a light rehab?"

#### Small multi 2-4 units (`small_multi`)
Additional required fields:
- **Unit count preference** (select: 2 / 3 / 4 / any)
- **Min cap rate** (number)
- **Min cash-on-cash** (number)
- **Value-add appetite** (select: stabilized only / light reposition / heavy lift)
- **Unit mix preference** (text)

Script questions:
- "Prefer duplex, triplex, or 4-plex?"
- "What's your cap rate floor?"
- "Open to value-add deals or strictly stabilized?"

#### Large multi 5+ units (`large_multi`)
Additional required fields:
- **Min cap rate** (number)
- **Target IRR %** (number)
- **Structure** (select: direct / JV GP-LP / syndication)
- **Check size range** (number min/max)
- **Market class** (multi: A / B / C secondary / C tertiary)

Script questions:
- "Direct acquisitions or syndicating LP capital?"
- "Target IRR on exit?"
- "Minimum unit count to even look?"

#### Land (`land`)
Additional required fields:
- **Zoning type** (multi: residential / commercial / agricultural / industrial / mixed)
- **Acreage range** (number min/max)
- **Entitlement status** (select: raw / entitled / pad-ready)
- **Utility access required** (select: all in / partial OK / none OK)

Script questions:
- "Raw land only or entitled?"
- "What zoning are you hunting?"
- "Utility requirements?"

#### Mobile home / MHP (`mobile_home`)
Additional required fields:
- **Lot count** (number min/max)
- **Park-owned homes tolerance** (select: none / some OK / all OK)
- **Utilities** (multi: city water / city sewer / well / septic)
- **Location** (select: city / suburb / rural)

Script questions:
- "Single mobile, park, or both?"
- "How do you feel about POHs (park-owned homes)?"
- "Utility infrastructure — willing to do well/septic?"

#### Commercial (`commercial`)
Additional required fields:
- **Sub-type** (multi: retail / office / industrial / mixed-use / special purpose)
- **Min cap rate** (number)
- **Lease term preference** (select: triple-net / absolute NNN / gross / any)
- **Tenant credit preference** (select: investment grade / local / any)

Script questions:
- "What asset sub-types are you focused on?"
- "NNN only or gross leases OK?"

#### Sub-to buyer (`sub_to`)
Additional required fields:
- **Max UPB** (number) — max existing loan balance willing to assume
- **Min equity required** (number) — min seller equity after assumption
- **Down payment available** (number) — their cash to close
- **Loan type preference** (multi: conventional / FHA / VA / portfolio)
- **DOS (due-on-sale) risk tolerance** (select: low / medium / high)

Script questions:
- "What's your max UPB — the biggest loan you'll take over?"
- "How much cash do you have to close?"
- "FHA / VA loans OK or conventional only?"

#### Novation (`novation`)
Additional required fields:
- **Max entry fee** (number) — what they'll pay us
- **Retail marketing budget** (number)
- **Target markets for retail sale** (multi — states)
- **Agent relationship** (select: in-house / outside / both)

Script questions:
- "Max entry you'll pay on a novation?"
- "How do you handle retail listings — your own agent or outside?"

#### Seller finance (`seller_finance`)
Additional required fields:
- **Max loan amount** (number)
- **Max interest rate** (number)
- **Balloon tolerance** (select: none / 3+ years / 5+ years / flexible)
- **Down payment available** (number)

Script questions:
- "What's your interest rate ceiling on a seller-carry?"
- "Balloon OK or strictly amortizing?"

## Step-by-step intake procedure

### Step 1 — Confirm consent and schedule the call
When a new buyer opts in:

1. Send a welcome SMS within 2 hours:
   ```
   Hey {{contact.first_name}} — [your_name] with Dispo Buddy. Thanks for reaching out. Want to hop on a 15-20 min call so I can learn your buybox and start sending you deals that fit? Here's my calendar: [Calendly link]. Or text me a time that works.
   ```
2. Schedule the call.
3. Pre-fill what you know: name, phone, email, any info from how they found us.

### Step 2 — The intake call (15–20 minutes)

**Part 1 — Warm-up (2 min)**
- "Tell me about your real estate business. What's your primary play?"
- Listen for: asset type, investment approach, volume.

**Part 2 — Asset class clarification (3 min)**
- "So your main thing is [what they said]. Anything else you buy?"
- Assign primary + secondary asset classes.

**Part 3 — Universal fields (5 min)**
Walk through the universal fields above. Use open questions:
- "What states and cities are you active in?"
- "What deal structures do you look at — cash, sub-to, seller finance, novation?"
- "What's your max purchase price — the ceiling you won't go above?"
- "What ARV are you looking for, minimum?"
- "Buying for yourself or with capital partners?"
- "Timeline — can you close in 30, 60, 90 days?"

**Part 4 — Asset class specifics (5 min)**
Use the asset class rubric above. Ask the script questions for their primary class. If they have secondary classes, ask the top 2 questions for each.

**Part 5 — Relationship close (2 min)**
- "A few expectations so we work well:
  - I'll text or email you deals that match your buybox. Not spam. If you don't like the frequency, tell me.
  - If you see a deal you're interested in, reply fast — we move quickly.
  - If your buybox changes, tell me so I don't waste your time."
- "Last thing: any buyers or partners you think I should connect with? Referrals get VIP access."

**Part 6 — Log the call**
Immediately after the call, while it's fresh:
1. Open the GHL contact.
2. Fill every required custom field (universal + asset-specific).
3. Apply tags:
   - `buyer`
   - `asset_[primary_class]` (e.g., `asset_sfr_flip`)
   - One `source_*` tag
   - `active_buyer` (set expiration date = today + 90 days)
4. Write the call note:
   ```
   INTAKE CALL — [YYYY-MM-DD]
   Duration: [N] min
   Primary asset: [class]
   Secondary: [classes]
   Key highlights: [what stood out]
   Next touch: [date / action]
   Referrals mentioned: [names if any]
   ```

### Step 3 — Send a recap + confirmation
Within 1 hour of the call:

```
Hey {{contact.first_name}} — great talking. To recap, I've got you in as:

- Primary: [asset class]
- Markets: [states/cities]
- Deal structures: [list]
- Max price: $[X]
- Min ARV: $[X]
- [3-4 key asset-specific fields]

Is that right? Text me if anything's off. Otherwise I'll start sending matched deals as they come in.
```

This gives the buyer one last chance to correct anything + locks in the data.

### Step 4 — Add to matching rotation
1. The smart lists in [SOP 05](./05-buyer-matching-outreach.md) will automatically pick them up once custom fields are populated.
2. Send them the *most recent* matched deal as a "here's an example of what you'll get" touch within 48 hours.

## Templates & scripts

### Intro SMS
See Step 1.

### Recap SMS
See Step 3.

### Buybox update SMS (existing buyer)
```
Hey {{contact.first_name}} — quick buybox check-in. Anything changed on your end? New markets, different price range, different deal types? Shoot me the updates so I'm sending you the right deals.
```

### Frequency complaint reply
```
Heard. I'll dial it back. I'll only send deals that are a direct hit on your buybox from now on. If you want to pause entirely just reply PAUSE.
```

## SLAs / quality standards
- **Intake call booked within 48 hours** of buyer opt-in
- **All required custom fields filled** on every new buyer — 100%
- **Recap message sent within 1 hour** of the call
- **First matched deal sent within 48 hours** of intake
- **Call note written** on every intake — no silent intakes

## Escalation / edge cases
- **Buyer is vague on buybox** ("I'll look at anything good") — push them. We need real numbers or we can't match. If they won't give numbers after prompting, tag `vague_buybox` and reduce outreach frequency.
- **Buyer wants to buy in a state we don't serve** — take their info, tag `out_of_market`, and flag Brooke. We may be able to grow into their market.
- **Buyer wants exclusivity / first look** — politely no. We're not an exclusive buyer. Offer top-3 status if they're VIP.
- **Buyer pushes back on the 50/50 split (they want our margin)** — they're asking us to be a free lead service. No. Escalate.
- **Buyer tries to go around us to the partner** — Brooke + [SOP 15](./15-compliance.md). That's a JV agreement breach on their side if we caught them.

## Related SOPs
- [05 — Buyer Matching & Outreach](./05-buyer-matching-outreach.md) (the matching engine this SOP feeds)
- [10 — Buyer Network Hygiene](./10-buyer-network-hygiene.md) (keeping the data fresh)
- [12 — GHL CRM Hygiene](./12-ghl-crm-hygiene.md) (tags + custom fields)

## Bottleneck this SOP addresses
**[B2 — Deal → buyer matching is manual and memory-based](./00-bottlenecks.md#b2--deal--buyer-matching-is-manual-and-memory-based)** and **[B3 — Buybox is not collected consistently across asset types](./00-bottlenecks.md#b3--buybox-is-not-collected-consistently-across-asset-types)** — both primary fixes.

## Changelog
| Date | What changed | Who |
|---|---|---|
| 2026-04-11 | Initial version with canonical buybox per asset class | Claude (on behalf of Brooke) |
