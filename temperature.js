import { cli, arity, number } from './cli.js';
export function convertTemperature(value, from, to) {
  value = number(value); from = String(from).toUpperCase(); to = String(to).toUpperCase();
  if (!['C', 'F', 'K'].includes(from) || !['C', 'F', 'K'].includes(to)) throw new Error('Units must be C, F, or K.');
  const kelvin = from === 'K' ? value : from === 'C' ? value + 273.15 : (value - 32) * 5 / 9 + 273.15;
  if (kelvin < -1e-10) throw new Error('Temperature is below absolute zero.');
  const result = to === 'K' ? kelvin : to === 'C' ? kelvin - 273.15 : (kelvin - 273.15) * 9 / 5 + 32;
  if (!Number.isFinite(result)) throw new Error('Result is too large.');
  return Number(result.toFixed(6));
}
cli(import.meta.url, 'node temperature.js VALUE FROM TO', args => { arity(args, 3); return convertTemperature(...args); });
