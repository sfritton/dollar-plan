import Months from "../constants/months";

const ONE_DAY = 1000 * 60 * 60 * 24; // one day in milliseconds

export default class DateService {
  static encodeDate(month, year) {
    return `${year}-${month}`;
  }

  static decodeDate(dateStr) {
    let splitStr = dateStr.split(".")[0].split("-");
    return { year: parseInt(splitStr[0]), month: parseInt(splitStr[1]) };
  }

  static getMonthName(month) {
    if (
      month === null ||
      month === undefined ||
      isNaN(month) ||
      month < 1 ||
      month > 12
    ) {
      return "Frittembruary";
    }

    return Months[month - 1].name;
  }

  static getFirstDayOfMonth(month, year) {
    return new Date(year, month - 1, 1);
  }

  static getNextMonth(month, year) {
    if (month === 12) {
      return { month: 1, year: year + 1 };
    }

    return { month: month + 1, year };
  }

  static compareToToday(date) {
    const today = new Date();

    return Math.round((date.getTime() - today.getTime()) / ONE_DAY);
  }

  static hasMonthStarted(month, year) {
    const monthBeginning = this.getFirstDayOfMonth(month, year);

    return this.compareToToday(monthBeginning) <= 0;
  }

  static hasMonthEnded(month, year) {
    const nextMonth = this.getNextMonth(month, year);

    const nextMonthBeginning = this.getFirstDayOfMonth(
      nextMonth.month,
      nextMonth.year
    );

    return this.compareToToday(nextMonthBeginning) < 0;
  }

  static getDaysLeft(month, year) {
    const nextMonth = this.getNextMonth(month, year);

    const nextMonthBeginning = this.getFirstDayOfMonth(
      nextMonth.month,
      nextMonth.year
    );

    return this.compareToToday(nextMonthBeginning);
  }

  static getMonthAndDay(dateStr) {
    const date = new Date(dateStr);

    const month = date.getMonth() + 1;
    const day = date.getDate();

    return { month, day };
  }

  static compareDateStrings(a, b) {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();

    return dateA - dateB;
  }
}
