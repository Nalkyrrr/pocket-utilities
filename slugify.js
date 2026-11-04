import { cli, arity } from './cli.js';
export const slugify = text => text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
cli(import.meta.url, 'node slugify.js "Hello World"', args => slugify(arity(args, 1)[0]));
