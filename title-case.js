import { cli, arity } from './cli.js';
export const titleCase = text => text.toLowerCase().replace(/\p{L}[\p{L}\p{M}'\u2019]*/gu,
  word => word[0].toUpperCase() + word.slice(1));
cli(import.meta.url, 'node title-case.js "a small title"', args => titleCase(arity(args, 1)[0]));
