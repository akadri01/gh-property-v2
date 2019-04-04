"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const enquireSchema = new schema({
  name: String,
  contact: String,
  text: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Enquire = mongoose.model("enquire", enquireSchema);

module.exports = Enquire;
