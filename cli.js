import { pathToFileURL } from 'node:url';

export function number(value) {
  if (value === undefined || String(value).trim() === '' || !Number.isFinite(Number(value))) {
    throw new Error('Expected a finite number.');
  }
  return Number(value);
}

export function integer(value, min, max) {
  const n = number(value);
  if (!Number.isSafeInteger(n) || n < min || n > max) throw new Error(`Expected an integer from ${min} to ${max}.`);
  return n;
}

export function cli(meta, usage, action) {
  if (!process.argv[1] || meta !== pathToFileURL(process.argv[1]).href) return;
  try {
    const args = process.argv.slice(2);
    if (args[0] === '--help') return console.log(usage);
    const output = action(args);
    console.log(typeof output === 'object' ? JSON.stringify(output, null, 2) : output);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

export function arity(args, count) {
  if (args.length !== count) throw new Error(`Expected ${count} argument(s). Use --help for usage.`);
  return args;
}
