import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 2: Complete Removal of POS CRM Software', () => {
  it('T1.2.1: Products page contains no occurrences of "POS CRM"', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.equal(
      content.includes('POS CRM'),
      false,
      'Products catalog should not reference "POS CRM"'
    );
  });

  it('T1.2.2: Footer navigation contains no occurrences of "Auto Spa POS" or "POS & CRM"', () => {
    const content = readProjectFile('src/components/Footer.tsx');
    assert.ok(content, 'src/components/Footer.tsx must exist');
    assert.equal(
      content.includes('Auto Spa POS'),
      false,
      'Footer should not reference "Auto Spa POS"'
    );
    assert.equal(
      content.includes('POS & CRM'),
      false,
      'Footer should not reference "POS & CRM"'
    );
  });

  it('T1.2.3: Navbar navigation links contain no "POS" references', () => {
    const content = readProjectFile('src/components/Navbar.tsx');
    assert.ok(content, 'src/components/Navbar.tsx must exist');
    assert.equal(
      content.includes('POS'),
      false,
      'Navbar should not contain any POS references'
    );
  });

  it('T1.2.4: Homepage contains no POS software marketing copy or cards', () => {
    const content = readProjectFile('src/app/page.tsx');
    assert.ok(content, 'src/app/page.tsx must exist');
    assert.equal(
      content.includes('POS CRM'),
      false,
      'Homepage should not contain POS CRM'
    );
  });

  it('T1.2.5: Product catalog items array contains zero POS category items', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    const hasPosCategory = /category:\s*["'][^"']*POS[^"']*["']/i.test(content);
    assert.equal(
      hasPosCategory,
      false,
      'Products catalog should have no product with category containing POS'
    );
  });
});
