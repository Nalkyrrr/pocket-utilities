import { cli, arity, integer } from './cli.js';
export function fibonacci(count) {
  count = integer(count, 0, 1000);
  let a = 0n, b = 1n;
  const result = [];
  for (let n = 0; n < count; n++) { result.push(String(a)); [a, b] = [b, a + b]; }
  return result;
}
cli(import.meta.url, 'node fibonacci.js COUNT (0..1000; exact decimal strings)', args => fibonacci(arity(args, 1)[0]));
