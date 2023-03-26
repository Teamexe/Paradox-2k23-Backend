const mongoose = require("mongoose");

const PrizeSchema = new mongoose.Schema({
  image: String,
  url: String,
  title: String,
  body: String,
});

module.exports = mongoose.model("Prize", PrizeSchema);
