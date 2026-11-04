import { cli, arity, number } from './cli.js';
export function percentChange(before, after) {
  before = number(before); after = number(after);
  if (before === 0) throw new Error('Starting value must be nonzero.');
  const result = (after - before) / Math.abs(before) * 100;
  if (!Number.isFinite(result)) throw new Error('Result is too large.');
  return Number(result.toFixed(6));
}
cli(import.meta.url, 'node percent-change.js BEFORE AFTER (uses absolute starting value)', args => {
  arity(args, 2); return percentChange(...args);
});
