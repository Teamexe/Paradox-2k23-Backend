const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  if (password === undefined) {
    console.log(password, email);
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        email: email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({ message: "User Created" });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  });
};

const login_post = async (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Auth failed" });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Auth failed" });
        }
        if (result) {
          return res.status(200).json({ message: "Auth successful" });
        }
        return res.status(401).json({ message: "Auth failed" });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = { signup_post, login_post };
