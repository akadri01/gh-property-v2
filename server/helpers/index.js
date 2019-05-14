"use strict";

const crypto = require("crypto");
const fs = require("fs");
const rimraf = require("rimraf");
const path = require("path");
const util = require("util");
const randomstring = require("randomstring");
const hogan = require("hogan.js");
const urlEncode = require("urlencode");
const sharp = require("sharp");
const randomString = require("randomstring");
const multer = require("multer");
const sendGrid = require("@sendgrid/mail");
const config = require("../../config.js");
const logger = require("./_logger");
sendGrid.setApiKey(config.SENDGRID_API_KEY);

var helperMethods = {
  logError: (e, msg) => {
    return process.env.NODE_ENV === "development"
      ? console.log(e)
      : logger.log(msg, e);
  },

  generateUrl: ({ area, price, premises_type, town }) => {
    const url = `${premises_type}-${area}m2-${town}-${price}cedis-in-ghana-${randomstring.generate(
      15
    )}`;
    return urlEncode(url.replace(/\s/g, "-").toLowerCase());
  },

  createDirectory: (absolutePath, cb) => {
    const uniqueDirectory =
      new Date().toISOString().split("T")[0] +
      "-" +
      crypto.randomBytes(3).toString("hex");
    const directory = absolutePath + uniqueDirectory + "/";
    const FsCreateDirectory = util.promisify(fs.mkdir);
    FsCreateDirectory(directory)
      .then(() => {
        return cb(directory);
      })
      .catch(e =>
        helperMethods.logError(
          e,
          "Error: Fs can NOT create directory. helpers.createDirectory "
        )
      );
  },

  sendEmailConfirmation: (userId, email) => {
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

  cropImage: (imgPath, width, height, croppedImgNameAndLocation, cb) => {
    sharp(imgPath)
      .resize(width, height)
      .toBuffer()
      .then(data => {
        fs.writeFileSync(croppedImgNameAndLocation, data);
        return cb(true);
      })
      .catch(e => {
        helperMethods.logError(e, "Error: helpers cropImage()");
        return cb(false);
      });
  },

  createImageDirectory: (req, res, next) => {
    helperMethods.createDirectory(
      `./static/images/property-uploads/`,
      directory => {
        req.session.directory = directory;
        next();
      }
    );
  },

  handleImages: () => {
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, req.session.directory);
      },
      filename: function(req, file, cb) {
        const imageName =
          crypto.randomBytes(6).toString("hex") +
          path.extname(file.originalname);
        req.session.filename && req.session.filename.length
          ? req.session.filename.push(imageName)
          : (req.session.filename = [imageName]);
        cb(null, imageName);
      }
    });
    const start = multer({
      storage: storage,
      limits: { fileSize: 10000000 },
      fileFilter: function(req, file, cb) {
        const accepted = /jpeg|jpg|png|gif/;
        const extname = accepted.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimetype = accepted.test(file.mimetype);
        return mimetype && extname
          ? cb(null, true)
          : cb("Error: Accepted image extentions are: .jpeg .jpg .png .gif");
      }
    });
    return start;
  },

  cropImagesMiddleware: (req, res, next) => {
    if (!req.files || !req.files.length) {
      return next();
    }
    // thumbnail data
    const newThumbnailName =
      "thumbnail-" +
      randomString.generate(7) +
      path.extname(req.files[0].originalname).toLowerCase();
    const croppedThumbnailNameAndLocation = path.join(
      req.session.directory,
      newThumbnailName
    );

    // loop all images to crop and resize
    for (let i = 0; i < req.session.filename.length; i++) {
      // large img data
      const imgToCropPath = path.join(
        req.session.directory,
        req.session.filename[i]
      );
      const croppedImgNameAndLocation = path.join(
        req.session.directory,
        req.session.filename[i]
      );
      // index 0  main img and thumbnail
      if (i === 0) {
        // crop main img
        helperMethods.cropImage(
          imgToCropPath,
          680,
          460,
          croppedImgNameAndLocation,
          done => {
            helperMethods.handleCropFailure(done, req.session.directory);
          }
        );
        // crop thumbnail
        helperMethods.cropImage(
          imgToCropPath,
          250,
          160,
          croppedThumbnailNameAndLocation,
          done => {
            helperMethods.handleCropFailure(done, req.session.directory);
          }
        );
      } else {
        helperMethods.cropImage(
          imgToCropPath,
          680,
          460,
          croppedImgNameAndLocation,
          done => {
            helperMethods.handleCropFailure(done, req.session.directory);
          }
        );
      }
    } /*for loop ends*/
    req.session.filename.unshift(newThumbnailName);
    return next();
  },

  handleCropFailure(done, directory) {
    return !done && fs.existsSync(directory)
      ? rimraf.sync(directory)
      : undefined;
  }
};

module.exports = helperMethods;
