const Team = require("../models/team.model");
const ParadoxUser = require("../models/paradoxUser.model");

const getTeamDetails = async (req, res) => {
  const { uid } = req.body;

  ParadoxUser.findOne({ uid: uid }, async (error, user) => {
    if (error) {
      return res
        .status(200)
        .json({ message: error.message, success: "true", data: " " });
    } else if (!user) {
      return res
        .status(200)
        .json({ message: "User does not exist.", success: "false", data: " " });
    } else if (user) {
      if (user.isInTeam === true) {
        const team = await Team.findOne({ teamCode: user.teamCode });

        return res.status(200).json({
          message: "User  in team",
          success: true,
          data: {
            isInTeam: true,
            teamCode: team.teamCode,
            teamName: team.teamName,
            controlOfficer: team.controlOfficer,
            fieldOfficer: team.fieldOfficer,
          },
        });
      } else if (user.isInTeam === false) {
        return res.status(200).json({
          message: " User is not in team",
          success: true,
          data: {
            isInTeam: false,
          },
        });
      }
    }
  });
};

const joinTeam = async (req, res) => {
  const { uid, teamId } = req.body;
  // make the player with uid the field officer and add him in the team.

  ParadoxUser.findOne({ uid: uid }, async (error, user) => {
    if (error) {
      return res
        .status(200)
        .json({ message: error.message, success: true, data: " " });
    }
    if (!user) {
      return res
        .status(200)
        .json({ message: "user does not exist", success: false, data: " " });
    } else {
      if (user.isInTeam === true) {
        return res.status(200).json({
          message: "User alreday in a team",
          success: false,
          data: " ",
        });
      } else {
        Team.findOne({ teamCode: teamId }, async (error, team) => {
          if (error) {
            return res
              .status(200)
              .json({ message: error.message, success: "true", data: " " });
          } else if (!team) {
            return res.status(200).json({
              message: "team does not exist",
              success: false,
              data: " ",
            });
          } else if (team) {
            user.isInTeam = true;
            user.role = "FO";
            user.teamCode = team.teamCode;
            user.teamName = team.teamName;

            user.save();
            team.fieldOfficer = {
              name: user.name,
              uid: user.uid,
              photoUrl: user.image,
              position: "FIELD",
            };
            team.save();
            return res.status(200).json({
              message: "Team Joined",
              success: true,
              data: {
                isInTeam: true,
                teamName: team.teamName,
                teamCode: team.teamCode,
                controlOfficer: team.controlOfficer,
                fieldOfficer: team.fieldOfficer,
              },
            });
          }
        });
      }
    }
  });
};

const createTeam = async (req, res) => {
  const { uid, teamName } = req.body;
  const User = await ParadoxUser.findOne({ uid: uid });
  const newTeam = new Team({
    isInTeam: true,
    teamName: teamName,
    score: 0,
    teamCode: Math.floor(Math.random() * 9000) + 1000,
    controlOfficer: {
      name: User.name,
      uid: User.uid,
      photoUrl: User.image,
      position: "CONTROL",
    },
    currQues: 1,
  });

  ParadoxUser.findOne({ uid: uid }, async (error, user) => {
    if (error) {
      return res
        .status(200)
        .json({ message: error.message, success: "true", data: " " });
    } else if (!user) {
      return res
        .status(200)
        .json({ message: "User does not exist.", success: "false", data: " " });
    } else if (user) {
      if (user.isInTeam === true) {
        return res.status(200).json({
          message: "User already in team",
          success: false,
          data: {
            isInTeam: true,
          },
        });
      } else if (user.isInTeam === false) {
        user.isInTeam = true;
        user.role = "CO";
        user.teamCode = newTeam.teamCode;
        user.teamName = teamName;
        await user.save();
        await newTeam.save();
        const team = await Team.findOne({ teamCode: newTeam.teamCode });

        return res.status(200).json({
          message: "Team Created",
          success: true,
          data: {
            isInTeam: true,
            teamName: teamName,
            teamCode: newTeam.teamCode,
            controlOfficer: team.controlOfficer,
            fieldOfficer: team.fieldOfficer,
          },
        });
      }
    }
  });
};

module.exports = { joinTeam, createTeam, getTeamDetails };
