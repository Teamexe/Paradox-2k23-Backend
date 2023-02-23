const Level = require("../models/level.model");
const Banner = require("../models/banner.model");
var mData = {
  levelNo: -1,
  isLevelActive: false,
  levelStartsInSeconds: -1,
  levelStartsAt: -1,
};
var levelStartsAt = 1676010600000;
var level2StartsAt = 1876010600000;
var levelStartsInSeconds = levelStartsAt / 1000 - Date.now() / 1000;
var isLA = Date.now() >= levelStartsAt;

// dataFiller function

// Home Route

const homePage = async (req, res) => {
  var newLevel = {
    id: " 2",
    isLevelActive: isLA,
    levelStartsInSeconds: levelStartsAt / 1000 - Date.now() / 1000,
    levelStartsAt: levelStartsAt,
  };
  var nLevel = new Level(newLevel);

  if (true) {
    const id = 1;
    await Level.findOne({ id: id }, (error, level) => {
      if (error) {
        res.status(200).json({ message: error.message, success: "false" });
      }
      if (level) {
        mData.levelNo = 1;
        mData.isLevelActive = isLA;
        mData.levelStartsInSeconds = levelStartsAt / 1000 - Date.now() / 1000;
        mData.levelStartsAt = levelStartsAt;
        console.log(mData);
      } else {
        nLevel
          .save()
          .then((result) => {
            console.log("saved");
          })
          .catch((err) => {
            return res.status(200).json({
              message: "Unable to create user",
              success: "false",
              data: " ",
            });
          });
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } else {
    const id = 2;
    await Level.findOne({ id: id }, (error, level) => {
      if (error) {
        res.status(200).json({ message: error.message, success: "false" });
      }
      if (level) {
        mData.levelNo = 2;
        mData.isLevelActive = isLA;
        mData.levelStartsInSeconds = levelStartsAt / 1000 - Date.now() / 1000;
        mData.levelStartsAt = levelStartsAt;
        console.log(mData);
      } else {
        nLevel
          .save()
          .then((result) => {
            console.log("saved");
          })
          .catch((err) => {
            return res.status(200).json({
              message: "Unable to create user",
              success: "false",
              data: " ",
            });
          });
      }
    });
  }

  // top 3 persons from leaderboard
  const leaderboardTop = [
    {
      uid: "123456",
      name: "Akhil",
      roll: "String",
      ref_code: " String",
      team_code: "String",
    },
    {
      uid: "12345678",
      name: "Aditya",
      roll: "String",
      ref_code: " String",
      team_code: "String",
    },
    {
      uid: "12345678",
      name: "Aditya rana",
      roll: "String",
      ref_code: " String",
      team_code: "String",
    },
  ];
  // banner data
  const allBanners = await Banner.find();

  return await res.status(200).json({
    success: true,
    message: "done",
    levelData: mData,
    BannerList: allBanners,
    leaderboardTop: leaderboardTop,
  });
};
module.exports = { homePage };
