import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile, fileExists } from '../helpers/artifact-loader.mjs';
import { parseCspDirectives, validateCspRules } from '../helpers/csp-parser.mjs';
import { validateContactForm } from '../helpers/validation-engine.mjs';

describe('Tier 4 - Scenario 3: Corporate InfoSec Penetration & Security Audit Simulation', () => {
  it('Simulates enterprise pre-procurement vendor security audit', () => {
    // 1. Audit Check: Verification that legacy unauthenticated write endpoint is removed
    const routeExists = fileExists('src/app/api/update-geo/route.ts');
    assert.equal(
      routeExists,
      false,
      'AUDIT FAILURE: Legacy unauthenticated endpoint /api/update-geo must be deleted'
    );

    // 2. Audit Check: Verification that legacy geo data file is removed
    const geoDataExists = fileExists('src/app/geo-assets.json');
    assert.equal(
      geoDataExists,
      false,
      'AUDIT FAILURE: Legacy geo-assets.json must be deleted'
    );

    // 3. Audit Check: Content Security Policy inspection in public/_headers
    const headersContent = readProjectFile('public/_headers');
    assert.ok(headersContent, 'public/_headers must exist');
    const cspLine = headersContent.split('\n').find(l => l.includes('Content-Security-Policy:'));
    assert.ok(cspLine, 'AUDIT FAILURE: Missing Content-Security-Policy header');

    const directives = parseCspDirectives(cspLine.replace(/.*Content-Security-Policy:\s*/i, ''));
    const auditRes = validateCspRules(directives);
    assert.equal(auditRes.valid, true, `CSP Audit issues found: ${auditRes.issues.join(', ')}`);

    // 4. Audit Check: Clickjacking and MIME sniffing defense
    assert.ok(
      headersContent.includes('X-Frame-Options: DENY'),
      'AUDIT FAILURE: X-Frame-Options must be DENY'
    );
    assert.ok(
      headersContent.includes('X-Content-Type-Options: nosniff'),
      'AUDIT FAILURE: X-Content-Type-Options must be nosniff'
    );

    // 5. Audit Check: Anti-bot and anti-tamper verification
    const rapidFireBot = validateContactForm({
      name: 'Bot Tester',
      company: 'SecOps',
      email: 'secops@test.org',
      message: 'Automated rapid attack payload test.',
      company_website_url: 'http://evil.com',
      form_timestamp: Date.now() - 100 // 100ms automated execution
    });
    assert.equal(rapidFireBot.success, false, 'AUDIT FAILURE: Anti-bot checks must reject rapid script');
  });
});
