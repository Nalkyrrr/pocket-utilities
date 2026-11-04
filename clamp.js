import { cli, arity, number } from './cli.js';
export function clamp(value, min, max) {
  value = number(value); min = number(min); max = number(max);
  if (min > max) throw new Error('Minimum must not exceed maximum.');
  return Math.min(max, Math.max(min, value));
}
cli(import.meta.url, 'node clamp.js VALUE MIN MAX', args => { arity(args, 3); return clamp(...args); });
