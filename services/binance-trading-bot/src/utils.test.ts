import {uniq, isNullable, isObject, isArray, isDict} from './utils';

describe('utils', () => {
  test('uniq', () => {
    const ROME = {};
    const SPQR = {};
    const DUCE = {};
    expect(uniq([])).toEqual([]);
    expect(uniq([ROME])).toEqual([ROME]);
    expect(uniq([ROME, SPQR, DUCE])).toEqual([ROME, SPQR, DUCE]);
    expect(uniq([ROME, SPQR, SPQR, DUCE])).toEqual([ROME, SPQR, DUCE]);
  });

  test('isNullable', () => {
    expect(isNullable()).toEqual(true);
    expect(isNullable(undefined)).toEqual(true);
    expect(isNullable(null)).toEqual(true);
    expect(isNullable(0)).toEqual(false);
    expect(isNullable(0.1)).toEqual(false);
    expect(isNullable(NaN)).toEqual(false);
    expect(isNullable(Infinity)).toEqual(false);
    expect(isNullable('')).toEqual(false);
    expect(isNullable(' ')).toEqual(false);
    expect(isNullable('rome')).toEqual(false);
    expect(isNullable(false)).toEqual(false);
    expect(isNullable(true)).toEqual(false);
    expect(isNullable([])).toEqual(false);
    expect(isNullable(['rome'])).toEqual(false);
    expect(isNullable({})).toEqual(false);
    expect(isNullable(() => {})).toEqual(false);
  });

  test('isObject', () => {
    expect(isObject()).toEqual(false);
    expect(isObject(undefined)).toEqual(false);
    expect(isObject(null)).toEqual(false);
    expect(isObject([])).toEqual(true);
    expect(isObject(['rome'])).toEqual(true);
    expect(isObject({})).toEqual(true);
    expect(isObject(() => {})).toEqual(false);
  });

  test('isArray', () => {
    expect(isArray()).toEqual(false);
    expect(isArray(undefined)).toEqual(false);
    expect(isArray(null)).toEqual(false);
    expect(isArray([])).toEqual(true);
    expect(isArray(['rome'])).toEqual(true);
  });

  test('isDict', () => {
    expect(isDict()).toEqual(false);
    expect(isDict(undefined)).toEqual(false);
    expect(isDict(null)).toEqual(false);
    expect(isDict({})).toEqual(true);
  });
});
