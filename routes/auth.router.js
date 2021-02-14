const express = require("express");
const authController = require("../controllers/auth.controller");

//middleware
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post("/signup", (req, res) => {
  authController.signUp(req, res);
});

router.post("/signin", (req, res) => {
  authController.signIn(req, res);
});

router.delete("/signout", (req, res) => {
  authController.signOut(req, res);
});

router.get("/", (req, res) => {
  authController.getSession(req, res);
});

module.exports = router;
