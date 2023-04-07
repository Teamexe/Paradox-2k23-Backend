const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamName: String,
  teamCode: String,
  player1: String,
  player2: String,
  controlOfficerId: String,
  currQues: String,
  fieldOfficerId: String,
  score: Number,
});

module.exports = mongoose.model("Team", TeamSchema);
