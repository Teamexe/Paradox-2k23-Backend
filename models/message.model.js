const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: String,
});

module.exports = mongoose.model("Level", MessageSchema);
