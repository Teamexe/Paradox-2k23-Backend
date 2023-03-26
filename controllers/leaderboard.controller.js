const ParadoxUser = require("../models/paradoxUser.model");

const displayLeaderBoard = async (req, res) => {
  try {
    const { uid } = req.body;
    const leaderboard = await ParadoxUser.find().sort({ score: -1 }).exec();
    const user = await ParadoxUser.findOne({ uid: uid }).exec();

    if (!user) {
      // If the user doesn't exist, return an error
      res.status(200).send("User not found");
    } else {
      // Query the database for all users with a score greater than or equal to the user's score
      const userPlace = await ParadoxUser.find({ score: { $gte: user.score } })
        .sort({ score: -1 })
        .exec();
      const userPosition = userPlace.length;
      //  user object.
      const myRank = {
        user_id: user.uid,
        user_name: user.name,
        rank: userPosition,
        // display_picture:
      };
      // Return the position of the user in the leaderboard
      res.status(200).send({ myRank, leaderboard });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { displayLeaderBoard };
