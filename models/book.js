//Book Schema
const mongoose = require("mongoose");
let bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  price: {
    type: String,
    require: true,
  },

  publishedDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
  description: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
