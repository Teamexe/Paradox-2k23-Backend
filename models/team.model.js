const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamName: String,
  teamCode: String,
  player1: String,
  player2: String,
  controlOfficerId: String,
  fieldOfficerId: String,
});

module.exports = mongoose.model("Team", TeamSchema);
