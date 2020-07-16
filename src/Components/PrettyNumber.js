export function prettyNumber(amount) {
  var numeral = require("numeral");
  if (amount >= 1e15) {
    return numeral(amount).format("0.00e+0");
  } else if (amount >= 1000) {
    return numeral(amount).format("0.00a");
  } else if (typeof amount == "string") {
    return "";
  } else {
    return amount.toFixed(0);
  }
}

export function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function prettyTime(a) {
  var b = Math.floor(a % 60),
    c = Math.floor(a / 60) % 60,
    d = Math.floor(a / 3600) % 24,
    e = Math.floor(a / 86400),
    f = "";
  return (f = e
    ? e +
      ":" +
      ("0" + d).slice(-2) +
      ":" +
      ("0" + c).slice(-2) +
      ":" +
      ("0" + b).slice(-2)
    : d
    ? d + ":" + ("0" + c).slice(-2) + ":" + ("0" + b).slice(-2)
    : c
    ? c + ":" + ("0" + b).slice(-2)
    : b);
}
