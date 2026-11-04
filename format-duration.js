import { cli, arity, integer } from './cli.js';
export function formatDuration(seconds) {
  seconds = integer(seconds, 0, Number.MAX_SAFE_INTEGER);
  const parts = [];
  for (const [label, size] of [['d', 86400], ['h', 3600], ['m', 60], ['s', 1]]) {
    const amount = Math.floor(seconds / size);
    if (amount) parts.push(`${amount}${label}`);
    seconds %= size;
  }
  return parts.join(' ') || '0s';
}
cli(import.meta.url, 'node format-duration.js SECONDS', args => formatDuration(arity(args, 1)[0]));
