const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;
const User = require("./models/User.js");

const Question = require("./models/question.model.js");
// const authController = require("./controllers/auth.controller.js");
const userController = require("./controllers/user.controller.js");
const hashVerifier = require("./middleware/authMiddleware.js");
const authRoutes = require("./routes/auth.routes");

// const homeRoutes = require("./routes/homePage.routes.js");
const homeController = require("./controllers/homePage.controller.js");

// level1 Routes
const { checkQues } = require("./controllers/play_level1.controller.js");
const level1Routes = require("./routes/play_level1.routes.js");
const level2Routes = require("./routes/play_level2.routes.js");

// add question routes
const addQuesRoutes = require("./utils/ques_collector_api.js");

// rules controller
const { getRules } = require("./controllers/rules.controller.js");

// leaderboard routes
const leaderBoardRoutes = require("./routes/leaderboard.routes.js");
// profile routes
// let profileRoutes = require("./routes/profile.route.js");
const { displayProfile } = require("./controllers/profile.controller");

const { getPrize } = require("./controllers/prize.controller.js");

// const teamRoutes = require("./routes/team.routes.js");
const {
  joinTeam,
  createTeam,
  getTeamDetails,
} = require("./controllers/team.controller.js");
const { getQues, cAns } = require("./controllers/play_level2.controller.js");
const questionModel = require("./models/questionL2FO.model.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static("public"));
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

// collector api

app.use("/addQues", addQuesRoutes);
// rules api
app.use(
  "/rules",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  getRules
);

// Level 1 route
app.use(
  "/play/level1",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  level1Routes
);

// Leaderboard route
app.use(
  "/leaderboard",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  leaderBoardRoutes
);

// app.post("/signup", authController.signup_post);
// app.post("/login", authController.login_post);
app.post(
  "/createUser",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  userController.CreateUser
);

app.use(
  "/profile",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  displayProfile
);

app.use(
  "/prizes",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  getPrize
);
app.post(
  "/team/join",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  joinTeam
);
app.post(
  "/team/create",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  createTeam
);
app.post(
  "/team/details",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  getTeamDetails
);

// Level 2 Team
app.use(
  "/play/level2/",
  hashVerifier.base64Decoder,
  hashVerifier.md5HashVerifier,
  level2Routes
);

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
