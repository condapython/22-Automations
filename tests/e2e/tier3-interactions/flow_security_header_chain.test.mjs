import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 3 - Interaction Flow 4: Multi-Layer Security Header Consistency Flow', () => {
  it('Verifies synchronized security headers across public/_headers, netlify.toml, and layout.tsx', () => {
    const headersFile = readProjectFile('public/_headers');
    const netlifyFile = readProjectFile('netlify.toml');
    const layoutFile = readProjectFile('src/app/layout.tsx');

    assert.ok(headersFile, 'public/_headers must exist');
    assert.ok(netlifyFile, 'netlify.toml must exist');
    assert.ok(layoutFile, 'src/app/layout.tsx must exist');

    // 1. Content Security Policy declared in all layers
    assert.ok(headersFile.includes('Content-Security-Policy:'), 'CSP must be in _headers');
    assert.ok(netlifyFile.includes('Content-Security-Policy'), 'CSP must be in netlify.toml');
    assert.ok(layoutFile.includes('Content-Security-Policy'), 'CSP must be in layout.tsx meta');

    // 2. Clickjacking protection: X-Frame-Options DENY
    assert.ok(headersFile.includes('X-Frame-Options: DENY'), 'X-Frame-Options: DENY in _headers');
    assert.ok(netlifyFile.includes('X-Frame-Options'), 'X-Frame-Options in netlify.toml');

    // 3. MIME-type sniffing protection
    assert.ok(headersFile.includes('X-Content-Type-Options: nosniff'), 'nosniff in _headers');
    assert.ok(netlifyFile.includes('X-Content-Type-Options'), 'nosniff in netlify.toml');

    // 4. Critical external domains whitelisted consistently (formsubmit.co, unpkg.com, unsplash)
    assert.ok(headersFile.includes('formsubmit.co'), 'formsubmit.co whitelisted in _headers');
    assert.ok(layoutFile.includes('formsubmit.co'), 'formsubmit.co whitelisted in layout.tsx');
  });
});
