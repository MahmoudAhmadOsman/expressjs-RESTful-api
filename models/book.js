//Book Schema
const mongoose = require("mongoose");
const coverImagaeBasePath = "uploads/bookCovers";
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
  coverImage: {
    type: String,
    require: true,
  },
  pageCount: {
    type: Number,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Author",
  },
});

module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImagaeBasePath = coverImagaeBasePath;
