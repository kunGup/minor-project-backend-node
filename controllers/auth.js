const User = require("../models/user");
const jwt = require("jsonwebtoken"); //to generate signed token
var expressjwt = require("express-jwt"); //for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");
require("dotenv").config();

exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.status(200).json(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: user,
      });
    }
    //is user found then make sure email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email or password don't match",
      });
    }

    //generate a signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //persist the token as t in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout succesful" });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.auth && req.profile && req.auth._id == req.profile._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};
