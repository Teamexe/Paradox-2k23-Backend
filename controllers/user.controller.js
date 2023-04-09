// const User = require("../models/User");
const ParadoxUser = require("../models/paradoxUser.model");

const CreateUser = (req, res) => {
  const {
    uid,
    name,
    email,
    roll,
    refCode,
    teamCode,
    teamName,
    displayPicture,
  } = req.body;

  const newUser = new ParadoxUser({
    uid: uid,
    name: name,
    email: email,
    roll: roll,
    refCode: refCode,
    isInTeam: false,
    teamCode: teamCode,
    teamName: teamName,
    currQues: 1,
    image: displayPicture,
    score: 0,
    level: 1,
  });
  ParadoxUser.findOne({ uid: uid }, (error, user) => {
    if (error) {
      return res
        .status(200)
        .json({ message: error.message, success: "true", data: " " });
    }
    if (!user) {
      newUser
        .save()
        .then((result) => {
          return res
            .status(200)
            .json({ message: "User Created", success: "true", data: " " });
        })
        .catch((err) =>
          res.status(200).json({
            message: "Unable to create user",
            success: "false",
            data: " ",
          })
        );
    } else {
      return res
        .status(200)
        .json({ message: "User already exisits", success: "false", data: " " });
    }
  });
};

module.exports = { CreateUser };
