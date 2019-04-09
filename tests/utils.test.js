/* eslint-env jest */

import { isEqual } from '../src/utils';

describe('isEqual function', () => {
  it('Return right result for comparing numbers', () => {
    expect(isEqual(4, 4)).toBe(true);
  });

  it('Return right result for comparing strings', () => {
    expect(isEqual('a', 'b')).toBe(false);
  });

  it('Return right result for comparing arrays', () => {
    expect(isEqual(['a', 3], ['a', 3])).toBe(true);
  });

  it('Return right result for comparing objects', () => {
    expect(isEqual({ max: 3, min: 3 }, { min: 3, max: 3 })).toBe(true);
  });

  it('Return false for comparing values with different types', () => {
    expect(isEqual(3, '3')).toBe(false);
  });

  it('Return false for comparing objects with different values', () => {
    expect(isEqual({ min: 3, max: 3 }, { min: 3, max: 1 })).toBe(false);
  });
});
