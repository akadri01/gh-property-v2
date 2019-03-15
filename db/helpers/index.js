const randomstring = require("randomstring");

const databaseHelpers = {
  generateUrl: ({area, price, premises_type, town}) => {
    const url =`${premises_type}${area}m2${town}${price}cedis${randomstring.generate(15)}`;
    return url.replace(/[^A-Z0-9]/gi, "").toLowerCase();
  }
}

module.exports = databaseHelpers;