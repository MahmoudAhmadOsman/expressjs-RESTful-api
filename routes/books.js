const express = require("express");
const Book = require("../models/book");
const Author = require("../models/author");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploadPath = path.join("public", Book.coverImagaeBasePath);

const imageMimeTypes = ["images/jped,", "images/jpg", "images/png"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null);
  },
});

/* Book Routes */
router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: "desc" })
      .limit(10)
      .exec();

    res.render("books/index", {
      title: "All Books ",

      books: books,
    });
  } catch {
    res.redirect("/");
  }
});

router.get("/create", async (req, res, next) => {
  res.render("books/create", {
    title: "Add New Book ",
  });
});

//Add or Create New Author

router.post("/add", upload.single("coverImage"), (req, res, next) => {
  const fileName = req.file != null ? req.file.fileName : null;
  const book = new Book({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    publishedDate: new Date(req.body.publishedDate),
    publishedDate: req.body.publishedDate,
    description: req.body.description,
    coverImageName: fileName,
  });
  book.save((err, newBook) => {
    if (err) {
      res.render("books/create", {
        book: book,
      });
    } else {
      res.redirect("/books");
    }
  });
});

//Delete

module.exports = router;
