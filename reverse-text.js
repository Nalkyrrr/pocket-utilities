import { cli, arity } from './cli.js';
export const reverseText = text => [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)]
  .map(part => part.segment).reverse().join('');
cli(import.meta.url, 'node reverse-text.js "Hello"', args => reverseText(arity(args, 1)[0]));
