const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamName: String,
  teamCode: String,
  player1: String,
  player2: String,
  controlOfficer: {
    name: String,
    uid: String,
    photoUrl: String,
    position: {
      type: String,
      enum: ["CONTROL", "FIELD"],
    },
  },
  fieldOfficer: {
    name: String,
    uid: String,
    photoUrl: String,
    position: {
      type: String,
      enum: ["CONTROL", "FIELD"],
    },
  },
  controlOfficerId: String,
  currQues: Number,
  fieldOfficerId: String,
  score: Number,
});

module.exports = mongoose.model("Team", TeamSchema);
