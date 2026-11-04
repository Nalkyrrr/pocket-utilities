import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { number, integer } from './cli.js';

const cases = [
  ['slugify', 'slugify', ['Cr\u00e8me & Tea!'], 'creme-tea'],
  ['title-case', 'titleCase', ['hELLO wORLD'], 'Hello World'],
  ['word-frequency', 'wordFrequency', ['Tea tea coffee'], [{ word: 'tea', count: 2 }, { word: 'coffee', count: 1 }]],
  ['unique-lines', 'uniqueLines', ['b\r\na\r\nb'], 'b\na'],
  ['sort-lines', 'sortLines', ['b\na\nb'], 'a\nb\nb'],
  ['reverse-text', 'reverseText', ['a\u{1F469}\u200d\u{1F4BB}e\u0301'], 'e\u0301\u{1F469}\u200d\u{1F4BB}a'],
  ['palindrome', 'isPalindrome', ['Never odd or even!'], true],
  ['caesar', 'caesar', ['Abc-Z', -1], 'Zab-Y'],
  ['format-duration', 'formatDuration', [90061], '1d 1h 1m 1s'],
  ['format-bytes', 'formatBytes', [1536], '1.5 KiB'],
  ['temperature', 'convertTemperature', [32, 'F', 'C'], 0],
  ['percent-change', 'percentChange', [100, 125], 25],
  ['gcd-lcm', 'gcdLcm', [-12, 18], { gcd: '6', lcm: '36' }],
  ['primes', 'primesUpTo', [12], [2, 3, 5, 7, 11]],
  ['fibonacci', 'fibonacci', [7], ['0', '1', '1', '2', '3', '5', '8']],
  ['rgb-to-hex', 'rgbToHex', [255, 128, 0], '#ff8000'],
  ['base-convert', 'baseConvert', ['9007199254740993', 10, 16], '20000000000001'],
  ['clamp', 'clamp', [20, 0, 10], 10],
];

for (const [file, name, args, expected] of cases) {
  test(`${file}: exported behavior and CLI help`, async () => {
    const module = await import(`./${file}.js`);
    assert.deepEqual(module[name](...args), expected);
    const script = fileURLToPath(new URL(`./${file}.js`, import.meta.url));
    const help = spawnSync(process.execPath, [script, '--help'], { encoding: 'utf8' });
    assert.equal(help.status, 0);
    assert.match(help.stdout, /node /);
    const result = spawnSync(process.execPath, [script, ...args.map(String)], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const actual = typeof expected === 'object' ? JSON.parse(result.stdout) : result.stdout.trimEnd();
    assert.deepEqual(actual, typeof expected === 'object' ? expected : String(expected));
    const missing = spawnSync(process.execPath, [script], { encoding: 'utf8' });
    assert.equal(missing.status, 1);
  });
}

test('numeric inputs reject whitespace, infinity, fractions, and out-of-range values', () => {
  for (const value of ['', ' ', 'hello', 'Infinity', undefined]) assert.throws(() => number(value));
  for (const value of ['1.5', '-1', '11']) assert.throws(() => integer(value, 0, 10));
});

test('edge cases and invalid domains', async () => {
  const { convertTemperature } = await import('./temperature.js');
  const { percentChange } = await import('./percent-change.js');
  const { baseConvert } = await import('./base-convert.js');
  const { gcdLcm } = await import('./gcd-lcm.js');
  const { primesUpTo } = await import('./primes.js');
  const { fibonacci } = await import('./fibonacci.js');
  const { isPalindrome } = await import('./palindrome.js');
  const { clamp } = await import('./clamp.js');
  assert.throws(() => convertTemperature(-1, 'K', 'C'));
  assert.throws(() => convertTemperature(1, 'X', 'C'));
  assert.throws(() => percentChange(0, 1));
  assert.throws(() => baseConvert('102', 2, 10));
  assert.equal(baseConvert('-ff', 16, 10), '-255');
  assert.deepEqual(gcdLcm(0, 0), { gcd: '0', lcm: '0' });
  assert.deepEqual(primesUpTo(1), []);
  assert.deepEqual(fibonacci(0), []);
  assert.equal(isPalindrome('!'), false);
  assert.throws(() => clamp(1, 5, 0));
});

test('dice rolls stay within requested bounds and reject oversized input', async () => {
  const { rollDice } = await import('./roll-dice.js');
  assert.deepEqual(rollDice('2d6', min => min), { rolls: [1, 1], total: 2 });
  assert.deepEqual(rollDice('2d6', (_, max) => max - 1), { rolls: [6, 6], total: 12 });
  for (const invalid of ['0d6', '101d6', '2d0', '2d1000001', 'bad']) assert.throws(() => rollDice(invalid));
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('./roll-dice.js', import.meta.url)), '2d6'], { encoding: 'utf8' });
  assert.equal(result.status, 0);
  const { rolls, total } = JSON.parse(result.stdout);
  assert.equal(rolls.length, 2);
  assert.ok(rolls.every(n => n >= 1 && n <= 6));
  assert.equal(total, rolls[0] + rolls[1]);
});
