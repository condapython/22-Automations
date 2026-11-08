import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile, fileExists } from '../helpers/artifact-loader.mjs';
import { parseCspDirectives, validateCspRules } from '../helpers/csp-parser.mjs';

describe('Tier 1 - Feature 9: Content Security Policy & HTTP Security Headers', () => {
  it('T1.9.1: public/_headers specifies restrictive Content-Security-Policy', () => {
    const headersContent = readProjectFile('public/_headers');
    assert.ok(headersContent, 'public/_headers must exist');
    assert.ok(
      headersContent.includes('Content-Security-Policy:'),
      'public/_headers must contain Content-Security-Policy'
    );
    const cspLine = headersContent.split('\n').find(l => l.includes('Content-Security-Policy:'));
    const cspVal = cspLine ? cspLine.replace(/.*Content-Security-Policy:\s*/i, '').trim() : '';
    const directives = parseCspDirectives(cspVal);
    assert.ok(directives['default-src'], 'CSP must define default-src');
    assert.ok(directives['default-src'].includes("'self'"), "default-src must include 'self'");
  });

  it('T1.9.2: public/_headers defines X-Frame-Options: DENY and X-Content-Type-Options: nosniff', () => {
    const headersContent = readProjectFile('public/_headers');
    assert.ok(headersContent, 'public/_headers must exist');
    assert.ok(
      headersContent.includes('X-Frame-Options: DENY'),
      'public/_headers must include X-Frame-Options: DENY'
    );
    assert.ok(
      headersContent.includes('X-Content-Type-Options: nosniff'),
      'public/_headers must include X-Content-Type-Options: nosniff'
    );
  });

  it('T1.9.3: public/_headers defines Referrer-Policy: strict-origin-when-cross-origin', () => {
    const headersContent = readProjectFile('public/_headers');
    assert.ok(headersContent, 'public/_headers must exist');
    assert.ok(
      headersContent.includes('Referrer-Policy: strict-origin-when-cross-origin'),
      'public/_headers must specify Referrer-Policy'
    );
  });

  it('T1.9.4: netlify.toml replicates security headers and CSP', () => {
    const tomlContent = readProjectFile('netlify.toml');
    assert.ok(tomlContent, 'netlify.toml must exist');
    assert.ok(
      tomlContent.includes('Content-Security-Policy'),
      'netlify.toml must configure Content-Security-Policy'
    );
    assert.ok(
      tomlContent.includes('X-Frame-Options'),
      'netlify.toml must configure X-Frame-Options'
    );
  });

  it('T1.9.5: src/app/layout.tsx defines CSP meta tag with whitelisted domains', () => {
    const layoutContent = readProjectFile('src/app/layout.tsx');
    assert.ok(layoutContent, 'src/app/layout.tsx must exist');
    assert.ok(
      layoutContent.includes('Content-Security-Policy'),
      'layout.tsx must define Content-Security-Policy meta tag'
    );
    assert.ok(
      layoutContent.includes('formsubmit.co'),
      'layout CSP must whitelist formsubmit.co'
    );
  });
});
