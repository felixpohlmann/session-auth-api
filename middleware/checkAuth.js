const authConfig = require("../config/auth.config");

function checkAuth(req, res, next) {
  //check authentication
  return true;
}

module.exports = checkAuth;
