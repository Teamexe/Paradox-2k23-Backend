const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  id: Number,
  level: Number,
  isLevelActive: Boolean,
  levelStartsInSeconds: Number,
  levelStartsAt: Number,
});

module.exports = mongoose.model("Level", LevelSchema);
