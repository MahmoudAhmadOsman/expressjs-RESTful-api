const mongoose = require("mongoose");

let registerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
  password2: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Register", registerSchema);
