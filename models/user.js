const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = (module.exports = mongoose.model("User", userSchema));
