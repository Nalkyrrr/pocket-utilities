import { cli, arity, integer } from './cli.js';
export function gcdLcm(a, b) {
  a = BigInt(integer(a, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER));
  b = BigInt(integer(b, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER));
  a = a < 0n ? -a : a; b = b < 0n ? -b : b;
  let x = a, y = b;
  while (y) [x, y] = [y, x % y];
  return { gcd: String(x), lcm: String(x === 0n ? 0n : a / x * b) };
}
cli(import.meta.url, 'node gcd-lcm.js INTEGER INTEGER', args => { arity(args, 2); return gcdLcm(...args); });
