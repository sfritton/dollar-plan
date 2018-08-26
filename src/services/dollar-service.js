const getDollarNumber = number => Math.round(number/100);

export function getDollarString(number) {
  const dollarNumber = getDollarNumber(number);
  return dollarNumber.toString();
}

export function getCentString(number) {
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

export const getCentNumber = dollarString =>
  Math.floor(dollarString.replace(/\./, ""));
