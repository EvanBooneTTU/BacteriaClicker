export function prettyNumber(amount) {
  var numeral = require("numeral");
  if (amount >= 1e15) {
    return numeral(amount).format("0.00e+0");
  } else if (amount >= 1000) {
    return numeral(amount).format("0.00a");
  } else {
    return amount.toFixed(0);
  }
}

export function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
