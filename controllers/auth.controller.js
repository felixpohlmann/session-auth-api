const bcrypt = require("bcrypt");
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
    res.send("User already existing").status(404).end();
  }
}

async function signIn(req, res) {
  //check if user exists
  const userExists = await checkIfUsernameExists(req);
  const { username } = req.body;
  if (!userExists) {
    res.send("Invalid credentials!").status(401).end();
  } else {
    User.findOne({ username }, async (err, user) => {
      //check password
      const pwdMatch = await bcrypt.compare(req.body.password, user.password);
      if (!pwdMatch) {
        res.status(401).send("Invalid credentials!").end();
      } else {
        //successful login, add user specific data to the session
        const sessionUser = { userId: user._id, username: user.username };
        req.session.user = sessionUser;
        console.log(req.session);
        return res.send(sessionUser).status(200).end();
      }
    });
  }
}

async function signOut(req, res) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) console.log(err);
    });
    res.clearCookie(authConfig.SESS_NAME);
  }
  res.end();
}

async function getSession(req, res) {
  const { user } = req.session;
  res.send(user);
}

async function checkIfUsernameExists(req) {
  const usernameExists = await User.exists({ username: req.body.username });
  return usernameExists;
}

async function checkIfEmailExists(req) {
  const emailExists = await User.exists({ email: req.body.email });
  return emailExists;
}

module.exports = { signUp, signIn, signOut, getSession };
