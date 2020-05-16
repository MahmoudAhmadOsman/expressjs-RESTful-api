//Book Schema
const mongoose = require("mongoose");

let gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
