"use strict";

const crypto = require("crypto");
const fs = require("fs");
const sudoFs = require("sudo-fs-promise");
const path = require("path");
const util = require("util");
const hogan = require("hogan.js");
const sharp = require("sharp");
const randomString = require("randomstring");
const multer = require("multer");
const { Logger, transports } = require("winston");
const sendGrid = require("@sendgrid/mail");
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
        utils.logger.log(
          "Error: Fs can NOT create directory. helpers.createDirectory ",
          e
        );
      });
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
        console.log(e);
        utils.logger.log("Error: helpers cropImage() ", e);
        return cb(false);  
      });
  },

  logger: () => {
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
    return logger;
  },

  createImageDirectory: (req, res, next) => {
    utils.createDirectory(`./static/images/property-uploads/`, directory => {
      req.session.directory = directory;
      next();
    });
  },

  handleImages: (req, res, next) => {
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
    // if no image skip
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
    // monitor image process errors
    let errorWithSharpMsg = false;
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
        utils.cropImage(
          imgToCropPath,
          680,
          480,
          croppedImgNameAndLocation,
          done => {
            if (!done) {
              sudoFs.remove(req.session.directory).catch(e => console.error(e));
              errorWithSharpMsg(
                "Error, /server/helpers >> Croping main image error >> cropImages()"
              );
            }
          }
        );
        // crop thumbnail
        utils.cropImage(
          imgToCropPath,
          250,
          160,
          croppedThumbnailNameAndLocation,
          done => {
            if (!done) {
              sudoFs.remove(req.session.directory).catch(e => console.error(e));
              errorWithSharpMsg(
                "Error /server/helpers >> Croping thumbnail image error >> cropImages()"
              );
            }
          }
        );
      } else {
        utils.cropImage(
          imgToCropPath,
          680,
          480,
          croppedImgNameAndLocation,
          done => {
            if (!done) {
              sudoFs.remove(req.session.directory).catch(e => console.error(e));
              errorWithSharpMsg(
                "Error, /server/helpers >> Croping further images error >> cropImages()"
              );
            }
          }
        );
      }
      if (errorWithSharpMsg) {
        res.json({ error: true });
        console.log(errorWithSharpMsg);
        utils.logger.log(errorWithSharpMsg);
        break;
      }
    } /*for loop ends*/
    
    // save croped img name to session
    req.session.filename.unshift(newThumbnailName);
    return next();
  }
};

module.exports = utils;
