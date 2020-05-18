const mongoose = require("mongoose");
let authorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Author", authorSchema);
