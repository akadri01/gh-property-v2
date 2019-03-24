"use strict";

const next = require("next");
const express = require("express");
const SetupServer = require("./setup");
const Setup = new SetupServer(express());

process.on("uncaughtException", function(e) {
  console.error("Uncaught Exception: ", e);
});
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection: Promise:", p, "Reason:", reason);
});
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.PORT = process.env.PORT || 80;

const app = next({
  dir: ".",
  dev: process.env.NODE_ENV === "development"
});

app
  .prepare()
  .then(() => {
    Setup.initialize();
    Setup.views();
    Setup.routes(app);
    Setup.start();
  })
  .catch(e => {
    console.error(e.stack);
    process.exit(1);
  });
