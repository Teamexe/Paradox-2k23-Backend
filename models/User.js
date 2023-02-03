const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    // required: [true, "Please enter an password"],
    // minlength: [6, "Minimum password lenght is 6 characters"],
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
