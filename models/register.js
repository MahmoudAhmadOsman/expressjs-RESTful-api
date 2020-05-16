const mongoose = require("mongoose");

let registerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
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
