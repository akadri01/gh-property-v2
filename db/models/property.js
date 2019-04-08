"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const randomstring = require("randomstring");
const logError = require("../../server/helpers").logError;
const generateUrl = require("../../server/helpers").generateUrl;

const PropertySchema = new schema({
  advert_type: String,
  age: Number,
  area: Number,
  detail: String,
  features: Array,
  furniture: String,
  garden: String,
  located_floor: Number,
  phone: String,
  posted_by: String,
  premises_type: String,
  price: Number,
  region: String,
  rooms_qty: String,
  title: String,
  total_balcony: Number,
  total_bathroom: Number,
  total_floor: Number,
  town: String,
  img_directory: String,
  images: Array, // [thumbnail, main, ...]
  date: {
    type: Date,
    default: Date.now
  },
  ref: String,
  url: String,
  user_name: String,
  user_id: String,
  user_email: String
});

PropertySchema.statics.createNew = function(body, session) {
  // set images
  const placeholders = ["thumbnail.jpg", "main.jpg"];
  const images =
    session.filename && session.filename.length
      ? session.filename
      : placeholders;
  const directory =
    session.filename && session.filename.length
      ? body.uniqueDirectory
      : "placeholders";
  // save
  const newProperty = new Property({
    advert_type: body.advert_type,
    age: parseInt(body.age),
    area: parseInt(body.area),
    detail: body.detail,
    features: body.features,
    furniture: body.furniture,
    garden: body.garden,
    located_floor: parseInt(body.located_floor),
    phone: body.phone,
    posted_by: body.posted_by,
    premises_type: body.premises_type,
    price: parseInt(body.price),
    region: body.region,
    rooms_qty: body.rooms_qty,
    title: body.title,
    total_balcony: parseInt(body.total_balcony),
    total_bathroom: parseInt(body.total_bathroom),
    total_floor: parseInt(body.total_floor),
    town: body.town,
    user_name: body.userName,
    user_id: body.userId,
    user_email: body.userEmail,
    images: images,
    img_directory: directory,
    url: generateUrl(body),
    ref: randomstring.generate(7).toUpperCase()
  });
  return newProperty.save();
};

// Property search
PropertySchema.statics.searchSortWithTotalRecordQty = function(
  queryObj,
  sortObj,
  limitQty,
  skipQty,
  cb
) {
  // create search query object
  const {
    advert_type,
    region,
    town,
    premises_type,
    minPrice,
    maxPrice,
    posted_by
  } = queryObj;
  const queryOptions = {};
  if (advert_type) {
    queryOptions.advert_type = advert_type;
  }
  if (region) {
    queryOptions.region = region;
  }
  if (town) {
    queryOptions.town = town;
  }
  if (premises_type) {
    queryOptions.premises_type = premises_type;
  }
  if (posted_by) {
    queryOptions.posted_by = posted_by;
  }
  if (maxPrice && minPrice) {
    queryOptions.price = { $gt: parseInt(minPrice), $lt: parseInt(maxPrice) };
  } else if (maxPrice) {
    queryOptions.price = { $lt: parseInt(maxPrice) };
  } else if (minPrice) {
    queryOptions.price = { $gt: parseInt(minPrice) };
  }

  // first find record count to display
  this.find(queryOptions).count((e, totalRecordQty) => {
    if (e || !totalRecordQty) {
      logError(e, "Error: db/models/Property/ searchDetailed()");
      return cb(false);
    }
    this.find(queryOptions)
      .sort(sortObj)
      .limit(limitQty)
      .skip(skipQty)
      .then(properties => {
        return cb(properties, totalRecordQty);
      })
      .catch(e => {
        logError(e, "Error: db/models/Property/ searchDetailed()");
        return cb(false);
      });
  });
};

// Edit Property
PropertySchema.statics.editContent = function(body, cb) {
  const updateObj = {
    phone: body.phone,
    price: parseInt(body.price),
    detail: body.detail,
    advert_type: body.advert_type,
    premises_type: body.premises_type,
    rooms_qty: body.rooms_qty,
    posted_by: body.posted_by,
    region: body.region,
    town: body.town,
    age: parseInt(body.age),
    located_floor: parseInt(body.located_floor),
    total_floor: parseInt(body.total_floor),
    total_bathroom: parseInt(body.total_bathroom),
    total_balcony: parseInt(body.total_balcony),
    area: body.area,
    furniture: body.furniture,
    garden: body.garden
  };
  this.findByIdAndUpdate(body._id, updateObj)
    .then(doc => {
      if (!doc) {
        return cb(false);
      }
      return cb(true);
    })
    .catch(e => {
      if (e) {
        return cb(false);
      }
    });
};

// // search and sort
// PropertySchema.statics.searchAndSort = function(queryObj, sortObj, limitQty, cb) {
//   const {
//     color,
//     make,
//     transmission,
//     location,
//     maxKm,
//     maxPrice,
//     minPrice,
//     yearFrom
//   } = queryObj;
//   const queryOptions = {};

//   if (color) {
//     queryOptions.color = color;
//   }
//   if (make) {
//     queryOptions.make = make;
//   }
//   if (queryObj.PropertyType || queryObj.type) {
//     queryOptions.type = queryObj.PropertyType ? queryObj.PropertyType : queryObj.type;
//   }
//   if (transmission) {
//     queryOptions.transmission = transmission;
//   }
//   if (location) {
//     queryOptions.location = location;
//   }
//   if (maxKm) {
//     queryOptions.km = { $lt: parseInt(maxKm) };
//   }
//   if (yearFrom) {
//     queryOptions.year = { $gt: parseInt(yearFrom) };
//   }
//   if (maxPrice && minPrice) {
//     queryOptions.price = { $gt: parseInt(minPrice), $lt: parseInt(maxPrice) };
//   } else if (maxPrice) {
//     queryOptions.price = { $lt: parseInt(maxPrice) };
//   } else if (minPrice) {
//     queryOptions.price = { $gt: parseInt(minPrice) };
//   }

//   // search Properties
//   this.find(queryOptions)
//     .sort(sortObj)
//     .limit(limitQty)
//     .then(Properties => {
//       return cb(Properties);
//     })
//     .catch(e => {
//       console.log(e);
//       logger.log(
//         "Error: can NOT do detailed Property search! db/models/Property/ searchAndSort()",
//         e
//       );
//       return cb(false);
//     });
// };

// // Fetch more Properties
// PropertySchema.statics.fetchMoreProperties = function(
//   queryObj,
//   sortObj,
//   limitQty,
//   skipQty,
//   cb
// ) {
//   const {
//     color,
//     make,
//     transmission,
//     location,
//     maxKm,
//     maxPrice,
//     minPrice,
//     yearFrom
//   } = queryObj;
//   const queryOptions = {};

//   if (color) {
//     queryOptions.color = color;
//   }
//   if (make) {
//     queryOptions.make = make;
//   }
//   if (queryObj.PropertyType || queryObj.type) {
//     queryOptions.type = queryObj.PropertyType ? queryObj.PropertyType : queryObj.type;
//   }
//   if (transmission) {
//     queryOptions.transmission = transmission;
//   }
//   if (location) {
//     queryOptions.location = location;
//   }
//   if (maxKm) {
//     queryOptions.km = { $lt: parseInt(maxKm) };
//   }
//   if (yearFrom) {
//     queryOptions.year = { $gt: parseInt(yearFrom) };
//   }
//   if (maxPrice && minPrice) {
//     queryOptions.price = { $gt: parseInt(minPrice), $lt: parseInt(maxPrice) };
//   } else if (maxPrice) {
//     queryOptions.price = { $lt: parseInt(maxPrice) };
//   } else if (minPrice) {
//     queryOptions.price = { $gt: parseInt(minPrice) };
//   }

//   // search Properties
//   this.find(queryOptions)
//     .sort(sortObj)
//     .limit(limitQty)
//     .skip(skipQty)
//     .then(Properties => {
//       return cb(Properties);
//     })
//     .catch(e => {
//       console.log(e);
//       logger.log(
//         "Error: can NOT do detailed Property search! db/models/Property/ fetchMoreProperties()",
//         e
//       );
//       return cb(false);
//     });
// };

const Property = mongoose.model("property", PropertySchema);

module.exports = Property;
