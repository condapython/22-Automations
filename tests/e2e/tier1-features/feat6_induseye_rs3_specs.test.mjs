import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 6: IndusEye RS3 Enterprise Positioning & Specifications', () => {
  it('T1.6.1: IndusEye RS3 specifies 24 GHz FMCW radar operating frequency', () => {
    const hwContent = readProjectFile('src/components/products/HardwareSensingProduct.tsx');
    assert.ok(hwContent, 'HardwareSensingProduct.tsx must exist');
    assert.ok(
      hwContent.includes('24 GHz') && hwContent.includes('FMCW'),
      'Hardware component must specify 24 GHz FMCW radar'
    );
  });

  it('T1.6.2: IndusEye RS3 documents holding-force rating of 1000 lb', () => {
    const hwContent = readProjectFile('src/components/products/HardwareSensingProduct.tsx');
    assert.ok(hwContent, 'HardwareSensingProduct.tsx must exist');
    assert.ok(
      hwContent.includes('1000 lb') || hwContent.includes('1000-lb'),
      'Hardware component must document 1000 lb holding force'
    );
  });

  it('T1.6.3: Target deployment environments specify Auto Spas, Car Washes, Fleet Bays, and Industrial Entrances', () => {
    const hwContent = readProjectFile('src/components/products/HardwareSensingProduct.tsx');
    assert.ok(hwContent, 'HardwareSensingProduct.tsx must exist');
    const hasAutoSpaOrCarWash = hwContent.toLowerCase().includes('car wash') || hwContent.toLowerCase().includes('auto spa');
    const hasFleet = hwContent.toLowerCase().includes('fleet');
    const hasIndustrial = hwContent.toLowerCase().includes('industrial');
    assert.ok(hasAutoSpaOrCarWash, 'Must target Car Wash / Auto Spa');
    assert.ok(hasFleet, 'Must target Fleet Bays');
    assert.ok(hasIndustrial, 'Must target Industrial Entrances');
  });

  it('T1.6.4: Residential gate/garage presets are eliminated from deployment dropdown', () => {
    const hwContent = readProjectFile('src/components/products/HardwareSensingProduct.tsx');
    assert.ok(hwContent, 'HardwareSensingProduct.tsx must exist');
    assert.equal(
      hwContent.includes('Smart Gates, Entry Doors & Garages'),
      false,
      'Hardware component must not contain residential smart gate/garage preset'
    );
  });

  it('T1.6.5: Optical verification and harsh environment immunity (steam, chemicals) are specified', () => {
    const hwContent = readProjectFile('src/components/products/HardwareSensingProduct.tsx');
    assert.ok(hwContent, 'HardwareSensingProduct.tsx must exist');
    assert.ok(
      hwContent.toLowerCase().includes('cat-eye') || hwContent.toLowerCase().includes('camera') || hwContent.toLowerCase().includes('optical'),
      'Must specify optical/cat-eye lens verification'
    );
  });
});
