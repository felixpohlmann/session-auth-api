const express = require("express");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, (req, res) => {
  res.send("SECRET CONTENT").status(200).end();
});

module.exports = router;
