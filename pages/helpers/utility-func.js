import Router from "next/router";
import { getUserDataFromLocalStorage } from "./localStorage.js";

export const createFailedSearchInformation = (query, info = "") => {
  // detach failed parameters
  const failedQueryObj = query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : "";
          return params;
        }, {})
    : {};
  // generate string
  Object.values(failedQueryObj).forEach(param => {
    info += `${param} `;
  });
  return info.charAt(0).toUpperCase() + info.slice(1).replace(/_/g, " ");
};

export const retrieveFormValues = fields => {
  const values = {};
  for (let i = 0; i < fields.length; i++) {
    const { value, name } = fields.item(i);
    if (value.length) {
      values[name] = value;
    }
  }
  return values;
};

export const associateImagePath = (directory, img) => {
  const base = "/static/images/";
  const directoryFor =
    directory === "icons" ? "icons" : "property-uploads/" + directory;
  return `${base}${directoryFor}/${img}`;
};

export const clientAuth = redirectUrl => {
  const user = getUserDataFromLocalStorage()
  return user ? user : Router.push(redirectUrl);
}

export const isPlural = (num, str, add) => {
  const addPlural = (str, add) => {
    if (!add) {
      return str + "s";
    }
    if (str[str.length - 1].toUpperCase() === "Y") {
      str = str.substring(0, str.length - 1);
    }
    return str + add;
  };
  num = parseInt(num) || 0;
  return num > 1 ? addPlural(str, add) : str;
};

export const beautifyPrice = price => {
  price = price + " GH₵";
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const beautifyDate = (isoDate, fullLength) => {
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

export const delay = time => new Promise(resolve => setTimeout(resolve, time));