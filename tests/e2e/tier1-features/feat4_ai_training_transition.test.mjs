import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 4: Full Transition from AI Workflows to AI Training', () => {
  it('T1.4.1: Root layout metadata does not contain "AI Workflows"', () => {
    const content = readProjectFile('src/app/layout.tsx');
    assert.ok(content, 'src/app/layout.tsx must exist');
    assert.equal(
      content.toLowerCase().includes('ai workflows'),
      false,
      'Layout metadata should not reference "AI Workflows"'
    );
  });

  it('T1.4.2: Homepage does not contain "AI Workflows" and contains "AI Training"', () => {
    const content = readProjectFile('src/app/page.tsx');
    assert.ok(content, 'src/app/page.tsx must exist');
    assert.equal(
      content.toLowerCase().includes('ai workflows'),
      false,
      'Homepage should not reference "AI Workflows"'
    );
    assert.equal(
      content.includes('AI Training'),
      true,
      'Homepage must actively feature "AI Training"'
    );
  });

  it('T1.4.3: Products catalog contains "Enterprise AI Training" and not "AI Workflows"', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.equal(
      content.toLowerCase().includes('ai workflows'),
      false,
      'Products catalog should not reference "AI Workflows"'
    );
    assert.equal(
      content.includes('AI Training'),
      true,
      'Products catalog must feature "Enterprise AI Training"'
    );
  });

  it('T1.4.4: Sensing unit page does not reference "AI Workflows"', () => {
    const content = readProjectFile('src/app/products/sensing-unit/page.tsx');
    assert.ok(content, 'src/app/products/sensing-unit/page.tsx must exist');
    assert.equal(
      content.toLowerCase().includes('ai workflows'),
      false,
      'Sensing unit page should not reference "AI Workflows"'
    );
  });

  it('T1.4.5: Contact page dropdown options and copy do not contain "AI Workflows"', () => {
    const content = readProjectFile('src/app/contact/page.tsx');
    assert.ok(content, 'src/app/contact/page.tsx must exist');
    assert.equal(
      content.toLowerCase().includes('ai workflows'),
      false,
      'Contact page should not reference "AI Workflows"'
    );
  });
});
