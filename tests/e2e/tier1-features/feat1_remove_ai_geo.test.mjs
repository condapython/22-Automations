import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile, fileExists } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 1: Complete Excision of AI-GEO Optimization', () => {
  it('T1.1.1: Products page metadata and copy contain no occurrences of "AI-GEO"', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.equal(
      content.includes('AI-GEO'),
      false,
      'Products page should not contain "AI-GEO"'
    );
  });

  it('T1.1.2: Footer navigation links contain no occurrences of "AI-GEO"', () => {
    const content = readProjectFile('src/components/Footer.tsx');
    assert.ok(content, 'src/components/Footer.tsx must exist');
    assert.equal(
      content.includes('AI-GEO'),
      false,
      'Footer should not contain "AI-GEO"'
    );
  });

  it('T1.1.3: Homepage hero, body, and FAQ contain no occurrences of "AI-GEO" or geoAssets import', () => {
    const content = readProjectFile('src/app/page.tsx');
    assert.ok(content, 'src/app/page.tsx must exist');
    assert.equal(
      content.includes('AI-GEO'),
      false,
      'Homepage should not contain "AI-GEO"'
    );
    assert.equal(
      content.includes('geo-assets.json'),
      false,
      'Homepage should not import geo-assets.json'
    );
  });

  it('T1.1.4: Legacy unauthenticated endpoint /api/update-geo is deleted', () => {
    const exists = fileExists('src/app/api/update-geo/route.ts');
    assert.equal(
      exists,
      false,
      'src/app/api/update-geo/route.ts must be completely removed'
    );
  });

  it('T1.1.5: Legacy geo-assets.json file is deleted', () => {
    const exists = fileExists('src/app/geo-assets.json');
    assert.equal(
      exists,
      false,
      'src/app/geo-assets.json must be completely removed'
    );
  });
});
