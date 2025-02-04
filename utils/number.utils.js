export function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function formatRb(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(0) + "RB";
  }
  return number.toString();
}
