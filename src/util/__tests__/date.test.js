import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getNextMonth,
  compareDates,
  encodeDate,
  decodeDate,
  getMonthName,
  compareDateStrings,
  getClosestToDate,
} from '../date';

const expectDateMatches = (date, year, month, day) => {
  expect(date.getMonth()).toBe(month - 1); // months are 0-indexed
  expect(date.getFullYear()).toBe(year);
  expect(date.getDate()).toBe(day);
}

const testLastDayOfMonth = ({ month, year, lastDay }) => 
  test(`returns the last day of a ${lastDay} day month`, () => {
    const date = getLastDayOfMonth(month, year);

    expectDateMatches(date, year, month, lastDay);
  });

describe('date util', () => {
  describe('getFirstDayOfMonth', () => {
    test('returns the first day of the month', () => {
      const month = 10; // October
      const year = 2018;
      const date = getFirstDayOfMonth(month, year);

      expectDateMatches(date, year, month, 1);
    });
  });

  describe('getLastDayOfMonth', () => {
    const months = [
      { month: 2, year: 2018, lastDay: 28 },
      { month: 2, year: 2020, lastDay: 29 },
      { month: 9, year: 2018, lastDay: 30 },
      { month: 10, year: 2018, lastDay: 31 },
    ];

    months.map(testLastDayOfMonth);
  });

  describe('getNextMonth', () => {
    test('returns January of the next year', () => {
      const firstMonth = { month: 12, year: 2015 };
      const nextMonth = getNextMonth(firstMonth.month, firstMonth.year);

      expect(nextMonth).toEqual({ month: 1, year: 2016 });
    });

    test('returns the following month', () => {
      const firstMonth = { month: 2, year: 2015 };
      const nextMonth = getNextMonth(firstMonth.month, firstMonth.year);

      expect(nextMonth).toEqual({ month: 3, year: 2015 });
    });
  });

  describe('compareDates', () => {
    test('returns 0 when comparing a date to itself', () => {
      const date = new Date(2018, 5, 3);

      expect(compareDates(date, date)).toBe(0);
    });

    test('returns 0 when comparing two dates with the same day', () => {
      const date1 = new Date(2018, 5, 3);
      const date2 = new Date(2018, 5, 3, 23);

      expect(compareDates(date1, date2)).toBe(0);
    });

    test('returns a positive integer when comparing a date to a future date', () => {
      const date1 = new Date(2018, 5, 3);
      const date2 = new Date(2018, 5, 5);

      expect(compareDates(date1, date2)).toBe(2);
    });

    test('returns a negative integer when comparing a date to a past date', () => {
      const date1 = new Date(2018, 5, 5);
      const date2 = new Date(2018, 5, 3);

      expect(compareDates(date1, date2)).toBe(-2);
    });
  });

  describe('encodeDate', () => {
    test('encodes a month less than 10', () => {
      const encodedDate = encodeDate(9, 2018);

      expect(encodedDate).toBe('2018-09');
    });

    test('encodes a month greater than 10', () => {
      const encodedDate = encodeDate(11, 2018);

      expect(encodedDate).toBe('2018-11');
    });
  });

  describe('decodeDate', () => {
    test('decodes a month less than 10', () => {
      const decodedDate = decodeDate('2018-09');

      expect(decodedDate).toEqual({ year: 2018, month: 9 });
    });

    test('decodes a month greater than 10', () => {
      const decodedDate = decodeDate('2018-11');

      expect(decodedDate).toEqual({ year: 2018, month: 11 });
    });
  });

  describe('getMonthName', () => {
    test('returns Frittemruary for a null month', () => {
      const name = getMonthName(null);

      expect(name).toBe('Frittembruary');
    });

    test('returns Frittemruary for an undefined month', () => {
      const name = getMonthName(undefined);

      expect(name).toBe('Frittembruary');
    });

    test('returns Frittemruary for a NaN month', () => {
      const name = getMonthName(NaN);

      expect(name).toBe('Frittembruary');
    });

    test('returns Frittemruary for a month less than 1', () => {
      const name = getMonthName(0);

      expect(name).toBe('Frittembruary');
    });

    test('returns Frittemruary for a month greater than 12', () => {
      const name = getMonthName(14);

      expect(name).toBe('Frittembruary');
    });

    test('returns the correct name for a valid month', () => {
      const name = getMonthName(11);

      expect(name).toBe('November');
    });
  });

  describe('compareDateStrings', () => {
    test('returns 0 when comparing a date to itself', () => {
      const date = new Date(2018, 5, 3).toString();

      expect(compareDateStrings(date, date)).toBe(0);
    });

    test('returns a positive number when comparing a date to a future date', () => {
      const date1 = new Date(2018, 5, 3).toString();
      const date2 = new Date(2018, 5, 5).toString();

      expect(compareDateStrings(date1, date2)).toBeGreaterThan(0);
    });

    test('returns a negative number when comparing a date to a past date', () => {
      const date1 = new Date(2018, 5, 5).toString();
      const date2 = new Date(2018, 5, 3).toString();

      expect(compareDateStrings(date1, date2)).toBeLessThan(0);
    });
  });

  describe('getClosestToDate', () => {
    test('returns the first day of the month if the target date is in a previous year', () => {
      const targetDate = new Date(2017, 4, 3);

      const closestTime = getClosestToDate(5, 2018, targetDate).getTime();

      expect(closestTime).toBe(new Date(2018, 4, 1).getTime());
    });

    test('returns the last day of the month if the target date is in a future year', () => {
      const targetDate = new Date(2019, 4, 3);

      const closestTime = getClosestToDate(5, 2018, targetDate).getTime();

      expect(closestTime).toBe(new Date(2018, 4, 31).getTime());
    });

    test('returns the first day of the month if the target date is in a previous month', () => {
      const targetDate = new Date(2018, 3, 3);

      const closestTime = getClosestToDate(5, 2018, targetDate).getTime();

      expect(closestTime).toBe(new Date(2018, 4, 1).getTime());
    });

    test('returns the last day of the month if the target date is in a future month', () => {
      const targetDate = new Date(2018, 7, 3);

      const closestTime = getClosestToDate(5, 2018, targetDate).getTime();

      expect(closestTime).toBe(new Date(2018, 4, 31).getTime());
    });

    test('returns the target date if it is in the present month', () => {
      const targetDate = new Date(2018, 4, 3);

      const closestTime = getClosestToDate(5, 2018, targetDate).getTime();

      expect(closestTime).toBe(new Date(2018, 4, 3).getTime());
    });
  });
});
