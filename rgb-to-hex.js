import { cli, arity, integer } from './cli.js';
export const rgbToHex = (r, g, b) => '#' + [r, g, b]
  .map(value => integer(value, 0, 255).toString(16).padStart(2, '0')).join('');
cli(import.meta.url, 'node rgb-to-hex.js RED GREEN BLUE (0..255)', args => { arity(args, 3); return rgbToHex(...args); });
