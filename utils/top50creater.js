const ParadoxUser = require("../models/paradoxUser.model");
const teamModel = require("../models/team.model");

const update = async (req, res) => {
  //   const leaderboard = await ParadoxUser.find().sort({ score: -1 }).limit(50);
  const leaderboard = await ParadoxUser.find().sort({ score: -1 });
  res.status(200).send({
    leaderboard: leaderboard,
  });

  //   leaderboard.forEach(async (item) => {
  //     item.isInTop = true;
  //     await item.save();
  //   });
};

module.exports = { update };
