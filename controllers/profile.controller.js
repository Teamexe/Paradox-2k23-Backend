const ParadoxUser = require("../models/paradoxUser.model");
// const Question = require("../models/question.model");

const displayProfile = (req, res) => {
  const { uid } = req.body;
  ParadoxUser.findOne({ uid: uid }, async (error, user) => {
    if (error) {
      await res.status(200).send({ error: error });
    } else if (!user) {
      await res.status(200).send({ message: "User not found", success: false });
    } else if (user) {
      const userObject = {
        name: user.name,
        uid: user.uid,
        displayPicture: user.image,
        roll: user.roll,
        ref_code: user.refCode,
        team_code: user.teamCode,
        level: user.level,
        teamName: user.teamName,
        coins: user.coins,
        level: user.level,
        attempts: user.attempts,
        score: user.score,
        rank: user.rank,
      };
      // data: userObject
      await res
        .status(200)
        .send({ message: "User found", success: true, data: userObject });
    }
  });
};

module.exports = { displayProfile };
