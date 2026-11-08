import fs from 'node:fs';
import path from 'node:path';

export const ROOT_DIR = path.resolve(process.cwd());

/**
 * Reads a project file relative to root directory.
 * @param {string} relativePath 
 * @returns {string|null}
 */
export function readProjectFile(relativePath) {
  const fullPath = path.resolve(ROOT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, 'utf8');
}

/**
 * Checks if a project file exists relative to root directory.
 * @param {string} relativePath 
 * @returns {boolean}
 */
export function fileExists(relativePath) {
  const fullPath = path.resolve(ROOT_DIR, relativePath);
  return fs.existsSync(fullPath);
}

/**
 * Recursively search for a string or regex pattern in a directory.
 * @param {string} dirPath 
 * @param {string|RegExp} pattern 
 * @param {string[]} extensions 
 * @returns {Array<{file: string, line: number, text: string}>}
 */
export function searchInFiles(dirPath, pattern, extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.toml', '_headers']) {
  const fullDir = path.resolve(ROOT_DIR, dirPath);
  const results = [];

  if (!fs.existsSync(fullDir)) return results;

  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullSubPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git' || entry.name === '.agents') {
          continue;
        }
        traverse(fullSubPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        const isMatchedExt = extensions.some(target => entry.name.endsWith(target) || ext === target);
        if (isMatchedExt) {
          const content = fs.readFileSync(fullSubPath, 'utf8');
          const lines = content.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const matched = typeof pattern === 'string'
              ? line.toLowerCase().includes(pattern.toLowerCase())
              : pattern.test(line);
            if (matched) {
              results.push({
                file: path.relative(ROOT_DIR, fullSubPath),
                line: i + 1,
                text: line.trim()
              });
            }
          }
        }
      }
    }
  }

  traverse(fullDir);
  return results;
}
