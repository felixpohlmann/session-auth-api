const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

function checkAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.send("No token provided!").end();
  } else {
    jwt.verify(token, authConfig.tokenSecret, (err, decoded) => {
      if (err) {
        res.send("Invalid token").end();
      } else {
        //successful login
        //calling next route
        next();
      }
    });
  }
}

module.exports = checkAuth;
