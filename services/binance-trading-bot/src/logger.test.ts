import {jsonFormatter} from './logger';

describe('logger', () => {
  test('jsonFormatter', () => {
    expect(jsonFormatter(0)).toBe('0');
    // expect(jsonFormatter('')).toBe('');
  });
});
