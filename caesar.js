import { cli, arity, integer } from './cli.js';
export function caesar(text, shift) {
  shift = integer(shift, -1000000, 1000000);
  return text.replace(/[a-z]/gi, char => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(base + ((char.charCodeAt(0) - base + shift) % 26 + 26) % 26);
  });
}
cli(import.meta.url, 'node caesar.js "Text" SHIFT (toy cipher; not encryption)', args => {
  arity(args, 2); return caesar(args[0], args[1]);
});
