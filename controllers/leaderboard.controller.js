const ParadoxUser = require("../models/paradoxUser.model");

const displayLeaderBoard = async (req, res) => {
  try {
    const leaderboard = await ParadoxUser.find().sort({ score: -1 }).exec();
    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { displayLeaderBoard };
