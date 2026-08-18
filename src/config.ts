/* Where the contact form goes.
 *
 * Formspree relays submissions to INBOX. That puts a third party between a
 * provider and Averis, which is acceptable only because the form collects no
 * PHI and says so; the secure channel promised at intake is separate. Formspree
 * will not sign a BAA, so do not add a free-text field here without revisiting
 * the vendor. Clearing FORM_ENDPOINT returns the form to its error state, which
 * offers the direct address. */
export const FORM_ENDPOINT = 'https://formspree.io/f/xvkpvrdr';

export const INBOX = 'info@averisanalytics.com';
export const PHONE = '+1 (312) 555-0148';
