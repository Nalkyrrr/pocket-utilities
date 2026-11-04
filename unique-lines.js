import { cli, arity } from './cli.js';
export const uniqueLines = text => [...new Set(text.split(/\r\n?|\n/))].join('\n');
cli(import.meta.url, 'node unique-lines.js "TEXT" (preserves first occurrence; supports multiline text)',
  args => uniqueLines(arity(args, 1)[0]));
