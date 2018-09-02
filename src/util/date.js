export const months = [
  { value: 1, name: "January" },
  { value: 2, name: "February" },
  { value: 3, name: "March" },
  { value: 4, name: "April" },
  { value: 5, name: "May" },
  { value: 6, name: "June" },
  { value: 7, name: "July" },
  { value: 8, name: "August" },
  { value: 9, name: "September" },
  { value: 10, name: "October" },
  { value: 11, name: "November" },
  { value: 12, name: "December" }
];

const ONE_DAY = 1000 * 60 * 60 * 24; // one day in milliseconds

export const getFirstDayOfMonth = (month, year) => new Date(year, month - 1, 1);

function getLastDayOfMonth(month, year) {
  const nextMonth = getNextMonth(month, year);

  return new Date(nextMonth.year, nextMonth.month - 1, 0);
}

function getNextMonth(month, year) {
  if (month === 12) {
    return { month: 1, year: year + 1 };
  }

  return { month: month + 1, year };
}

function compareToToday(date) {
  const today = new Date();

  return Math.round((date.getTime() - today.getTime()) / ONE_DAY);
}

export function encodeDate(month, year) {
  if (month < 10) {
    return `${year}-0${month}`;
  }

  return `${year}-${month}`;
}

export function decodeDate(dateStr) {
  const [ yearStr, monthStr ] = dateStr.split(".")[0].split("-");
  return { year: parseInt(yearStr), month: parseInt(monthStr) };
}

export function getMonthName(month) {
  if (
    month === null ||
    month === undefined ||
    isNaN(month) ||
    month < 1 ||
    month > 12
  ) {
    return "Frittembruary";
  }

  return months[month - 1].name;
}

export function hasMonthStarted(month, year) {
  const monthBeginning = getFirstDayOfMonth(month, year);

  return compareToToday(monthBeginning) <= 0;
}

export function hasMonthEnded(month, year) {
  const nextMonth = getNextMonth(month, year);

  const nextMonthBeginning = getFirstDayOfMonth(
    nextMonth.month,
    nextMonth.year
  );

  return compareToToday(nextMonthBeginning) < 0;
}

export function getDaysLeft(month, year) {
  const nextMonth = getNextMonth(month, year);

  const nextMonthBeginning = getFirstDayOfMonth(
    nextMonth.month,
    nextMonth.year
  );

  return compareToToday(nextMonthBeginning);
}

export function compareDateStrings(a, b) {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();

  return dateA - dateB;
}

/*
 * Returns the day in the budget month that is closest to target date.
 * If target date is in the budget month, returns target date.
 * If budget month is in the past, returns last day of budget month.
 * If budget month is in the future, returns 1st day of budget month.
 */
export function getClosestToDate(month, year, targetDate) {
  const targetMonth = targetDate.getMonth() + 1;
  const targetYear = targetDate.getFullYear();

  if (year > targetYear) {
    return getFirstDayOfMonth(month, year);
  }

  if (year < targetYear) {
    return getLastDayOfMonth(month, year);
  }

  if (month > targetMonth) {
    return getFirstDayOfMonth(month, year);
  }

  if (month < targetMonth) {
    return getLastDayOfMonth(month, year);
  }

  return targetDate;
}

export const getClosestToToday = date => getClosestToDate(date.month, date.year, new Date());
