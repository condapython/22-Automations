import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 5: Primary Offerings Navigation', () => {
  it('T1.5.1: Navbar includes direct link to IndusEye RS3 (/products/sensing-unit)', () => {
    const content = readProjectFile('src/components/Navbar.tsx');
    assert.ok(content, 'src/components/Navbar.tsx must exist');
    assert.ok(
      content.includes('IndusEye RS3'),
      'Navbar must contain IndusEye RS3 label'
    );
    assert.ok(
      content.includes('/products/sensing-unit'),
      'Navbar must contain link to /products/sensing-unit'
    );
  });

  it('T1.5.2: Navbar includes direct link to AI Training', () => {
    const content = readProjectFile('src/components/Navbar.tsx');
    assert.ok(content, 'src/components/Navbar.tsx must exist');
    assert.ok(
      content.includes('AI Training'),
      'Navbar must contain AI Training navigation link'
    );
  });

  it('T1.5.3: Footer contains dedicated link to IndusEye RS3', () => {
    const content = readProjectFile('src/components/Footer.tsx');
    assert.ok(content, 'src/components/Footer.tsx must exist');
    assert.ok(
      content.includes('IndusEye RS3') || content.includes('/products/sensing-unit'),
      'Footer must provide link to IndusEye RS3'
    );
  });

  it('T1.5.4: Footer contains dedicated link to Enterprise AI Training', () => {
    const content = readProjectFile('src/components/Footer.tsx');
    assert.ok(content, 'src/components/Footer.tsx must exist');
    assert.ok(
      content.includes('AI Training'),
      'Footer must provide link to AI Training'
    );
  });

  it('T1.5.5: Navbar navigation contains active route links to Products, About, and Contact', () => {
    const content = readProjectFile('src/components/Navbar.tsx');
    assert.ok(content, 'src/components/Navbar.tsx must exist');
    assert.ok(content.includes('/products'), 'Navbar must link to /products');
    assert.ok(content.includes('/contact'), 'Navbar must link to /contact');
  });
});
