/**
 **
 **  Pluralizing strings
 **
 **/

const addPlural = (str, add) => {
  if (!add) {
    return str + "s";
  }
  if (str[str.length - 1].toUpperCase() === "Y") {
    str = str.substring(0, str.length - 1);
  }
  return str + add;
};

export default (num, str, add) => {
  num = parseInt(num) || 0;
  return num > 1 ? addPlural(str, add) : str;
};
