import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 3: Complete Removal of Email & SMS Marketing', () => {
  it('T1.3.1: Products page contains no occurrences of "Email and SMS Marketing"', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.equal(
      content.includes('Email and SMS Marketing'),
      false,
      'Products catalog should not contain "Email and SMS Marketing"'
    );
  });

  it('T1.3.2: Products page contains no SMS messaging or campaign features', () => {
    const content = readProjectFile('src/app/products/page.tsx');
    assert.ok(content, 'src/app/products/page.tsx must exist');
    assert.equal(
      content.includes('SMS Campaigns'),
      false,
      'Products catalog should not advertise SMS Campaigns'
    );
  });

  it('T1.3.3: Footer navigation contains no references to SMS marketing', () => {
    const content = readProjectFile('src/components/Footer.tsx');
    assert.ok(content, 'src/components/Footer.tsx must exist');
    assert.equal(
      content.includes('SMS'),
      false,
      'Footer navigation should not contain SMS links'
    );
  });

  it('T1.3.4: Homepage contains no Email & SMS marketing service cards', () => {
    const content = readProjectFile('src/app/page.tsx');
    assert.ok(content, 'src/app/page.tsx must exist');
    assert.equal(
      content.includes('Email and SMS'),
      false,
      'Homepage should not contain Email and SMS services'
    );
  });

  it('T1.3.5: Contact page offering selector does not list Email/SMS marketing', () => {
    const content = readProjectFile('src/app/contact/page.tsx');
    assert.ok(content, 'src/app/contact/page.tsx must exist');
    assert.equal(
      content.includes('SMS'),
      false,
      'Contact page should not list SMS marketing options'
    );
  });
});
