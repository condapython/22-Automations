import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validatePilotRequest, validateContactForm } from '../helpers/validation-engine.mjs';

describe('Tier 2 - Boundary 2: International Phone Formats & Unicode Characters', () => {
  it('T2.2.1: Accepts standard North American phone format (+1-416-555-0199)', () => {
    const res = validatePilotRequest({
      userName: 'John Doe',
      companyName: 'Acme Fleet',
      email: 'john@acmefleet.com',
      phone: '+1-416-555-0199',
      requestType: '30-Day Pilot Unit',
      deploymentEnvironment: 'commercial',
      availableDate: '2026-12-01',
      availableTime: '09:00',
      fax_number: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, true, 'North American format should pass');
  });

  it('T2.2.2: Accepts UK/international phone format (+44 20 7946 0958)', () => {
    const res = validatePilotRequest({
      userName: 'Arthur Dent',
      companyName: 'Sub-Etha Fleet',
      email: 'arthur@fleet.co.uk',
      phone: '+44 20 7946 0958',
      requestType: '30-Day Pilot Unit',
      deploymentEnvironment: 'commercial',
      availableDate: '2026-12-01',
      availableTime: '09:00',
      fax_number: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, true, 'International format should pass');
  });

  it('T2.2.3: Accepts domestic parenthesis phone format (905) 555-2345', () => {
    const res = validatePilotRequest({
      userName: 'Karen Smith',
      companyName: 'Ontario Wash Systems',
      email: 'karen@washsystems.ca',
      phone: '(905) 555-2345',
      requestType: '30-Day Pilot Unit',
      deploymentEnvironment: 'commercial',
      availableDate: '2026-12-01',
      availableTime: '09:00',
      fax_number: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, true, 'Parenthesis format should pass');
  });

  it('T2.2.4: Rejects alphabetic text in phone field', () => {
    const res = validatePilotRequest({
      userName: 'Bad Input',
      companyName: 'Bot Corp',
      email: 'bot@bot.com',
      phone: 'CALL-MY-OFFICE',
      requestType: '30-Day Pilot Unit',
      deploymentEnvironment: 'commercial',
      availableDate: '2026-12-01',
      availableTime: '09:00',
      fax_number: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, false, 'Alphabetic phone must fail');
    assert.ok(res.errors.phone);
  });

  it('T2.2.5: Accepts international Unicode characters in user names and company names', () => {
    const res = validateContactForm({
      name: 'René François Müller',
      company: 'トヨタ自動車株式会社 (Toyota Industrial)',
      email: 'rene.mueller@toyota-industrial.de',
      message: 'Inquiry regarding 24 GHz radar sensor integration for multi-bay wash facilities.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(res.success, true, 'Unicode characters in names/company should be preserved and accepted');
  });
});
