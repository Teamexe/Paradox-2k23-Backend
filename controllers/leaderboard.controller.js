const ParadoxUser = require("../models/paradoxUser.model");
const teamModel = require("../models/team.model");

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
        score: user.score,
        display_picture: user.image,
      };
      // Return the position of the user in the leaderboard
      res.status(200).send({
        success: true,
        message: "Leaderboard fetched",
        data: { myRank, leaderboard },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const displayLevel2LeaderBoard = async (req, res) => {
  const { uid } = req.body;

  const leaderboard = await teamModel.find().sort({ score: -1 }).exec();

  let lb = [];
  leaderboard.forEach((item) => {
    let newItem = {
      user_id: item._id,
      user_name: item.teamName,
      rank: item.teamPosition,
      score: item.score,
      display_picture: item.controlOfficer.photoUrl,
    };
    lb.push(newItem);
  });

  const user = await ParadoxUser.findOne({ uid: uid });
  if (!user) {
    return await res.status(200).json({
      message: "User not in team",
      success: false,
    });
  } else {
    if (user.teamCode) {
      const team = await teamModel.findOne({ teamCode: user.teamCode });

      if (!team) {
        return await res.status(200).json({
          message: "Team does not exist",
          success: true,
          data: { leaderboard: lb },
        });
      } else if (team) {
        const teamPlace = await teamModel
          .find({ score: { $gte: team.score } })
          .sort({ score: -1 })
          .exec();

        const teamPosition = teamPlace.length;
        return await res.status(200).json({
          message: "Team  exist",
          success: true,
          data: {
            myRank: {
              user_id: team._id,
              user_name: team.teamName,
              rank: teamPosition,
              score: team.score,
              display_picture:
                "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/1500922890-great-dane.jpg?crop=1.0xw:1xh;center,top&resize=980:*",
            },
            leaderboard: lb,
          },
        });
      }
    } else {
      // const teamPlace = await teamModel
      //   .find({ score: { $gte: team.score } })
      //   .sort({ score: -1 })
      //   .exec();
      // const teamPosition = teamPlace.length;
      return await res.status(200).json({
        message: "Leaderboard Loaded",
        success: true,
        data: {
          leaderboard: lb,
        },
      });
    }
  }
};

module.exports = { displayLeaderBoard, displayLevel2LeaderBoard };
