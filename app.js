const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;
const User = require("./models/User.js");

// const authController = require("./controllers/auth.controller.js");
// const userController = require("./controllers/user.controller.js");
const hashVerifier = require("./middleware/authMiddleware.js");
const authRoutes = require("./routes/auth.routes");
// const homeRoutes = require("./routes/homePage.routes.js");
const homeController = require("./controllers/homePage.controller.js");

const app = express();
app.use(bodyParser.json());
require("dotenv").config();

// middleware

// database connection

app.post(
  "/home",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  homeController.homePage
);

app.use(
  "/auth",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  authRoutes
);
// app.post("/signup", authController.signup_post);
// app.post("/login", authController.login_post);
// app.post("/createUser", userController.CreateUser);

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
