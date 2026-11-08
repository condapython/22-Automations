import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';
import { validatePilotRequest } from '../helpers/validation-engine.mjs';

describe('Tier 4 - Scenario 1: Auto Spa Multi-Bay Retrofit Procurement', () => {
  it('Simulates complete enterprise procurement by a multi-bay car wash operations director', () => {
    // 1. Operator lands on IndusEye RS3 specification page
    const sensingPage = readProjectFile('src/app/products/sensing-unit/page.tsx');
    assert.ok(sensingPage, 'Sensing unit page must exist');

    // 2. Operator reviews hardware component specifications
    const hwComponent = readProjectFile('src/components/products/HardwareSensingProduct.tsx');
    assert.ok(hwComponent, 'Hardware component must exist');

    // Technical validation: FMCW 24 GHz, 1000 lb holding force, steam/chemical immunity
    assert.ok(hwComponent.includes('24 GHz') && hwComponent.includes('FMCW'), 'Must specify 24 GHz FMCW radar');
    assert.ok(hwComponent.includes('1000 lb') || hwComponent.includes('1000-lb'), 'Must specify 1000 lb holding force');

    // Environmental resistance verification: car wash steam and chemical soaps
    const textLower = hwComponent.toLowerCase();
    const hasEnvironmentImmunity = textLower.includes('car wash') || textLower.includes('auto spa') || textLower.includes('steam');
    assert.ok(hasEnvironmentImmunity, 'Component must detail car wash / steam immunity');

    // 3. Operator requests an evaluation pilot for 8 wash bays
    const procurementPilot = {
      userName: 'David Sterling',
      companyName: 'Apex Wash Centers Inc',
      email: 'dsterling@apexwash.ca',
      phone: '+1-905-555-4920',
      requestType: '30-Day Pilot Unit',
      deploymentEnvironment: 'commercial',
      availableDate: '2026-12-05',
      availableTime: '11:00 AM',
      notes: 'Evaluating 8 wash bay retrofits across Brampton & Mississauga facilities. Need zero false-triggers during high-pressure rinse cycles.',
      fax_number: '',
      form_timestamp: Date.now() - 6000
    };

    const pilotResult = validatePilotRequest(procurementPilot);
    assert.equal(pilotResult.success, true, 'Enterprise pilot request must succeed');
  });
});
