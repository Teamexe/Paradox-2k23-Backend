const mongoose = require("mongoose");

const ParadoxUserSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  roll: String,
  refCode: String,
  teamCode: String,
  teamName: String,
  level: Number,
  isSolo: Boolean,
  isLevelLocked: Boolean,
  nextQuestionNumber: Number,
});

module.exports = mongoose.model("ParadoxUser", ParadoxUserSchema);
