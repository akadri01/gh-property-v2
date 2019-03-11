'use strict';

const path = require("path");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const consolidate = require("consolidate");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const config = require("../config");
const isomorphicRoutes = require("./routes/isomorphic.js");
const apiRoutes = require("./routes/api.js");
const adminRoutes = require("./routes/admin.js");
const authRoutes = require("./routes/auth.js");
const dataBase = mongoose.connect(config.DB_URI);

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
    this.server.use(this.session);
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
    this.server.use("/iso", isomorphicRoutes);
    this.server.use('/auth', authRoutes);
    require("./routes/ssr.js")(this.server, nextApp);
  }

  get session() {
    const prod = session({
      secret: config.SESSION_SECRET,
      resave: false,
      cookie: { maxAge: 3600000 * 2 },
      saveUninitialized: true,
      store: new MongoStore({
        db: mongoose.connection.db
      })
    });
    const dev = session({
      secret: config.SESSION_SECRET,
      cookie: { maxAge: 3600000 * 2 },
      resave: false,
      saveUninitialized: true
    });
    return process.env.NODE_ENV === "production" ? prod : dev;
  }

  start() {
    this.server.listen(process.env.PORT, e => { 
      if (e) throw e;
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
}

module.exports = SetupServer;