import { cli, arity, integer } from './cli.js';
export function baseConvert(value, from, to) {
  from = integer(from, 2, 36); to = integer(to, 2, 36);
  if (!/^-?[0-9a-z]+$/i.test(value) || value.length > 1024) throw new Error('Provide up to 1024 signed integer digits.');
  const negative = value[0] === '-', digits = negative ? value.slice(1) : value;
  let result = 0n;
  for (const char of digits.toLowerCase()) {
    const digit = parseInt(char, 36);
    if (digit >= from) throw new Error('Digit is invalid for the input base.');
    result = result * BigInt(from) + BigInt(digit);
  }
  return (negative ? -result : result).toString(to);
}
cli(import.meta.url, 'node base-convert.js VALUE FROM_BASE TO_BASE (2..36)', args => { arity(args, 3); return baseConvert(...args); });
