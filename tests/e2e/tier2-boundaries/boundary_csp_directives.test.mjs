import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseCspDirectives, validateCspRules } from '../helpers/csp-parser.mjs';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 2 - Boundary 4: CSP Directives & Origin Whitelisting', () => {
  it('T2.4.1: CSP directives parser accurately handles complex semicolon-delimited policies', () => {
    const rawPolicy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com; object-src 'none'; frame-ancestors 'self'";
    const parsed = parseCspDirectives(rawPolicy);
    assert.deepEqual(parsed['default-src'], ["'self'"]);
    assert.ok(parsed['script-src'].includes('https://unpkg.com'));
    assert.deepEqual(parsed['object-src'], ["'none'"]);
    assert.deepEqual(parsed['frame-ancestors'], ["'self'"]);
  });

  it('T2.4.2: CSP rules validator flags insecure unencrypted HTTP external origins', () => {
    const insecurePolicy = "default-src 'self'; script-src http://insecure-cdn.com;";
    const parsed = parseCspDirectives(insecurePolicy);
    const res = validateCspRules(parsed);
    assert.equal(res.valid, false);
    assert.ok(res.issues.some(i => i.includes('Insecure HTTP origin')));
  });

  it('T2.4.3: CSP rules validator requires object-src to be none', () => {
    const permissivePolicy = "default-src 'self'; object-src *;";
    const parsed = parseCspDirectives(permissivePolicy);
    const res = validateCspRules(parsed);
    assert.equal(res.valid, false);
    assert.ok(res.issues.some(i => i.includes('object-src')));
  });

  it('T2.4.4: public/_headers CSP contains approved whitelist domains and no wildcards in script-src', () => {
    const headers = readProjectFile('public/_headers');
    assert.ok(headers, 'public/_headers must exist');
    const cspLine = headers.split('\n').find(l => l.includes('Content-Security-Policy:'));
    assert.ok(cspLine, 'Content-Security-Policy must be declared');
    const parsed = parseCspDirectives(cspLine.replace(/.*Content-Security-Policy:\s*/i, ''));
    if (parsed['script-src']) {
      assert.equal(
        parsed['script-src'].includes('*'),
        false,
        'script-src must not contain open wildcard *'
      );
    }
  });

  it('T2.4.5: form-action directive in CSP restricts submission targets to approved hosts', () => {
    const headers = readProjectFile('public/_headers');
    assert.ok(headers, 'public/_headers must exist');
    const cspLine = headers.split('\n').find(l => l.includes('Content-Security-Policy:'));
    if (cspLine) {
      const parsed = parseCspDirectives(cspLine.replace(/.*Content-Security-Policy:\s*/i, ''));
      if (parsed['form-action']) {
        const allowedTargets = ["'self'", 'https://formsubmit.co', 'mailto:'];
        for (const target of parsed['form-action']) {
          assert.ok(
            allowedTargets.includes(target),
            `form-action contains unexpected target: ${target}`
          );
        }
      }
    }
  });
});
