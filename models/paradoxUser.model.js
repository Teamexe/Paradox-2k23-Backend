const mongoose = require("mongoose");

const ParadoxUserSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  image: String,
  reg_time: String,
  score: Number,
  isInTeam: Boolean,
  level: Number,
  attempts: Number,
  currQues: Number,
  refCode: String,
  teamCode: String,
  teamName: String,
  isSolo: Boolean,
  isLevelLocked: Boolean,
  nextQuestionNumber: Number,
  roll: String,
  coins: String,
  rank: String,
});

module.exports = mongoose.model("ParadoxUser", ParadoxUserSchema);
