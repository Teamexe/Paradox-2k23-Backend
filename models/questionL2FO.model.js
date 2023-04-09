const mongoose = require("mongoose");

const QuestionL2FOSchema = new mongoose.Schema({
  level: Number,
  id: Number,
  answer: String,
  image: String,
  question: String,
  hint: String,
  category: String,
  isAnswerRequired: Boolean,
});

module.exports = mongoose.model("QuestionL2FO", QuestionL2FOSchema);
