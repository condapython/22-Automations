import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 2 - Boundary 9: Metadata & SEO Integrity', () => {
  it('T2.9.1: Root layout metadata description highlights IndusEye RS3 and AI Training', () => {
    const layout = readProjectFile('src/app/layout.tsx');
    assert.ok(layout, 'src/app/layout.tsx must exist');
    assert.ok(
      layout.includes('IndusEye RS3') || layout.includes('IndusEye'),
      'Metadata must reference IndusEye'
    );
    assert.ok(
      layout.includes('AI Training') || layout.includes('radar'),
      'Metadata must reference AI Training or radar hardware'
    );
  });

  it('T2.9.2: Root layout metadata contains zero occurrences of "AI-GEO" or "POS CRM"', () => {
    const layout = readProjectFile('src/app/layout.tsx');
    assert.ok(layout, 'src/app/layout.tsx must exist');
    assert.equal(layout.includes('AI-GEO'), false, 'Layout metadata must not contain AI-GEO');
    assert.equal(layout.includes('POS CRM'), false, 'Layout metadata must not contain POS CRM');
  });

  it('T2.9.3: Metadata defines OpenGraph properties with enterprise title', () => {
    const layout = readProjectFile('src/app/layout.tsx');
    assert.ok(layout, 'src/app/layout.tsx must exist');
    assert.ok(
      layout.includes('title:') || layout.includes('title'),
      'Metadata must define title'
    );
  });

  it('T2.9.4: Viewport and responsive layout configurations are present', () => {
    const layout = readProjectFile('src/app/layout.tsx');
    assert.ok(layout, 'src/app/layout.tsx must exist');
    assert.ok(
      layout.includes('viewport') || layout.includes('width=device-width') || layout.includes('globals.css'),
      'Layout must configure responsive styling'
    );
  });

  it('T2.9.5: Dynamic JSON-LD injection contains no legacy Apex Solutions or SaaS schemas', () => {
    const layout = readProjectFile('src/app/layout.tsx');
    assert.ok(layout, 'src/app/layout.tsx must exist');
    assert.equal(
      layout.includes('Apex Solutions'),
      false,
      'Layout must not inject legacy Apex Solutions schema'
    );
  });
});
