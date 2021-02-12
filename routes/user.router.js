const express = require("express");
const jwt = require("jsonwebtoken");

const Router = express.Router();

//middleware
const checkAuth = require("../middleware/checkAuth");

Router.get("/", checkAuth, (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.decode(token);
  const { username } = decoded;
  res.json({ username }).end();
});

module.exports = Router;
