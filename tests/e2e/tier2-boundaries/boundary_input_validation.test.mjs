import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from '../helpers/validation-engine.mjs';

describe('Tier 2 - Boundary 1: Form Input Boundaries & String Constraints', () => {
  it('T2.1.1: Rejects empty string on mandatory fields (name, company, email, message)', () => {
    const res = validateContactForm({
      name: '',
      company: '',
      email: '',
      message: '',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, false);
    assert.ok(res.errors.name, 'Empty name must fail');
    assert.ok(res.errors.company, 'Empty company must fail');
    assert.ok(res.errors.email, 'Empty email must fail');
    assert.ok(res.errors.message, 'Empty message must fail');
  });

  it('T2.1.2: Minimum name length boundary: 1 char fails, 2 chars passes', () => {
    const oneChar = validateContactForm({
      name: 'A',
      company: 'Valid Corp',
      email: 'a@corp.com',
      message: 'Valid length message for testing minimum bounds.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(oneChar.success, false, '1-character name must be rejected');
    assert.ok(oneChar.errors.name);

    const twoChars = validateContactForm({
      name: 'Al',
      company: 'Valid Corp',
      email: 'al@corp.com',
      message: 'Valid length message for testing minimum bounds.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(twoChars.success, true, '2-character name must be accepted');
  });

  it('T2.1.3: Maximum name length boundary: 100 chars passes, 101 chars fails', () => {
    const valid100 = 'A'.repeat(100);
    const res100 = validateContactForm({
      name: valid100,
      company: 'Valid Corp',
      email: 'tester@corp.com',
      message: 'Valid length message for testing name boundary.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res100.success, true, '100-character name must pass');

    const invalid101 = 'A'.repeat(101);
    const res101 = validateContactForm({
      name: invalid101,
      company: 'Valid Corp',
      email: 'tester@corp.com',
      message: 'Valid length message for testing name boundary.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res101.success, false, '101-character name must fail');
    assert.ok(res101.errors.name);
  });

  it('T2.1.4: Message length boundary: 9 chars fails, 10 chars passes, 3000 passes, 3001 fails', () => {
    const nineChars = validateContactForm({
      name: 'Engineer Dave',
      company: 'Robotics Inc',
      email: 'dave@robotics.com',
      message: '123456789', // 9 chars
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(nineChars.success, false, '9-character message must fail');
    assert.ok(nineChars.errors.message);

    const tenChars = validateContactForm({
      name: 'Engineer Dave',
      company: 'Robotics Inc',
      email: 'dave@robotics.com',
      message: '1234567890', // 10 chars
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(tenChars.success, true, '10-character message must pass');

    const msg3000 = 'M'.repeat(3000);
    const res3000 = validateContactForm({
      name: 'Engineer Dave',
      company: 'Robotics Inc',
      email: 'dave@robotics.com',
      message: msg3000,
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res3000.success, true, '3000-character message must pass');

    const msg3001 = 'M'.repeat(3001);
    const res3001 = validateContactForm({
      name: 'Engineer Dave',
      company: 'Robotics Inc',
      email: 'dave@robotics.com',
      message: msg3001,
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res3001.success, false, '3001-character message must fail');
    assert.ok(res3001.errors.message);
  });

  it('T2.1.5: Email format boundaries: missing @, missing domain, trailing spaces', () => {
    const badEmails = [
      'plainaddress',
      '@missingusername.com',
      'user@.com',
      'user@com',
      'user name@domain.com',
      'user@domain..com'
    ];

    for (const bad of badEmails) {
      const res = validateContactForm({
        name: 'Tester',
        company: 'Tester Corp',
        email: bad,
        message: 'This is a valid test message for email validation testing.',
        company_website_url: '',
        form_timestamp: Date.now() - 3000
      });
      assert.equal(res.success, false, `Should reject invalid email: ${bad}`);
    }

    // Email with leading/trailing spaces should be trimmed and validated
    const trimmedRes = validateContactForm({
      name: 'Tester',
      company: 'Tester Corp',
      email: '  test.user@company.com  ',
      message: 'This is a valid test message for email validation testing.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(trimmedRes.success, true, 'Trimmed valid email should pass');
  });
});
