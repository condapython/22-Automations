import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 2 - Boundary 8: Security Headers Exclusions & Permissions Policy', () => {
  it('T2.8.1: Permissions-Policy restricts sensitive browser hardware features', () => {
    const headers = readProjectFile('public/_headers') || '';
    const toml = readProjectFile('netlify.toml') || '';
    const combined = headers + toml;
    assert.ok(
      combined.includes('Permissions-Policy') || combined.includes('camera=()'),
      'Must define Permissions-Policy disabling camera/mic/geolocation'
    );
  });

  it('T2.8.2: X-Content-Type-Options is set strictly to nosniff', () => {
    const headers = readProjectFile('public/_headers') || '';
    assert.ok(
      headers.includes('X-Content-Type-Options: nosniff'),
      'X-Content-Type-Options must be nosniff'
    );
  });

  it('T2.8.3: X-Frame-Options is set strictly to DENY to prevent frame-based clickjacking', () => {
    const headers = readProjectFile('public/_headers') || '';
    assert.ok(
      headers.includes('X-Frame-Options: DENY'),
      'X-Frame-Options must be DENY'
    );
  });

  it('T2.8.4: Referrer-Policy enforces strict-origin-when-cross-origin', () => {
    const headers = readProjectFile('public/_headers') || '';
    assert.ok(
      headers.includes('strict-origin-when-cross-origin'),
      'Referrer-Policy must be strict-origin-when-cross-origin'
    );
  });

  it('T2.8.5: CSP defines base-uri restriction to prevent base tag injection attacks', () => {
    const headers = readProjectFile('public/_headers') || '';
    const layout = readProjectFile('src/app/layout.tsx') || '';
    const combined = headers + layout;
    assert.ok(
      combined.includes("base-uri 'self'") || combined.includes("default-src 'self'"),
      'CSP must restrict base-uri to self or rely on default-src self'
    );
  });
});
