const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", (req, res) => {
  authController.signUp(req, res);
});

router.post("/signin", (req, res) => {
  authController.signIn(req, res);
});

module.exports = router;
