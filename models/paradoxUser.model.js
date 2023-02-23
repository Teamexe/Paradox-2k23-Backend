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
  level: Number,
  attemps: Number,

  refCode: String,
  teamCode: String,
  teamName: String,
  isSolo: Boolean,
  isLevelLocked: Boolean,
  nextQuestionNumber: Number,
});

module.exports = mongoose.model("ParadoxUser", ParadoxUserSchema);
