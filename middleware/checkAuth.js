const authConfig = require("../config/auth.config");

function checkAuth(req, res, next) {
  //check authentication
  next();
}

module.exports = checkAuth;
