import { cli, arity, integer } from './cli.js';
export function primesUpTo(limit) {
  limit = integer(limit, 0, 1000000);
  const composite = new Uint8Array(limit + 1), result = [];
  for (let n = 2; n <= limit; n++) {
    if (composite[n]) continue;
    result.push(n);
    for (let multiple = n * n; multiple <= limit; multiple += n) composite[multiple] = 1;
  }
  return result;
}
cli(import.meta.url, 'node primes.js LIMIT (0..1000000)', args => primesUpTo(arity(args, 1)[0]));
