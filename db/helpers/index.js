const randomstring = require("randomstring");

const databaseHelpers = {
  generateUrl: ({area, price, premises_type, town}) => {
    const url =`${area}m2${price}cedis${premises_type}-in-${town}${randomstring.generate(15)}`;
    return url.replace(/[^A-Z0-9]/gi, "").toLowerCase();
  }
}

module.exports = databaseHelpers;
