import { cli, arity } from './cli.js';
// Compare Unicode strings directly so ordering is independent of the system locale.
export const sortLines = text => text.split(/\r\n?|\n/).sort((a, b) => a < b ? -1 : a > b ? 1 : 0).join('\n');
cli(import.meta.url, 'node sort-lines.js "TEXT" (case-sensitive, UTF-16 ordering)', args => sortLines(arity(args, 1)[0]));
