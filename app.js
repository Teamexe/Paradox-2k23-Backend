const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;
const User = require("./models/User.js");

const authController = require("./controllers/auth.controller.js");
const hashVerifier = require("./middleware/authMiddleware.js");

const app = express();
app.use(bodyParser.json());
require("dotenv").config();

// middleware

// database connection

app.get(
  "/home",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  (req, res) => [res.status(200).json("hello")]
);
app.post("/signup", authController.signup_post);
app.post("/login", authController.login_post);

mongoose
  .connect(
    `mongodb+srv://AkhilJ321:KfMcvxsZcOo08iZl@cluster0.2nfriob.mongodb.net/test`
  )
  .then((result) => {
    console.log("Database Connected!!");
    app.listen(port, () => {
      console.log("lets goo");
    });
  })
  .catch((err) => {
    console.log(err);
  });
