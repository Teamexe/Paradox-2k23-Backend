const Team = require("../models/team.model");
const ParadoxUser = require("../models/paradoxUser.model");

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
        return res
          .status(200)
          .json({
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
            team.fieldOfficerId = uid;
            const controlOfficerId = team.controlOfficerId;
            fieldOfficerId = team.fieldOfficerId;
            const ControlOfficer = await ParadoxUser.findOne({
              uid: controlOfficerId,
            });

            user.save();
            return res.status(200).json({
              message: "Team Joined",
              success: true,
              data: {
                isInTeam: true,
                teamName: team.teamName,
                teamCode: team.teamCode,
                controlOffice: {
                  name: ControlOfficer.name,
                  uid: ControlOfficer.uid,
                  photoUrl: ControlOfficer.image,
                  position: "position",
                },
                fieldOfficer: {
                  name: user.name,
                  uid: user.id,
                  photoUrl: user.image,
                  position: "postion",
                },
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
  const newTeam = new Team({
    isInTeam: true,
    teamName: teamName,
    teamCode: Math.floor(Math.random() * 9000) + 1000,
    controlOfficerId: uid,
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
        user.save();
        newTeam
          .save()
          .then((result) => {
            return res.status(200).json({
              message: "User Created",
              success: true,
              data: {
                isInTeam: true,
                teamName: teamName,
                teamCode: newTeam.teamCode,
                controlOffice: {
                  name: user.name,
                  uid: user.uid,
                  photoUrl: user.image,
                  position: "position",
                },
                fieldOfficer: " ",
              },
            });
          })
          .catch((err) =>
            res.status(200).json({
              message: "Unable to create user",
              success: "false",
              data: " ",
            })
          );
      }
    }
  });
};

module.exports = { joinTeam, createTeam };
