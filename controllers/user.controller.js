const User = require("../models/User");
const ParadoxUser = require("../models/paradoxUser.model");

const CreateUser = (req, res) => {
  const { uid, name, roll, ref_code, team_code, team_name } = req.body;

  const newUser = new ParadoxUser({
    uid: uid,
    name: name,
    roll: roll,
    ref_code: ref_code,
    team_code: team_code,
    team_name: team_name,
  });
  ParadoxUser.findOne({ uid: uid }, (error, user) => {
    if (error) {
      return res.status(500).send({ error });
    }
    if (!user) {
      newUser
        .save()
        .then((result) => {
          return res
            .status(201)
            .json({ message: "User Created", success: "true" });
        })
        .catch((err) =>
          res
            .status(400)
            .json({ message: "Unable to create user", success: "false" })
        );
    } else {
      return res.status(400).json({ message: "User already exisits" });
    }
  });
};

module.exports = { CreateUser };
