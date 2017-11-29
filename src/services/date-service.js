("use strict");

class DateService {
  static encodeDate(month, year) {
    return `${year}-${month}`;
  }

  static decodeDate(dateStr) {
    let splitStr = dateStr.split(".")[0].split("-");
    return { year: parseInt(splitStr[0]), month: parseInt(splitStr[1]) };
  }
}

export default DateService;
