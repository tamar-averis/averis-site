/* Where the contact form goes.
 *
 * Unresolved by design. Set FORM_ENDPOINT to a first-party endpoint that
 * accepts a JSON POST and forwards to INBOX. Until it is set, the form
 * validates and runs its full state machine but falls through to the error
 * state, which offers the direct address.
 *
 * A third-party relay (Formspree, Getform, Basin) would put a vendor between a
 * provider and Averis. The no-PHI warning stays on the form either way, and
 * counsel should approve the vendor before one is used. */
export const FORM_ENDPOINT = '';

export const INBOX = 'info@averisanalytics.com';
export const PHONE = '+1 (312) 555-0148';
