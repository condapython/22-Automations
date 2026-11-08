import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';
import { validateContactForm } from '../helpers/validation-engine.mjs';

describe('Tier 4 - Scenario 2: Enterprise AI Training Corporate Cohort Booking', () => {
  it('Simulates corporate VP of Engineering booking a 30-engineer technical enablement cohort', () => {
    // 1. VP evaluates AI Training offerings on products page & homepage
    const pageContent = readProjectFile('src/app/page.tsx') || '';
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    const combined = pageContent + prodContent;

    // Verify presence of curriculum elements
    assert.ok(combined.includes('AI Training'), 'Must feature AI Training program');
    assert.ok(
      combined.toLowerCase().includes('edge') || combined.toLowerCase().includes('radar'),
      'Must cover edge AI & radar systems'
    );
    assert.ok(
      combined.toLowerCase().includes('agent') || combined.toLowerCase().includes('llm'),
      'Must cover LLM agent systems'
    );

    // 2. VP verifies corporate cohort pricing
    assert.ok(
      combined.includes('Corporate Cohorts') || combined.includes('$25k') || combined.includes('$25,000') || combined.includes('25,000'),
      'Must display enterprise cohort pricing for corporate cohorts'
    );

    // 3. VP submits formal corporate cohort inquiry
    const cohortBooking = {
      name: 'Victoria Hawthorne',
      company: 'Celestica Aerospace & Industrial',
      email: 'vhawthorne@celestica.com',
      budget: '50k-100k',
      offering: 'ai_training',
      message: 'Booking a dedicated corporate cohort for 30 embedded software and ML engineers. Need custom modules focused on edge radar signal fusion and real-time telemetry anomaly detection.',
      company_website_url: '',
      form_timestamp: Date.now() - 10000 // 10 seconds dwell time
    };

    const bookingResult = validateContactForm(cohortBooking);
    assert.equal(bookingResult.success, true, 'Corporate cohort booking must pass validation');
  });
});
