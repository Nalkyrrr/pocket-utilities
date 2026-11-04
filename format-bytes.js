import { cli, arity, number } from './cli.js';
export function formatBytes(bytes) {
  bytes = number(bytes);
  if (bytes < 0 || bytes > Number.MAX_SAFE_INTEGER) throw new Error('Bytes must be from 0 to MAX_SAFE_INTEGER.');
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
  let index = 0;
  while (bytes >= 1024 && index < units.length - 1) { bytes /= 1024; index++; }
  return `${Number(bytes.toFixed(2))} ${units[index]}`;
}
cli(import.meta.url, 'node format-bytes.js BYTES', args => formatBytes(arity(args, 1)[0]));
