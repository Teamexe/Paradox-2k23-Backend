const Level = require("../models/level.model");
const Banner = require("../models/banner.model");
const ParadoxUser = require("../models/paradoxUser.model");

var level1StartsAt = 1681533000000;
var level2StartsAt = 1681626600000;
var level1EndsAt = 1681583400000;
var level2EndsAt = 1681655400000;
// var levelStartsInSeconds = level1StartsAt / 1000 - Date.now() / 1000;
var isLA = Date.now() >= level1StartsAt;
var isLA2 = Date.now() >= level2StartsAt;
console.log(Date.now());

// dataFiller function

// Home Route

const homePage = async (req, res) => {
  const { uid } = req.body;
  var currTime = Date.now();
  var player = await ParadoxUser.findOne({ uid: uid });
  const leaderboard = await ParadoxUser.find()
    .sort({ score: -1 })
    .limit(3)
    .exec();
  const BannerList = await Banner.find();

  // var newLevel = {
  //   id: " 2",
  //   isLevelActive: isLA,
  //   levelStartsInSeconds: levelStartsAt / 1000 - Date.now() / 1000,
  //   levelStartsAt: levelStartsAt,
  // };
  // var nLevel = new Level(newLevel);
  if (currTime < level1StartsAt) {
    var levelStartsIn = level1StartsAt - currTime;
    levelStartsIn /= 1000;

    return res.status(200).json({
      success: true,
      message: "Level 1 is not yet acitve",
      data: {
        playerName: player.name,
        isSolo: !player.isInTeam,
        teamName: player.teamName,
        isLevelLocked: false,
        nextQuestionNumber: player.currQues,
        levelData: {
          levelNo: 1,
          isLevelActive: false,
          levelStartsInSeconds: levelStartsIn,
          levelStartsAt: level1StartsAt,
          levelEndsAt: level1EndsAt,
        },
        leaderboardTop: leaderboard,
        bannerList: BannerList,
      },
    });
  }
  if (level1StartsAt < currTime && currTime < level1EndsAt) {
    return res.status(200).json({
      success: true,
      message: "Level 1 is acitve",
      data: {
        playerName: player.name,
        isSolo: !player.isInTeam,
        teamName: player.teamName,
        isLevelLocked: false,
        nextQuestionNumber: player.currQues,
        levelData: {
          levelNo: 1,
          isLevelActive: true,
          levelStartsInSeconds: levelStartsIn,
          levelStartsAt: level1StartsAt,
          levelEndsAt: level1EndsAt,
        },
        leaderboardTop: leaderboard,
        bannerList: BannerList,
      },
    });
  }
  levelStartsIn = level2StartsAt - currTime;
  // TODO: make a script to store top 50 in level 1 and filter islevel2active from that source.
  const top = await ParadoxUser.find().sort({ score: -1 }).limit(50);

  isInTop = false;
  top.forEach((sUser) => {
    if (sUser.uid === uid) {
      isInTop = true;
      player.isInTop = true;
    }
  });
  await player.save();
  // const userIndex = top40.findIndex((u) => u.uid.equals(uid));
  // const isInTop40 = userIndex !== -1;

  if (currTime > level1EndsAt && currTime < level2StartsAt) {
    return await res.status(200).json({
      success: true,
      message: "Level 2 is not yet acitve",
      data: {
        playerName: player.name,
        isSolo: !player.isInTeam,
        teamName: player.teamName,
        isLevelLocked: !player.isInTop,
        nextQuestionNumber: player.currQues,
        levelData: {
          levelNo: 2,
          isLevelActive: false,
          levelStartsInSeconds: levelStartsIn,
          levelStartsAt: level2StartsAt,
          levelEndsAt: level2EndsAt,
        },
        leaderboardTop: leaderboard,
        bannerList: BannerList,
      },
    });
  }
  if (currTime > level2StartsAt && currTime < level2EndsAt) {
    return await res.status(200).json({
      success: true,
      message: "Level 2 is acitve",
      data: {
        playerName: player.name,
        isSolo: !player.isInTeam,
        teamName: player.teamName,
        isLevelLocked: !isInTop,
        nextQuestionNumber: player.currQues,
        levelData: {
          levelNo: 2,
          isLevelActive: true,
          levelStartsInSeconds: levelStartsIn,
          levelStartsAt: level2StartsAt,
          levelEndsAt: level2EndsAt,
        },
        leaderboardTop: leaderboard,
        bannerList: BannerList,
      },
    });
  } else {
    return await res.status(200).json({
      success: true,
      message: "Game ended",
      data: {
        playerName: player.name,
        isSolo: !player.isInTeam,
        teamName: player.teamName,
        isLevelLocked: true,
        nextQuestionNumber: player.currQues,
        levelData: {
          levelNo: -1,
          isLevelActive: false,
          levelStartsInSeconds: levelStartsIn,
          levelStartsAt: level2StartsAt,
          levelEndsAt: level2EndsAt,
        },
        leaderboardTop: leaderboard,
        bannerList: BannerList,
      },
    });
  }

  // if (LA2) {
  //   const id = 2;
  //   await Level.findOne({ id: id }, (error, level) => {
  //     if (error) {
  //       res.status(200).json({ message: error.message, success: "false" });
  //     }
  //     if (level) {
  //       mData.levelNo = 2;
  //       mData.isLevelActive = isLA;
  //       mData.levelStartsInSeconds = levelStartsAt / 1000 - Date.now() / 1000;
  //       mData.levelStartsAt = levelStartsAt;
  //       console.log(mData);
  //     } else {
  //       nLevel
  //         .save()
  //         .then((result) => {
  //           console.log("saved");
  //         })
  //         .catch((err) => {
  //           return res.status(200).json({
  //             message: "Unable to create user",
  //             success: "false",
  //             data: " ",
  //           });
  //         });
  //     }
  //   });
  // } else if (isLA) {
  //   const id = 1;
  //   await Level.findOne({ id: id }, (error, level) => {
  //     if (error) {
  //       res
  //         .status(200)
  //         .json({ message: error.message, success: "false", data: "" });
  //     }
  //     if (level) {
  //       mData.levelNo = 1;
  //       mData.isLevelActive = isLA;
  //       mData.levelStartsInSeconds = levelStartsAt / 1000 - Date.now() / 1000;
  //       mData.levelStartsAt = levelStartsAt;
  //       console.log(mData);
  //     } else {
  //       nLevel
  //         .save()
  //         .then((result) => {
  //           console.log("saved");
  //         })
  //         .catch((err) => {
  //           return res.status(200).json({
  //             message: "Unable to create user",
  //             success: "false",
  //             data: " ",
  //           });
  //         });
  //     }
  //   })
  //     .clone()
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // } else {
  //   return res.status(200).json({
  //     message: "No level is present",
  //     isLevelActive: false,
  //   });
  // }
};
module.exports = { homePage };
