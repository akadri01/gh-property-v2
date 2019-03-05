"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const util = require("util");
const hogan = require("hogan.js");
const sharp = require("sharp");
const sendGrid = require("@sendgrid/mail");
const logger = require("../../logger");
const config = require("../../config/");
const FsCreateDirectory = util.promisify(fs.mkdir);
sendGrid.setApiKey(config.SENDGRID_API_KEY);

const utils = {
  createDirectory: (absolutePath, cb) => {
    const uniqueDirectory =
      new Date().toISOString().split("T")[0] +
      "-" +
      crypto.randomBytes(3).toString("hex");
    const directory = absolutePath + uniqueDirectory + "/";
    FsCreateDirectory(directory)
      .then(() => {
        return cb(directory);
      })
      .catch(e => {
        console.log(e);
        logger.log(
          "Error: Fs can NOT create directory. helpers.createDirectory ",
          e
        );
      });
  },

  sendEmailConfirmation: function(userId, email) {
    const pathToEmailTemplate = path.resolve(
      path.join(process.cwd(), "/views/email-templates/confirm-account.hbs")
    );
    const emailTemplateBeforeCompile = fs.readFileSync(
      pathToEmailTemplate,
      "utf8"
    );
    const compiledTemplate = hogan.compile(emailTemplateBeforeCompile);
    const msg = {
      to: email,
      from: "info@weghanaproperty.com",
      subject: "WeGhana Property Account Confirmation",
      html: compiledTemplate.render({ userId })
    };
    sendGrid.send(msg);
  },

  cropImage: (imgToCropPath, width, height, croppedImgNameAndLocation, cb) => {
    sharp(imgToCropPath)
      .resize(width, height)
      .toBuffer()
      .then(data => {
        fs.writeFileSync(croppedImgNameAndLocation, data);
        return cb(true);
      })
      .catch(e => {
        console.log(e);
        logger.log("Error: helpers cropImage() ", e);
        return cb(false);
      });
  }
};

module.exports = utils;
