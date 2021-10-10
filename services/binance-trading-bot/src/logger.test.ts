import {jsonFormatter} from './logger';

const ROME = `[
  "rome"
]`;

const SPQR = `{
  "spqr": 0
}`;

const DUCE = `() => { }`;

describe('logger', () => {
  test('jsonFormatter', () => {
    expect(jsonFormatter(null)).toBe('null');
    expect(jsonFormatter(undefined)).toBe('undefined');
    expect(jsonFormatter(0)).toBe('0');
    expect(jsonFormatter(0.1)).toBe('0.1');
    expect(jsonFormatter(NaN)).toBe('NaN');
    expect(jsonFormatter(Infinity)).toBe('Infinity');
    expect(jsonFormatter('')).toBe('');
    expect(jsonFormatter(' ')).toBe(' ');
    expect(jsonFormatter('rome')).toBe('rome');
    expect(jsonFormatter(false)).toBe('false');
    expect(jsonFormatter(true)).toBe('true');
    expect(jsonFormatter([])).toBe('[]');
    expect(jsonFormatter(['rome'])).toBe(ROME);
    expect(jsonFormatter({spqr: 0})).toBe(SPQR);
    expect(jsonFormatter(() => {})).toBe(DUCE);
  });
});
