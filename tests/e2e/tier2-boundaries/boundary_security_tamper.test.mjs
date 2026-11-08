import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, validatePilotRequest } from '../helpers/validation-engine.mjs';

describe('Tier 2 - Boundary 3: Anti-Bot Honeypot Trapping & Anti-Tamper Dwell Time', () => {
  it('T2.3.1: Honeypot field with empty string passes validation', () => {
    const res = validateContactForm({
      name: 'Valid Human',
      company: 'Real Company Ltd',
      email: 'human@realcompany.com',
      message: 'Legitimate corporate inquiry with empty honeypot field.',
      company_website_url: '',
      form_timestamp: Date.now() - 4000
    });
    assert.equal(res.success, true);
  });

  it('T2.3.2: Honeypot field populated with whitespace string is detected and rejected', () => {
    const res = validateContactForm({
      name: 'Sneaky Bot',
      company: 'Bot Enterprise',
      email: 'bot@bot.org',
      message: 'Legitimate-looking message but honeypot has whitespace.',
      company_website_url: '   ',
      form_timestamp: Date.now() - 4000
    });
    assert.equal(res.success, false);
    assert.ok(res.errors.company_website_url, 'Whitespace in honeypot must be rejected');
  });

  it('T2.3.3: Honeypot field in Pilot Request populated with fax number string is rejected', () => {
    const res = validatePilotRequest({
      userName: 'Pilot Bot',
      companyName: 'Bot Inc',
      email: 'pilot@bot.org',
      phone: '+1-555-555-5555',
      requestType: '30-Day Pilot Unit',
      deploymentEnvironment: 'commercial',
      availableDate: '2026-12-01',
      availableTime: '10:00',
      fax_number: '1-800-SPAM-FAX',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, false);
    assert.ok(res.errors.fax_number, 'Honeypot fax_number must trigger rejection');
  });

  it('T2.3.4: Dwell time boundary: 0ms fails, 1499ms fails, 1500ms passes', () => {
    const now = Date.now();

    // 0ms (instant bot POST)
    const instant = validateContactForm({
      name: 'Instant Poster',
      company: 'Automation Bot',
      email: 'bot@instant.com',
      message: 'This message was posted in 0 milliseconds.',
      company_website_url: '',
      form_timestamp: now
    });
    assert.equal(instant.success, false, '0ms dwell time must fail');

    // 1499ms (1ms below 1.5s threshold)
    const sub1500 = validateContactForm({
      name: 'Sub-Threshold Poster',
      company: 'Fast Script',
      email: 'fast@script.com',
      message: 'This message was posted in 1499 milliseconds.',
      company_website_url: '',
      form_timestamp: now - 1499
    });
    assert.equal(sub1500.success, false, '1499ms dwell time must fail');

    // 1500ms (exact threshold boundary)
    const threshold1500 = validateContactForm({
      name: 'Exact Threshold',
      company: 'Precise Timing Inc',
      email: 'user@precise.com',
      message: 'This message was posted in exactly 1500 milliseconds.',
      company_website_url: '',
      form_timestamp: now - 1500
    });
    assert.equal(threshold1500.success, true, '1500ms dwell time must pass');
  });

  it('T2.3.5: Future timestamp (clock tampering / negative elapsed time) is rejected', () => {
    const now = Date.now();
    const futureTamper = validateContactForm({
      name: 'Time Traveler',
      company: 'Temporal Tamper LLC',
      email: 'tamper@future.com',
      message: 'Form timestamp is set 10 minutes into the future.',
      company_website_url: '',
      form_timestamp: now + 600000 // 10 minutes into future
    });
    assert.equal(futureTamper.success, false, 'Future timestamp must be rejected');
    assert.ok(futureTamper.errors.form_timestamp);
  });
});
