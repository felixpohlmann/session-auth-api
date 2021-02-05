const express = require("express");
const jwt = require("jsonwebtoken");

//config
const config = require("../config/auth.config");

//middleware
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.decode(token);
  console.log(decoded.username);
  res.send("SECRET CONTENT").status(200).end();
});

module.exports = router;
