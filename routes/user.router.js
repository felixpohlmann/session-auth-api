const express = require("express");

const Router = express.Router();

//middleware
const checkAuth = require("../middleware/checkAuth");

Router.get("/", checkAuth, (req, res) => {
  res.json({ username: "NOT WORKING" }).end();
});

module.exports = Router;
