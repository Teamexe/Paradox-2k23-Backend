const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  level: Number,
  location: String,
  category: String,
});

module.exports = mongoose.model("Question", QuestionSchema);
