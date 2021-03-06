const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 5000;

const authConfig = require("./config/auth.config");
const { SESS_NAME, SESS_SECRET, SESS_LIFETIME } = authConfig;

//MongoStore setup
const MongoStore = require("connect-mongo")(session);

/**
 * Middleware
 */
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    //define the external storage for sessions
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "session",
      ttl: parseInt(SESS_LIFETIME) / 1000,
    }),
    //define cookie parameters
    cookie: {
      sameSite: true,
      //https transfer
      secure: false,
      maxAge: parseInt(SESS_LIFETIME),
    },
  })
);

/**
 * Routing
 */
const authRouter = require("./routes/auth.router");
app.use("/api/auth", authRouter);

/**
 * DB-Initialization
 */
const dbController = require("./controllers/db.controller");
dbController.connect();

app.get("/", (req, res) => {
  res.send("Session-Auth-API").end();
});

/**
 * Server listening
 */
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server now listening in port ${PORT}`);
});
