import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';
import { validateContactForm } from '../helpers/validation-engine.mjs';

describe('Tier 3 - Interaction Flow 2: Nav -> AI Training -> Curriculum -> Contact RFQ', () => {
  it('Executes complete user journey for enterprise AI training corporate cohort booking', () => {
    // Step 1: User clicks AI Training in Navbar
    const navbar = readProjectFile('src/components/Navbar.tsx');
    assert.ok(navbar, 'Navbar must exist');
    assert.ok(navbar.includes('AI Training'), 'Navbar must feature AI Training');

    // Step 2: Homepage or Products section displays AI Training
    const homeContent = readProjectFile('src/app/page.tsx') || '';
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    const combined = homeContent + prodContent;
    assert.ok(combined.includes('AI Training'), 'Must feature AI Training showcase');

    // Step 3: Verify curriculum readiness (Edge AI, LLM Agents, Telemetry, Governance)
    assert.ok(
      combined.toLowerCase().includes('edge') || combined.toLowerCase().includes('radar'),
      'Curriculum must include Edge / Radar systems'
    );
    assert.ok(
      combined.toLowerCase().includes('agent') || combined.toLowerCase().includes('model'),
      'Curriculum must include Agents / Models'
    );

    // Step 4: User navigates to Contact form with enterprise intent
    const contactPage = readProjectFile('src/app/contact/page.tsx');
    assert.ok(contactPage, 'Contact page must exist');
    assert.ok(
      contactPage.includes('50k') || contactPage.includes('50,000') || contactPage.includes('100k') || contactPage.includes('100,000') || contactPage.includes('mid-market'),
      'Contact page must offer high-ticket enterprise budget tiers'
    );

    // Step 5: User submits corporate inquiry
    const cohortInquiry = {
      name: 'Dr. Elena Rostova',
      company: 'Magna Advanced Systems',
      email: 'elena.rostova@magna-systems.com',
      budget: '50k-100k',
      offering: 'ai_training',
      message: 'Requesting custom 4-week cohort for 25 systems and firmware engineers covering radar DSP and edge anomaly detection.',
      company_website_url: '',
      form_timestamp: Date.now() - 7500
    };

    const result = validateContactForm(cohortInquiry);
    assert.equal(result.success, true, 'Enterprise AI Training inquiry must pass validation');
  });
});
