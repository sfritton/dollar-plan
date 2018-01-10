export default class DollarService {
  static getDollars(number) {
    return this.round(number, 0);
  }

  static getDollarsAndCents(number) {
    return this.round(number, 2);
  }

  static round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }
}
