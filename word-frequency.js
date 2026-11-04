import { cli, arity } from './cli.js';
export function wordFrequency(text) {
  const counts = new Map();
  for (const word of text.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{M}\p{N}]*/gu) ?? []) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([word, count]) => ({ word, count }));
}
cli(import.meta.url, 'node word-frequency.js "tea tea coffee"', args => wordFrequency(arity(args, 1)[0]));
