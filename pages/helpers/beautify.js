export function beautifyDate(isoDate) {
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
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

export function beautifyPrice(price) {
  price = price + " GH₵";
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
