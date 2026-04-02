/**
 * notify-buyers — Cron job to notify matched buyers about new deals
 *
 * DISABLED during audit/stabilization. Do NOT enable until tested.
 *
 * What it does:
 *   1. Fetches recent deals from GHL pipeline (new/unmatched)
 *   2. For each deal, finds buyers whose buy box matches
 *   3. Sends SMS/email notification to matched buyers
 *   4. Uses dedup module to prevent duplicate sends
 *
 * Run:        node notify-buyers.js
 * Dry run:    node notify-buyers.js --dry-run
 *
 * ENV VARS:
 *   GHL_API_KEY
 *   GHL_LOCATION_ID
 */

const dedup = require('./dedup');

const GHL_BASE = 'https://services.leadconnectorhq.com';
const JV_PIPELINE_ID = 'XbZojO2rHmYtYa8C0yUP';
const CATEGORY = 'notify-buyers';
const DRY_RUN = process.argv.includes('--dry-run');

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

  console.log('notify-buyers: Starting' + (DRY_RUN ? ' (DRY RUN)' : ''));
  console.log('Existing dedup entries: ' + dedup.count(log, CATEGORY));

  // TODO: Implement buyer matching logic
  // 1. Fetch opportunities from JV pipeline
  // 2. For each opportunity, extract deal criteria (type, city, state, price)
  // 3. Fetch buyers with matching buy box (target states/cities, deal structures, price range)
  // 4. For each matched buyer:
  //    a. Check dedup: if (dedup.wasSent(log, CATEGORY, dealId, buyerContactId)) continue;
  //    b. Send SMS notification via GHL conversations API
  //    c. Mark sent: dedup.markSent(log, CATEGORY, dealId, buyerContactId)
  // 5. Save dedup log: dedup.save(null, log)

  console.log('notify-buyers: Complete');
  console.log('NOTE: Matching logic not yet implemented. This is a skeleton.');
}

main().catch(function(err) {
  console.error('notify-buyers error:', err);
  process.exit(1);
});
