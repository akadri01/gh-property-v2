"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const randomstring = require("randomstring");
const helpers = require("../../server/helpers");

const propertySchema = new schema({
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

propertySchema.statics.createNew = function(body, session) {
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
    age: body.age,
    area: body.area,
    detail: body.detail,
    features: body.features,
    furniture: body.furniture,
    garden: body.garden,
    located_floor: body.located_floor,
    phone: body.phone,
    posted_by: body.posted_by,
    premises_type: body.premises_type,
    price: body.price,
    region: body.region,
    rooms_qty: body.rooms_qty,
    title: body.title,
    total_balcony: body.total_balcony,
    total_bathroom: body.total_bathroom,
    total_floor: body.total_floor,
    town: body.town,
    user_name: body.user_name,
    user_id: body.userId,
    user_email: body.user_email,
    images: images,
    img_directory: directory,
    url: helpers.generateUrl(body),
    ref: randomstring.generate(10).toUpperCase()
  });
  return newProperty.save();
};

// // Edit Property
// propertySchema.statics.editContent = function(id, body, cb) {
//   const updateObj = {
//     type: body.PropertyType,
//     make: body.make,
//     transmission: body.transmission,
//     engine_size: parseFloat(body.engineSize),
//     color: body.color,
//     doors: parseInt(body.doors),
//     seats: parseInt(body.seats),
//     year: parseInt(body.year),
//     km: parseInt(body.km),
//     location: body.location,
//     price: parseInt(body.price),
//     email: body.email,
//     phone: body.phone,
//     details: body.details
//   };
//   this.findByIdAndUpdate(id, updateObj)
//     .then(doc => {
//       if (!doc) {
//         return cb(false);
//       }
//       return cb(true);
//     })
//     .catch(e => {
//       if (e) {
//         return cb(false);
//       }
//     });
// };

// // Property search
// propertySchema.statics.searchSortWithTotalRecordQty = function(
//   queryObj,
//   sortObj,
//   limitQty,
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

//   // first find record count to display
//   this.find(queryOptions).count((e, totalRecordQty) => {
//     if (e) {
//       console.log(e);
//       logger.log(
//         "Error: can NOT do detailed Property search! db/models/Property/ searchDetailed()",
//         e
//       );
//       return cb(false);
//     }
//     if (!totalRecordQty) {
//       return cb(false);
//     }

//     // search Propertys
//     this.find(queryOptions)
//       .sort(sortObj)
//       .limit(limitQty)
//       .then(Propertys => {
//         return cb(Propertys, totalRecordQty);
//       })
//       .catch(e => {
//         console.log(e);
//         logger.log(
//           "Error: can NOT do detailed Property search! db/models/Property/ searchDetailed()",
//           e
//         );
//         return cb(false);
//       });
//   });
// };

// // search and sort
// propertySchema.statics.searchAndSort = function(queryObj, sortObj, limitQty, cb) {
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

//   // search Propertys
//   this.find(queryOptions)
//     .sort(sortObj)
//     .limit(limitQty)
//     .then(Propertys => {
//       return cb(Propertys);
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

// // Fetch more Propertys
// propertySchema.statics.fetchMorePropertys = function(
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

//   // search Propertys
//   this.find(queryOptions)
//     .sort(sortObj)
//     .limit(limitQty)
//     .skip(skipQty)
//     .then(Propertys => {
//       return cb(Propertys);
//     })
//     .catch(e => {
//       console.log(e);
//       logger.log(
//         "Error: can NOT do detailed Property search! db/models/Property/ fetchMorePropertys()",
//         e
//       );
//       return cb(false);
//     });
// };

const Property = mongoose.model("property", propertySchema);

module.exports = Property;
