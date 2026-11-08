import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, validatePilotRequest } from '../helpers/validation-engine.mjs';

describe('Tier 2 - Boundary 10: Error Resilience & Engine Boundary Safety', () => {
  it('T2.10.1: Null or undefined payload handled gracefully with failure status', () => {
    const nullRes = validateContactForm(null);
    assert.equal(nullRes.success, false);
    assert.ok(nullRes.errors.form);

    const undefRes = validatePilotRequest(undefined);
    assert.equal(undefRes.success, false);
    assert.ok(undefRes.errors.form);
  });

  it('T2.10.2: Array or primitive payload handled gracefully without uncaught exception', () => {
    const arrayRes = validateContactForm(['unexpected', 'array']);
    assert.equal(arrayRes.success, false);

    const stringRes = validatePilotRequest('plain string');
    assert.equal(stringRes.success, false);
  });

  it('T2.10.3: Empty object payload flags all required fields cleanly', () => {
    const emptyRes = validateContactForm({});
    assert.equal(emptyRes.success, false);
    assert.ok(emptyRes.errors.name, 'Missing name flagged');
    assert.ok(emptyRes.errors.company, 'Missing company flagged');
    assert.ok(emptyRes.errors.email, 'Missing email flagged');
    assert.ok(emptyRes.errors.message, 'Missing message flagged');
  });

  it('T2.10.4: Non-string types in string fields handled safely', () => {
    const numNameRes = validateContactForm({
      name: 12345, // Number instead of string
      company: true, // Boolean instead of string
      email: { address: 'user@domain.com' }, // Object instead of string
      message: ['array', 'of', 'text'], // Array instead of string
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    assert.equal(numNameRes.success, false);
  });

  it('T2.10.5: Extra unexpected properties in payload do not bypass validation checks', () => {
    const extraPropsRes = validateContactForm({
      name: 'Valid Name',
      company: 'Valid Corp',
      email: 'valid@corp.com',
      message: 'Valid length message explaining requirement.',
      extraField1: 'unvetted_data',
      isAdmin: true,
      bypassValidation: true,
      company_website_url: '',
      form_timestamp: Date.now() - 3000
    });
    // Extra fields do not cause failure, but core fields remain strictly validated
    assert.equal(extraPropsRes.success, true);
  });
});
