import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readProjectFile } from '../helpers/artifact-loader.mjs';

describe('Tier 1 - Feature 7: Enterprise AI Training Showcase', () => {
  it('T1.7.1: Module 1 covers Edge AI & Radar/Sensor Fusion', () => {
    const pageContent = readProjectFile('src/app/page.tsx') || '';
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    const combined = pageContent + prodContent;
    assert.ok(
      combined.toLowerCase().includes('edge ai') || combined.toLowerCase().includes('sensor fusion') || combined.toLowerCase().includes('radar'),
      'AI Training must cover Edge AI / Sensor Fusion'
    );
  });

  it('T1.7.2: Module 2 covers Enterprise LLM & Agent Systems', () => {
    const pageContent = readProjectFile('src/app/page.tsx') || '';
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    const combined = pageContent + prodContent;
    assert.ok(
      combined.toLowerCase().includes('llm') || combined.toLowerCase().includes('agent'),
      'AI Training must cover Enterprise LLMs / Agent Systems'
    );
  });

  it('T1.7.3: Module 3 covers Predictive Maintenance & Telemetry Anomaly Detection', () => {
    const pageContent = readProjectFile('src/app/page.tsx') || '';
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    const combined = pageContent + prodContent;
    assert.ok(
      combined.toLowerCase().includes('telemetry') || combined.toLowerCase().includes('predictive') || combined.toLowerCase().includes('anomaly'),
      'AI Training must cover Predictive Telemetry / Anomaly Detection'
    );
  });

  it('T1.7.4: Module 4 covers AI Governance, Ethics, or Enterprise ROI Frameworks', () => {
    const pageContent = readProjectFile('src/app/page.tsx') || '';
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    const combined = pageContent + prodContent;
    assert.ok(
      combined.toLowerCase().includes('governance') || combined.toLowerCase().includes('roi') || combined.toLowerCase().includes('operational'),
      'AI Training must cover Governance or ROI Frameworks'
    );
  });

  it('T1.7.5: Enterprise AI Training highlights corporate workforce enablement without agency lock-in', () => {
    const pageContent = readProjectFile('src/app/page.tsx') || '';
    const prodContent = readProjectFile('src/app/products/page.tsx') || '';
    const combined = pageContent + prodContent;
    assert.ok(
      combined.toLowerCase().includes('cohort') || combined.toLowerCase().includes('enablement') || combined.toLowerCase().includes('workforce'),
      'AI Training must emphasize corporate cohort / workforce enablement'
    );
  });
});
