import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';
import { validatePilotRequest } from '../helpers/validation-engine.mjs';

describe('Tier 3 - Interaction Flow 1: Nav -> IndusEye RS3 -> Pilot Modal -> Form Dispatch', () => {
  it('Executes complete user journey from navigation to pilot request dispatch', () => {
    // Step 1: User accesses Navigation and locates IndusEye RS3 link
    const navbar = readProjectFile('src/components/Navbar.tsx');
    assert.ok(navbar, 'Navbar must exist');
    assert.ok(navbar.includes('IndusEye RS3'), 'Navbar must link to IndusEye RS3');
    assert.ok(navbar.includes('/products/sensing-unit'), 'Navbar target is /products/sensing-unit');

    // Step 2: User loads IndusEye RS3 dedicated page
    const sensingPage = readProjectFile('src/app/products/sensing-unit/page.tsx');
    assert.ok(sensingPage, 'Sensing unit page must exist');
    assert.ok(sensingPage.includes('HardwareSensingProduct'), 'Must render HardwareSensingProduct component');

    // Step 3: Hardware component contains technical radar specs and Pilot dialog
    const hwComponent = readProjectFile('src/components/products/HardwareSensingProduct.tsx');
    assert.ok(hwComponent, 'Hardware component must exist');
    assert.ok(hwComponent.includes('24 GHz') && hwComponent.includes('FMCW'), 'Must specify 24 GHz FMCW radar');
    assert.ok(hwComponent.includes('1000 lb') || hwComponent.includes('1000-lb'), 'Must specify 1000 lb holding force');
    assert.ok(hwComponent.includes('va-enquiry-modal'), 'Must contain accessible pilot inquiry modal');

    // Step 4: User opens modal and completes pilot request payload
    const pilotSubmission = {
      userName: 'Robert MacLeod',
      companyName: 'Metro Express Car Wash Ltd',
      email: 'rmacleod@metrocarwash.ca',
      phone: '+1-416-555-8921',
      requestType: '30-Day Pilot Unit',
      deploymentEnvironment: 'commercial',
      availableDate: '2026-12-15',
      availableTime: '14:00',
      notes: 'Evaluating 8 bays retrofit in North York facility. Steam immunity is critical.',
      fax_number: '',
      form_timestamp: Date.now() - 4500
    };

    // Step 5: Pilot request passes validation and confirms dispatch parameters
    const res = validatePilotRequest(pilotSubmission);
    assert.equal(res.success, true, 'Pilot submission must pass all validation checks');
    assert.ok(hwComponent.includes('formsubmit.co'), 'Hardware component must dispatch to formsubmit.co');
  });
});
