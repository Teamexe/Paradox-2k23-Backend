const mongoose = require("mongoose");

const ParadoxUserSchema = new mongoose.Schema({
  uid: String,
  name: String,
  roll: String,
  ref_code: String,
  team_code: String,
  team_name: String,
});

module.exports = mongoose.model("ParadoxUser", ParadoxUserSchema);
