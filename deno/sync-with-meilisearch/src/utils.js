import * as path from 'https://deno.land/std/path/mod.ts';
import { fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";
import * as fs from 'https://deno.land/std@0.148.0/fs/mod.ts';

/**
 * Throws an error if any of the keys are missing from the object
 * @param {*} obj
 * @param {string[]} keys
 * @throws {Error}
 */
export function throwIfMissing(obj, keys) {
  const missing = [];
  for (let key of keys) {
    if (!(key in obj) || !obj[key]) {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}

const __filename = fromFileUrl(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolder = path.join(__dirname, '../static');

/**
 * Returns the contents of a file in the static folder
 * @param {string} fileName
 * @returns {string} Contents of static/{fileName}
 */
export function getStaticFile(fileName) {
  return fs.readFileSync(path.join(staticFolder, fileName)).toString();
}

/**
 * @param {string} template
 * @param {Record<string, string | undefined>} values
 * @returns {string}
 */
export function interpolate(template, values) {
  return template.replace(/{{([^}]+)}}/g, (_, key) => values[key] || '');
}