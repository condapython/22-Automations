import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 2 - Boundary 5: Catalog Layout & Grid Balance', () => {
  it('T2.5.1: Products catalog defines exactly two primary enterprise offerings', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.ok(content.includes('IndusEye RS3'), 'Must contain IndusEye RS3');
    assert.ok(content.includes('Enterprise AI Training'), 'Must contain Enterprise AI Training');
    
    // Check that there are no third or fourth product titles in array
    assert.equal(content.includes('AI-GEO Optimizations'), false);
    assert.equal(content.includes('Auto Spa POS'), false);
    assert.equal(content.includes('Email and SMS Marketing'), false);
  });

  it('T2.5.2: Products catalog layout uses 2-column grid for visual balance', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.ok(
      content.includes('grid-cols-1 md:grid-cols-2') || content.includes('md:grid-cols-2'),
      'Products catalog should utilize a balanced 2-column grid'
    );
  });

  it('T2.5.3: Catalog links direct user to valid in-app endpoints (/products/sensing-unit and contact)', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.ok(
      content.includes('/products/sensing-unit'),
      'Hardware card must link to /products/sensing-unit'
    );
    assert.ok(
      content.includes('/contact'),
      'AI Training card must link to /contact'
    );
  });

  it('T2.5.4: Hardware product card emphasizes steam and false-trigger immunity', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    const hasHarshSpecs = content.toLowerCase().includes('steam') ||
                          content.toLowerCase().includes('false trigger') ||
                          content.toLowerCase().includes('radar') ||
                          content.toLowerCase().includes('holding force');
    assert.ok(hasHarshSpecs, 'IndusEye RS3 card must emphasize industrial environmental immunity');
  });

  it('T2.5.5: Catalog header and description reflect high-ticket enterprise automation scope', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.ok(
      content.includes('Enterprise Systems') || content.includes('Hardware') || content.includes('Industrial'),
      'Catalog header must reflect enterprise systems scope'
    );
  });
});
