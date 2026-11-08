/**
 * Parses and validates Content Security Policy strings.
 */
export function parseCspDirectives(cspString) {
  if (!cspString || typeof cspString !== 'string') return {};
  
  const clean = cspString.replace(/\n/g, ' ').trim();
  const tokens = clean.split(';').map(t => t.trim()).filter(Boolean);
  const directives = {};

  for (const token of tokens) {
    const parts = token.split(/\s+/);
    const directiveName = parts[0].toLowerCase();
    const sources = parts.slice(1);
    directives[directiveName] = sources;
  }

  return directives;
}

/**
 * Validates CSP directives against enterprise security rules.
 */
export function validateCspRules(directives) {
  const issues = [];

  // default-src must exist and contain 'self'
  if (!directives['default-src']) {
    issues.push("Missing required directive: default-src");
  } else if (!directives['default-src'].includes("'self'")) {
    issues.push("default-src should specify 'self'");
  }

  // object-src must be 'none'
  if (!directives['object-src']) {
    issues.push("Missing recommended directive: object-src");
  } else if (!directives['object-src'].includes("'none'")) {
    issues.push("object-src should be 'none' to block plugin exploits");
  }

  // Check frame-ancestors
  if (!directives['frame-ancestors']) {
    // Note: meta tags cannot specify frame-ancestors, but headers must
  } else if (!directives['frame-ancestors'].includes("'self'") && !directives['frame-ancestors'].includes("'none'")) {
    issues.push("frame-ancestors should be 'self' or 'none' to prevent clickjacking");
  }

  // Check for insecure http: protocols
  for (const [dir, sources] of Object.entries(directives)) {
    for (const src of sources) {
      if (src.startsWith('http://') && !src.startsWith('http://localhost')) {
        issues.push(`Insecure HTTP origin found in ${dir}: ${src}`);
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues
  };
}
