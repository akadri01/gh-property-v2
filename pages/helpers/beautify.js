export function beautifyPrice(price) {
  price = price + " GH₵";
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function beautifyDate(isoDate, fullLength) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const date = new Date(isoDate);
  if (!fullLength) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
