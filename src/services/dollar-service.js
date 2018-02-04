export default class DollarService {
  static getDollarString(number) {
    const centString = this.getCentString(number);
    const decimal = centString.length - 2;
    return centString.substr(0, decimal - 1);
  }

  static getCentString(number) {
    const dollarStr = "" + number;

    switch (dollarStr.length) {
      case 0:
        return "0.00";
      case 1:
        return "0.0" + dollarStr;
      case 2:
        return "0." + dollarStr;
      default:
        const decimal = dollarStr.length - 2;
        return dollarStr.substr(0, decimal) + "." + dollarStr.substr(decimal);
    }
  }

  static getCentNumber(string) {
    return Math.floor(string.replace(/\./, ""));
  }
}
