const mongoose = require("mongoose");

const QuestionL2COSchema = new mongoose.Schema({
  level: Number,
  id: Number,
  answer: String,
  image: String,
  question: String,
  hint: String,
  category: String,
  isAnswerRequired: Boolean,
});

module.exports = mongoose.model("QuestionL2CO", QuestionL2COSchema);
