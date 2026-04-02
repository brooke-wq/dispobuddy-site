/**
 * deal-follow-up — Cron job to follow up on stale deals
 *
 * DISABLED during audit/stabilization. Do NOT enable until tested.
 *
 * What it does:
 *   1. Fetches deals from JV pipeline that haven't moved in X days
 *   2. Sends follow-up SMS/email to the partner
 *   3. Uses dedup module to prevent duplicate follow-ups per deal per stage
 *
 * Run:        node deal-follow-up.js
 * Dry run:    node deal-follow-up.js --dry-run
 *
 * ENV VARS:
 *   GHL_API_KEY
 *   GHL_LOCATION_ID
 */

const dedup = require('./dedup');

const GHL_BASE = 'https://services.leadconnectorhq.com';
const JV_PIPELINE_ID = 'XbZojO2rHmYtYa8C0yUP';
const CATEGORY = 'deal-follow-up';
const DRY_RUN = process.argv.includes('--dry-run');

// Follow-up timing (days since last activity)
const FOLLOW_UP_DAYS = {
  'first': 3,   // first follow-up after 3 days
  'second': 7,  // second follow-up after 7 days
  'final': 14   // final follow-up after 14 days
};

async function main() {
  var apiKey = process.env.GHL_API_KEY;
  var locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error('Missing GHL_API_KEY or GHL_LOCATION_ID');
    process.exit(1);
  }

  var headers = {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json',
    'Version': '2021-07-28'
  };

  // Load dedup log
  var log = dedup.load();
  var cleaned = dedup.cleanup(log);
  if (cleaned > 0) {
    console.log('Cleaned ' + cleaned + ' old dedup entries');
    dedup.save(null, log);
  }

  console.log('deal-follow-up: Starting' + (DRY_RUN ? ' (DRY RUN)' : ''));
  console.log('Existing dedup entries: ' + dedup.count(log, CATEGORY));

  // TODO: Implement follow-up logic
  // 1. Fetch opportunities from JV pipeline
  // 2. For each opportunity, check days since last activity
  // 3. Determine which follow-up stage applies (first, second, final)
  // 4. For each deal needing follow-up:
  //    a. Check dedup: if (dedup.wasSent(log, CATEGORY, dealId, stage)) continue;
  //    b. Send follow-up SMS to partner via GHL conversations API
  //    c. Mark sent: dedup.markSent(log, CATEGORY, dealId, stage)
  // 5. Save dedup log: dedup.save(null, log)

  console.log('deal-follow-up: Complete');
  console.log('NOTE: Follow-up logic not yet implemented. This is a skeleton.');
}

main().catch(function(err) {
  console.error('deal-follow-up error:', err);
  process.exit(1);
});
