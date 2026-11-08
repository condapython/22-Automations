#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SUITE_STRUCTURE = [
  {
    tier: 'Tier 1: Feature Coverage (Features 1-10)',
    files: [
      { name: 'Feature 1: Excision of AI-GEO Optimization', file: 'tier1-features/feat1_remove_ai_geo.test.mjs' },
      { name: 'Feature 2: Removal of POS CRM Software', file: 'tier1-features/feat2_remove_pos_crm.test.mjs' },
      { name: 'Feature 3: Removal of Email & SMS Marketing', file: 'tier1-features/feat3_remove_email_sms.test.mjs' },
      { name: 'Feature 4: AI Workflows -> AI Training Transition', file: 'tier1-features/feat4_ai_training_transition.test.mjs' },
      { name: 'Feature 5: Primary Offerings Navigation', file: 'tier1-features/feat5_primary_offerings_nav.test.mjs' },
      { name: 'Feature 6: IndusEye RS3 Enterprise Specifications', file: 'tier1-features/feat6_induseye_rs3_specs.test.mjs' },
      { name: 'Feature 7: Enterprise AI Training Showcase', file: 'tier1-features/feat7_enterprise_ai_training.test.mjs' },
      { name: 'Feature 8: $1.1M B2B Value Proposition & High-Ticket Funnel', file: 'tier1-features/feat8_b2b_value_prop.test.mjs' },
      { name: 'Feature 9: Multi-Layer CSP & Security Headers', file: 'tier1-features/feat9_security_headers_csp.test.mjs' },
      { name: 'Feature 10: Form Validation & Anti-Tamper Security', file: 'tier1-features/feat10_form_anti_tamper.test.mjs' }
    ]
  },
  {
    tier: 'Tier 2: Boundary & Corner Cases',
    files: [
      { name: 'Boundary 1: Form Input Boundaries & String Constraints', file: 'tier2-boundaries/boundary_input_validation.test.mjs' },
      { name: 'Boundary 2: International Phone Formats & Unicode Characters', file: 'tier2-boundaries/boundary_phone_unicode.test.mjs' },
      { name: 'Boundary 3: Anti-Bot Honeypot Trapping & Dwell Time', file: 'tier2-boundaries/boundary_security_tamper.test.mjs' },
      { name: 'Boundary 4: CSP Directives & Origin Whitelisting', file: 'tier2-boundaries/boundary_csp_directives.test.mjs' },
      { name: 'Boundary 5: Catalog Layout & Grid Balance', file: 'tier2-boundaries/boundary_catalog_layout.test.mjs' },
      { name: 'Boundary 6: B2B Pricing Funnel Constraints', file: 'tier2-boundaries/boundary_pricing_funnel.test.mjs' },
      { name: 'Boundary 7: Adversarial Injections & Security Integrity', file: 'tier2-boundaries/boundary_adversarial_injections.test.mjs' },
      { name: 'Boundary 8: Security Headers Exclusions & Permissions Policy', file: 'tier2-boundaries/boundary_security_headers_exclusions.test.mjs' },
      { name: 'Boundary 9: Metadata & SEO Integrity', file: 'tier2-boundaries/boundary_metadata_seo.test.mjs' },
      { name: 'Boundary 10: Error Resilience & Engine Boundary Safety', file: 'tier2-boundaries/boundary_error_resilience.test.mjs' }
    ]
  },
  {
    tier: 'Tier 3: Cross-Feature Interactions & Combinations',
    files: [
      { name: 'Flow 3.1: Nav -> IndusEye RS3 -> Pilot Modal -> Form Dispatch', file: 'tier3-interactions/flow_nav_to_induseye_pilot.test.mjs' },
      { name: 'Flow 3.2: Nav -> AI Training -> Curriculum -> Contact RFQ', file: 'tier3-interactions/flow_nav_to_ai_training_inquiry.test.mjs' },
      { name: 'Flow 3.3: Products Catalog 2-Column Grid -> Offering Detail -> RFQ', file: 'tier3-interactions/flow_catalog_to_enterprise_rfq.test.mjs' },
      { name: 'Flow 3.4: Multi-Layer Security Header Consistency Flow', file: 'tier3-interactions/flow_security_header_chain.test.mjs' },
      { name: 'Flow 3.5: Anti-Tamper Submission Lifecycle Flow', file: 'tier3-interactions/flow_anti_tamper_lifecycle.test.mjs' }
    ]
  },
  {
    tier: 'Tier 4: Real-World Enterprise Application Scenarios',
    files: [
      { name: 'Scenario 4.1: Auto Spa Multi-Bay Retrofit Procurement', file: 'tier4-scenarios/scenario_autospa_retrofit_procurement.test.mjs' },
      { name: 'Scenario 4.2: Enterprise AI Training Corporate Cohort Booking', file: 'tier4-scenarios/scenario_enterprise_ai_cohort_booking.test.mjs' },
      { name: 'Scenario 4.3: Corporate InfoSec Penetration & Security Audit Simulation', file: 'tier4-scenarios/scenario_corporate_security_audit.test.mjs' }
    ]
  }
];

function runTestFile(relPath) {
  const fullPath = path.resolve(__dirname, relPath);
  const result = spawnSync('node', ['--test', '--test-reporter=tap', fullPath], {
    cwd: ROOT_DIR,
    encoding: 'utf8'
  });

  const output = result.stdout + '\n' + result.stderr;
  
  // Parse TAP output
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const failureDetails = [];

  const lines = output.split('\n');
  for (const line of lines) {
    if (line.startsWith('# tests ')) {
      totalTests = parseInt(line.replace('# tests ', ''), 10) || totalTests;
    } else if (line.startsWith('# pass ')) {
      passedTests = parseInt(line.replace('# pass ', ''), 10) || passedTests;
    } else if (line.startsWith('# fail ')) {
      failedTests = parseInt(line.replace('# fail ', ''), 10) || failedTests;
    } else if (line.startsWith('not ok ') || line.includes('AssertionError')) {
      failureDetails.push(line.trim());
    }
  }

  // Fallback if tap parsing didn't catch count
  if (totalTests === 0) {
    const okMatches = output.match(/ok \d+/g);
    const notOkMatches = output.match(/not ok \d+/g);
    passedTests = okMatches ? okMatches.length : 0;
    failedTests = notOkMatches ? notOkMatches.length : (result.status !== 0 ? 1 : 0);
    totalTests = passedTests + failedTests;
  }

  return {
    passed: result.status === 0,
    exitCode: result.status,
    totalTests,
    passedTests,
    failedTests,
    failureDetails: failureDetails.slice(0, 5),
    rawOutput: output
  };
}

function main() {
  const startTime = Date.now();
  console.log('='.repeat(78));
  console.log('  22-AUTOMATIONS E2E TEST RUNNER — 4-TIER REQUIREMENT SUITE');
  console.log('='.repeat(78));
  console.log('');

  let grandTotal = 0;
  let grandPassed = 0;
  let grandFailed = 0;
  const allFailures = [];

  for (const section of SUITE_STRUCTURE) {
    console.log(`[${section.tier}]`);
    let sectionTotal = 0;
    let sectionPassed = 0;
    let sectionFailed = 0;

    for (const testItem of section.files) {
      const res = runTestFile(testItem.file);
      sectionTotal += res.totalTests;
      sectionPassed += res.passedTests;
      sectionFailed += res.failedTests;

      if (res.passed) {
        console.log(`  ✓ ${testItem.name} (${res.passedTests}/${res.totalTests} passed)`);
      } else {
        console.log(`  ✖ ${testItem.name} (${res.passedTests}/${res.totalTests} passed, ${res.failedTests} failed)`);
        allFailures.push({
          tier: section.tier,
          name: testItem.name,
          file: testItem.file,
          details: res.failureDetails
        });
      }
    }

    grandTotal += sectionTotal;
    grandPassed += sectionPassed;
    grandFailed += sectionFailed;
    console.log(`  Subtotal: ${sectionPassed}/${sectionTotal} passed\n`);
  }

  const duration = Date.now() - startTime;
  console.log('='.repeat(78));
  console.log(`Execution Complete in ${duration}ms`);
  console.log(`Total Tests Executed: ${grandTotal}`);
  console.log(`Passed:               ${grandPassed}`);
  console.log(`Failed:               ${grandFailed}`);
  console.log('='.repeat(78));

  if (allFailures.length > 0) {
    console.log('\nFAILED TEST SUMMARY (Implementation Milestones Pending):');
    for (const f of allFailures) {
      console.log(`\n• [${f.tier}] ${f.name} (${f.file}):`);
      for (const d of f.details) {
        console.log(`    ${d}`);
      }
    }
    console.log('');
  }

  // Return exit code 0 or 1
  process.exit(grandFailed > 0 ? 1 : 0);
}

main();
