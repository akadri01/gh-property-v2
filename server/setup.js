"use strict";

const path = require("path");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const consolidate = require("consolidate");
const cookieParser = require("cookie-parser");
const { DB_URI, SESSION_SECRET } = require("../config");

// Routes
const apiRoutes = require("./routes/api.js");
const adminRoutes = require("./routes/admin.js");
const authRoutes = require("./routes/auth.js");
const ssrRoutes = require("./routes/ssr.js");

// Sessions
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// Database
const mongoose = require("mongoose");
mongoose.connect(DB_URI);

class SetupServer {
  constructor(server) {
    this.server = server;
  }

  initialize() {
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(helmet());
    this.server.use(compression());
    this.server.use(cors());
    this.server.use(this.determineSession);
    this.server.use(cookieParser());
    this.server.use((req, res, next) => {
      res.locals.currentUser = req.session.userId;
      res.locals.session = req.session;
      next();
    });
  }

  views() {
    this.server.engine("pug", consolidate.pug);
    this.server.engine("ejs", consolidate.ejs);
    this.server.set("view engine", "pug");
    this.server.set("views", path.join(process.cwd(), "/views"));
  }

  routes(nextApp) {
    this.server.use("/admin", adminRoutes);
    this.server.use("/api", apiRoutes);
    this.server.use("/auth", authRoutes);
    this.server.use(ssrRoutes.getRequestHandler(nextApp));
  }

  get determineSession() {
    const prod = session({
      secret: SESSION_SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      store: new MongoDBStore({
        uri: DB_URI,
        collection: "s_e_s_s_i_o_n_s"
      }),
      resave: true,
      saveUninitialized: true
    });
    const dev = session({
      secret: SESSION_SECRET,
      cookie: { maxAge: 3600000 * 2 },
      resave: false,
      saveUninitialized: true
    });
    return process.env.NODE_ENV === "production" ? prod : dev;
  }

  start() {
    this.server.listen(3000, e => {
      if (e) throw e;
      console.log(`Server is running on port 3000`);
    });
  }
}

module.exports = SetupServer;
