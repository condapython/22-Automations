import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, validatePilotRequest } from '../helpers/validation-engine.mjs';
import { readProjectFile, fileExists } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 10: Form Validation & Anti-Tamper Protection', () => {
  it('T1.10.1: Contact form validates required fields and business email format', () => {
    const valid = validateContactForm({
      name: 'Sarah Connor',
      email: 'sconnor@cyberdyne.com',
      company: 'Cyberdyne Systems',
      offering: 'induseye_rs3',
      message: 'Need 12 units for high-duty entrance gate automation.',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(valid.success, true, 'Valid payload should succeed');

    const invalid = validateContactForm({
      name: 'S',
      email: 'invalid-email-address',
      company: '',
      offering: 'induseye_rs3',
      message: 'short',
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(invalid.success, false, 'Invalid payload should fail');
    assert.ok(invalid.errors.name, 'Should require name >= 2 chars');
    assert.ok(invalid.errors.email, 'Should reject invalid email format');
    assert.ok(invalid.errors.company, 'Should require company name');
    assert.ok(invalid.errors.message, 'Should require message >= 10 chars');
  });

  it('T1.10.2: Pilot request validates phone number format and required date', () => {
    const valid = validatePilotRequest({
      userName: 'Marcus Vance',
      companyName: 'Apex Fleet Logistics',
      email: 'm.vance@apexfleet.ca',
      phone: '+1-416-555-0188',
      requestType: '30-Day Pilot Unit',
      deploymentEnvironment: 'commercial',
      availableDate: '2026-11-20',
      availableTime: '10:00 AM',
      fax_number: '',
      form_timestamp: Date.now() - 2500
    });
    assert.equal(valid.success, true, 'Valid pilot request should pass');

    const invalidPhone = validatePilotRequest({
      userName: 'Marcus Vance',
      companyName: 'Apex Fleet Logistics',
      email: 'm.vance@apexfleet.ca',
      phone: 'not-a-number',
      fax_number: '',
      form_timestamp: Date.now() - 2500
    });
    assert.equal(invalidPhone.success, false, 'Invalid phone must fail');
    assert.ok(invalidPhone.errors.phone, 'Should flag invalid phone');
  });

  it('T1.10.3: Anti-bot honeypot rejects non-empty string submission', () => {
    const botSubmission = validateContactForm({
      name: 'Spam Bot',
      email: 'bot@spammer.org',
      company: 'Spam Corp',
      offering: 'induseye_rs3',
      message: 'Automated spam payload that should be trapped.',
      company_website_url: 'http://spam-link.ru',
      form_timestamp: Date.now() - 5000
    });
    assert.equal(botSubmission.success, false, 'Honeypot population must reject');
    assert.ok(botSubmission.errors.company_website_url, 'Should detect bot in honeypot');
  });

  it('T1.10.4: Anti-tamper dwell time check rejects submissions under 1500ms', () => {
    const fastSubmission = validateContactForm({
      name: 'Speedy Script',
      email: 'script@automation.io',
      company: 'Automated Client',
      offering: 'induseye_rs3',
      message: 'Valid length message submitted within 200ms of form mount.',
      company_website_url: '',
      form_timestamp: Date.now() - 200 // Only 200ms elapsed
    });
    assert.equal(fastSubmission.success, false, 'Dwell time < 1500ms must fail');
    assert.ok(fastSubmission.errors.form_timestamp, 'Should reject sub-1500ms submission');
  });

  it('T1.10.5: Form code in contact and hardware component includes anti-bot honeypot elements', () => {
    const contactPage = readProjectFile('src/app/contact/page.tsx') || '';
    const hwComponent = readProjectFile('src/components/products/HardwareSensingProduct.tsx') || '';
    const hasHoneypot = contactPage.includes('company_website_url') ||
                        contactPage.includes('tabIndex={-1}') ||
                        hwComponent.includes('fax_number') ||
                        hwComponent.includes('tabIndex={-1}') ||
                        contactPage.includes('honeypot') ||
                        fileExists('src/lib/validations/contact.ts');
    assert.ok(hasHoneypot, 'Contact page or validations must implement honeypot trap');
  });
});
