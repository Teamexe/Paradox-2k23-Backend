const mongoose = require("mongoose");

const QuestionL2COSchema = new mongoose.Schema({
  level: Number,
  id: Number,
  answer: String,
  image: String,
  location: String,
  hint: String,
  category: String,
  isAnswerRequried: Boolean,
});

module.exports = mongoose.model("QuestionL2CO", QuestionL2COSchema);
