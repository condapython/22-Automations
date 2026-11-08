import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 8: $1.1M B2B Value Proposition & High-Ticket Pricing', () => {
  it('T1.8.1: Micro-SaaS pricing ($399/month) is eliminated from products catalog', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.equal(
      content.includes('$399'),
      false,
      'Products page must not contain retail $399/month pricing'
    );
  });

  it('T1.8.2: Corporate AI Training specifies high-ticket cohort pricing ($25k+ or Corporate Cohorts)', () => {
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    const pageContent = readProjectFile('src/app/page.tsx') || '';
    const combined = prodContent + pageContent;
    assert.ok(
      combined.includes('Corporate Cohorts') || combined.includes('$25k') || combined.includes('$25,000') || combined.includes('25,000'),
      'AI Training must specify high-ticket cohort pricing ($25k+ or Corporate Cohorts)'
    );
  });

  it('T1.8.3: IndusEye RS3 specifies Pilot Evaluation / Volume RFQ pricing model', () => {
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    assert.ok(
      prodContent.toLowerCase().includes('pilot') || prodContent.toLowerCase().includes('rfq') || prodContent.toLowerCase().includes('evaluation'),
      'IndusEye RS3 must offer Evaluation Pilot or Volume RFQ pricing'
    );
  });

  it('T1.8.4: Contact form budget dropdown includes enterprise high-ticket tiers ($25k-$50k, $50k-$100k, $100k+)', () => {
    const contactContent = readProjectFile('src/app/contact/page.tsx');
    assert.ok(contactContent, 'src/app/contact/page.tsx must exist');
    assert.ok(
      contactContent.includes('25,000') || contactContent.includes('25k') || contactContent.includes('50,000'),
      'Contact form budget must include enterprise tiers ($25,000+)'
    );
    assert.ok(
      contactContent.includes('100,000') || contactContent.includes('100k'),
      'Contact form budget must include enterprise tiers ($100,000+)'
    );
  });

  it('T1.8.5: Contact form project selector includes B2B offerings (Pilot, Rollout, AI Training Cohort)', () => {
    const contactContent = readProjectFile('src/app/contact/page.tsx');
    assert.ok(contactContent, 'src/app/contact/page.tsx must exist');
    assert.ok(
      contactContent.toLowerCase().includes('pilot') || contactContent.toLowerCase().includes('cohort') || contactContent.toLowerCase().includes('induseye'),
      'Contact form project selector must feature enterprise B2B options'
    );
  });
});
