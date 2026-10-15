/* Where the contact form goes.
 *
 * HubSpot hosts and stores the submission; the notification routes to INBOX
 * from inside HubSpot, not from this site. HubSpot will sign a BAA, but ours is
 * not signed yet, so the no-PHI notice under the form stays until it is. The
 * secure channel promised at intake is separate either way. */
export const HUBSPOT_PORTAL_ID = '247601150';
export const HUBSPOT_FORM_ID = '73c8de9d-9b4b-4d17-a7be-98838d5a6406';
export const HUBSPOT_REGION = 'na2';

export const INBOX = 'info@averisanalytics.com';
export const PHONE = '+1 (941) 259-7630';

/* Google Appointment Schedule. Opens in a new tab rather than embedding, so no
 * third-party code loads on our pages and the privacy policy stays accurate. */
export const CALENDAR_URL = 'https://calendar.app.google/61XeDKttsafdUdX97';
