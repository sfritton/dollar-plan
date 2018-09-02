import { getFirstDayOfMonth } from './date';

test('returns a date representing the first of the month', () => {
  const month = 10; // October
  const year = 2018;
  const date = getFirstDayOfMonth(month, year);

  expect(date.getMonth()).toBe(month - 1); // months are 0-indexed
  expect(date.getFullYear()).toBe(year);
  expect(date.getDate()).toBe(1);
});
