const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authConfig = require("../config/auth.config");

async function signUp(req, res) {
  const usernameExists = await checkIfUsernameExists(req);
  const emailExists = await checkIfEmailExists(req);
  if (!usernameExists && !emailExists) {
    const { username, password, email } = req.body;
    const hash = await bcrypt.hash(password, 8);
    const user = new User({
      username,
      password: hash,
      email,
    });
    user.save((err) => {
      if (err) throw err;
      res.send("User saved!").status(200).end();
    });
  } else {
    res.send("User already existing").end();
  }
}

async function signIn(req, res) {
  //check if user exists
  const userExists = await checkIfUsernameExists(req);
  const { username } = req.body;
  if (!userExists) {
    res.send("User not found!").status(404).end();
  } else {
    User.findOne({ username }, async (err, user) => {
      //check password
      const pwdMatch = await bcrypt.compare(req.body.password, user.password);
      if (!pwdMatch) {
        res.send("Invalid password!").status(401).end();
      } else {
        //issue token
        const payload = { username };
        const token = jwt.sign(payload, authConfig.tokenSecret, {
          expiresIn: "1h",
        });
        return res
          .cookie("token", token, { httpOnly: true })
          .send("Signed in!")
          .status(200)
          .end();
      }
    });
  }
}

async function checkIfUsernameExists(req) {
  const usernameExists = await User.exists({ username: req.body.username });
  return usernameExists;
}

async function checkIfEmailExists(req) {
  const emailExists = await User.exists({ email: req.body.email });
  return emailExists;
}

module.exports = { signUp, signIn };
