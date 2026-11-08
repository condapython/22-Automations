import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 3 - Interaction Flow 3: Products Catalog 2-Column Grid -> Offering Detail -> RFQ', () => {
  it('Verifies complete catalog journey and dual-offering focus', () => {
    const catalog = readProjectFile('src/app/products/page.tsx');
    assert.ok(catalog, 'Products catalog page must exist');

    // 1. Exactly 2 enterprise offerings
    assert.ok(catalog.includes('IndusEye RS3'), 'Must contain IndusEye RS3');
    assert.ok(catalog.includes('Enterprise AI Training'), 'Must contain Enterprise AI Training');

    // 2. No legacy offerings
    assert.equal(catalog.includes('AI-GEO Optimizations'), false);
    assert.equal(catalog.includes('Auto Spa POS'), false);
    assert.equal(catalog.includes('Email and SMS Marketing'), false);

    // 3. Balanced 2-column layout
    assert.ok(
      catalog.includes('grid-cols-1 md:grid-cols-2') || catalog.includes('md:grid-cols-2'),
      'Catalog must use a balanced 2-column grid layout'
    );

    // 4. IndusEye RS3 links to sensing-unit dedicated route
    assert.ok(catalog.includes('/products/sensing-unit'), 'Card must link to /products/sensing-unit');

    // 5. AI Training links to contact or training section
    assert.ok(catalog.includes('/contact'), 'AI Training card must link to /contact');
  });
});
