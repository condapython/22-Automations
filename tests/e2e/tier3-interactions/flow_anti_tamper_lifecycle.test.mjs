import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from '../helpers/validation-engine.mjs';

describe('Tier 3 - Interaction Flow 5: Anti-Tamper Submission Lifecycle Flow', () => {
  it('Simulates full lifecycle of anti-bot trapping and human verification', () => {
    // Stage 1: Form loads on client device
    const formMountedAt = Date.now();

    // Stage 2: Automated scraper/bot discovers form and immediately injects POST payload
    const botSubmission = {
      name: 'Automated Bot',
      company: 'Lead Harvesting Ltd',
      email: 'harvest@leads.cc',
      message: 'Automated spam message delivered in sub-second duration.',
      company_website_url: 'https://spam-farm.biz', // Bot populates hidden field
      form_timestamp: formMountedAt // Zero dwell time elapsed
    };

    const botResult = validateContactForm(botSubmission);
    assert.equal(botResult.success, false, 'Bot submission must be blocked');
    assert.ok(botResult.errors.company_website_url, 'Honeypot trap caught bot');
    assert.ok(botResult.errors.form_timestamp, 'Dwell time check caught bot');

    // Stage 3: Legitimate enterprise buyer reviews product details, fills form over 5 seconds
    const humanSubmittedAt = formMountedAt + 5200; // 5.2 seconds later
    // Simulate time passing by using Date.now() offset:
    const humanSubmission = {
      name: 'Jessica Reynolds',
      company: 'Canadian Logistics Hub',
      email: 'jreynolds@canadianhub.ca',
      budget: '25k-50k',
      offering: 'induseye_rs3',
      message: 'Looking to retrofit 4 commercial fleet entrance bays with 24 GHz FMCW radar sensing units.',
      company_website_url: '', // Real user ignores hidden field
      form_timestamp: Date.now() - 5200 // 5.2 seconds elapsed
    };

    const humanResult = validateContactForm(humanSubmission);
    assert.equal(humanResult.success, true, 'Human submission must succeed');
    assert.equal(Object.keys(humanResult.errors).length, 0);
  });
});
