import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 2 - Boundary 6: B2B Pricing Funnel Constraints', () => {
  it('T2.6.1: Zero micro-SaaS monthly rates ($399, $299, $199) in products or homepage', () => {
    const prod = readProjectFile('src/app/products/page.tsx') || '';
    const home = readProjectFile('src/app/page.tsx') || '';
    const combined = prod + home;
    assert.equal(combined.includes('$399'), false, 'Should not contain $399');
    assert.equal(combined.includes('$299'), false, 'Should not contain $299');
    assert.equal(combined.includes('$199'), false, 'Should not contain $199');
  });

  it('T2.6.2: Corporate AI Training cohort entry price is high-ticket B2B ($25k+ or Corporate Cohorts)', () => {
    const prod = readProjectFile('src/app/products/page.tsx') || '';
    assert.ok(
      prod.includes('Corporate Cohorts') || prod.includes('$25,000') || prod.includes('$25k') || prod.includes('25,000') || prod.includes('25k'),
      'AI Training cohort pricing must be high-ticket B2B (Corporate Cohorts or $25k+)'
    );
  });

  it('T2.6.3: Contact budget dropdown options do not contain micro-budget options (<$5,000)', () => {
    const contact = readProjectFile('src/app/contact/page.tsx') || '';
    assert.equal(contact.includes('<$5,000'), false, 'Should not have micro-budget option <$5,000');
    assert.equal(contact.includes('Under $5k'), false, 'Should not have Under $5k option');
  });

  it('T2.6.4: Highest budget tier supports high-ticket multi-bay rollouts ($100,000+)', () => {
    const contact = readProjectFile('src/app/contact/page.tsx') || '';
    assert.ok(
      contact.includes('100,000') || contact.includes('100k') || contact.includes('250,000'),
      'Contact budget selector must include $100k+ tier for high-ticket rollouts'
    );
  });

  it('T2.6.5: Hardware sensing pilot modal specifies volume pricing / RFQ rather than consumer retail buy button', () => {
    const hw = readProjectFile('src/components/products/HardwareSensingProduct.tsx') || '';
    assert.ok(
      hw.includes('Pilot') || hw.includes('RFQ') || hw.includes('Consultation') || hw.includes('Enquiry'),
      'Hardware unit must use pilot / RFQ engagement model'
    );
    assert.equal(
      hw.includes('Add to Cart'),
      false,
      'Hardware unit should not have retail "Add to Cart" consumer button'
    );
  });
});
