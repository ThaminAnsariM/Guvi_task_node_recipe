const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  resetToken: String,
  resetTokenExpiration: Date,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
