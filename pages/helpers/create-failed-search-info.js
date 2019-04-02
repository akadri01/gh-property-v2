/**
 **
 **  Generatest information for user if search fails
 **
 **/
export default (query, info = "") => {
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
  // capitalize and replace underscore with space
  return info.charAt(0).toUpperCase() + info.slice(1).replace(/_/g, " ");
};
