const User = require("../models/dbUsers");

const path = require("path");
const expressError = require(path.join(__dirname, "../utils/ExpressError"));

// @desc    Register New User
// @route   GET /api/user/register
// @access  Public
module.exports.registerUser = async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber } =
    req.body.registerUser;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send("User Exists");
  }
  const newUser = new User({
    email,
    firstName,
    lastName,
    phoneNumber,
  });
  newUser.username = newUser.email;
  const userCreated = await User.register(newUser, password);
  if (!userCreated) {
    throw new expressError("Account creation failed", 400);
  } else {
    const { email, firstName, lastName } = userCreated;
    return res.json({ email, firstName, lastName });
  }
};

// @desc    Login User
// @route   GET /api/user/login
// @access  Public
module.exports.loginUser = async (req, res, next) => {
  const { email, firstName, lastName, fullName, phoneNumber } = req.user;
  /* grab order history & phone number too? */
  res.json({ email, firstName, lastName, phoneNumber, fullName });
};

// @desc    Logout User
// @route   GET /api/user/logout
// @access  Private
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // console.log("success logout");
    res.status(200).send("Logged out");
  });
};
