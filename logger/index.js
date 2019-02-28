"use strict";

const { Logger, transports } = require("winston");
const logger = new Logger({
  transports: [
    new transports.File({
      level: "debug",
      filename: "./appDebug.log",
      handleExceptions: true
    }),
    new transports.Console({
      level: "debug",
      json: true,
      handleExceptions: true
    })
  ],
  exitOneError: false
});

module.exports = logger;
