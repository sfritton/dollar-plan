import {
  getDollarString,
  getCentString,
  getCentNumber,
} from '../currency';

describe('currency util', () => {
  describe('getDollarString', () => {
    test('returns a string representing the number of dollars', () => {
      const number = 2000;

      expect(getDollarString(number)).toBe('20');
    });
  });

  describe('getCentString', () => {
    test('returns "0.00" if passed no arguments', () => {
      expect(getCentString()).toBe('0.00');
    });

    test('returns "0.00" if passed null', () => {
      expect(getCentString(null)).toBe('0.00');
    });

    test('returns "0.00" if passed NaN', () => {
      expect(getCentString(NaN)).toBe('0.00');
    });

    test('returns "0.0x" if passed a single digit', () => {
      expect(getCentString(1)).toBe('0.01');
    });

    test('returns "0.xx" if passed a two digits', () => {
      expect(getCentString(10)).toBe('0.10');
    });

    test('returns a number with 2 decimal places', () => {
      expect(getCentString(1010)).toBe('10.10');
    });
  });

  describe('getCentNumber', () => {
    test('returns an integer representing cents', () => {
      expect(getCentNumber('100.53')).toBe(10053);
    });
  });
});
