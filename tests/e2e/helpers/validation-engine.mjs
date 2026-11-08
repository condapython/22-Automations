/**
 * Independent Validation Oracle implementing the contract defined in PROJECT.md.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^(\+?[0-9]{1,4}[\s.-]?)?(\(?\d{2,4}\)?[\s.-]?)?[0-9]{3,4}[\s.-]?[0-9]{3,6}$/;

export function validateContactForm(payload) {
  const errors = {};

  if (!payload || typeof payload !== 'object') {
    return { success: false, errors: { form: 'Invalid payload' } };
  }

  // Name check
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  if (name.length < 2) errors.name = 'Name must be at least 2 characters';
  if (name.length > 100) errors.name = 'Name exceeds 100 characters';

  // Email check
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  if (!email || !EMAIL_REGEX.test(email)) errors.email = 'Valid business email required';

  // Company check
  const company = typeof payload.company === 'string' ? payload.company.trim() : '';
  if (company.length < 2) errors.company = 'Company name is required';
  if (company.length > 120) errors.company = 'Company name exceeds 120 characters';

  // Message check
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (message.length < 10) errors.message = 'Message must be at least 10 characters';
  if (message.length > 3000) errors.message = 'Message exceeds 3000 characters';

  // Anti-bot honeypot check
  const honeypot = payload.company_website_url;
  if (honeypot !== undefined && honeypot !== null && String(honeypot).length > 0) {
    errors.company_website_url = 'Bot detected: honeypot field must be empty';
  }

  // Anti-tamper dwell time check
  if (payload.form_timestamp !== undefined) {
    const elapsed = Date.now() - Number(payload.form_timestamp);
    if (elapsed < 1500) {
      errors.form_timestamp = 'Submission completed too fast. Automated submission rejected.';
    } else if (elapsed < 0) {
      errors.form_timestamp = 'Clock skew / invalid future timestamp rejected.';
    }
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
}

export function validatePilotRequest(payload) {
  const errors = {};

  if (!payload || typeof payload !== 'object') {
    return { success: false, errors: { form: 'Invalid payload' } };
  }

  // User name check
  const userName = typeof payload.userName === 'string' ? payload.userName.trim() : '';
  if (userName.length < 2) errors.userName = 'Contact person is required';
  if (userName.length > 100) errors.userName = 'Contact person name exceeds 100 characters';

  // Company name check
  const companyName = typeof payload.companyName === 'string' ? payload.companyName.trim() : '';
  if (companyName.length < 2) errors.companyName = 'Company name is required';
  if (companyName.length > 120) errors.companyName = 'Company name exceeds 120 characters';

  // Email check
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  if (!email || !EMAIL_REGEX.test(email)) errors.email = 'Valid business email required';

  // Phone check
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  if (!phone || !PHONE_REGEX.test(phone)) errors.phone = 'Valid telephone number required';

  // Honeypot check
  const honeypot = payload.fax_number;
  if (honeypot !== undefined && honeypot !== null && String(honeypot).length > 0) {
    errors.fax_number = 'Bot detected: honeypot field must be empty';
  }

  // Anti-tamper dwell time check
  if (payload.form_timestamp !== undefined) {
    const elapsed = Date.now() - Number(payload.form_timestamp);
    if (elapsed < 1500) {
      errors.form_timestamp = 'Submission completed too quickly. Automated submission rejected.';
    } else if (elapsed < 0) {
      errors.form_timestamp = 'Invalid future timestamp rejected.';
    }
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  };
}
