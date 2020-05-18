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
    const books = await Book.find().sort({ createdAt: "desc" }).limit(8).exec();
    res.render("books/index", {
      title: "All Books ",
      books: books,
    });
  } catch {
    res.redirect("/");
  }
});

// Create New Book
router.get("/create", function (req, res, next) {
  res.render("books/create", {
    title: "Create New Book ",
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

//Show Book page
router.get("/:id/show", function (req, res) {
  Book.findById(req.params.id, function (err, book) {
    // res.send("Show book");
    // return;
    res.render("books/show", {
      title: "Book Details",
      book: book,
    });
  });
});

//Edit Book page
router.get("/:id/edit", function (req, res) {
  Book.findById(req.params.id, function (err, book) {
    // res.send("edit book");
    // return;
    res.render("books/edit", {
      title: "Edit Book",
      book: book,
    });
  });
});

//Delete

router.delete("/:id", async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);

    await book.remove();

    res.redirect(`/books`);
  } catch {
    if (book == null) {
      res.redirect("/books");
    } else {
      res.redirect(`/book/${book.id}`);
    }
  }
});

module.exports = router;
