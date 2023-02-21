const mongoose = require("mongoose");

const LeaderBoardSchema = new mongoose.Schema({
  user: { type: String, title: User },
  name: { type: String, title: Name },
  image: { type: String, title: Image },
  level: { type: Number },
  attempts: Number,
  score: Number,
  coins: Number,
  refferal_availed: Boolean,
});

module.exports = mongoose.model("LeaderBoard", LeaderBoardSchema);
