import { cli, arity } from './cli.js';
export function isPalindrome(text) {
  const normalized = [...text.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')];
  return normalized.length > 0 && normalized.join('') === [...normalized].reverse().join('');
}
cli(import.meta.url, 'node palindrome.js "Never odd or even"', args => isPalindrome(arity(args, 1)[0]));
