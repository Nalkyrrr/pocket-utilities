import { randomInt } from 'node:crypto';
import { cli, arity, integer } from './cli.js';
export function rollDice(notation, nextInt = randomInt) {
  const match = /^(\d+)d(\d+)$/i.exec(notation);
  if (!match) throw new Error('Use NdM notation, such as 2d6.');
  const count = integer(match[1], 1, 100), sides = integer(match[2], 1, 1000000);
  const rolls = Array.from({ length: count }, () => nextInt(1, sides + 1));
  return { rolls, total: rolls.reduce((sum, roll) => sum + roll, 0) };
}
cli(import.meta.url, 'node roll-dice.js NdM (up to 100 dice)', args => rollDice(arity(args, 1)[0]));
