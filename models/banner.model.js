const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  redirectLink: String,
  imageUrl: String,
  id: String,
});

module.exports = mongoose.model("Banner", BannerSchema);
