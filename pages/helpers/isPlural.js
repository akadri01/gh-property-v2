export default (num, str) => {
  num = parseInt(num) || 0;
  return num > 1 ? str + "s" : str;
};
