const express = require("express");
const Author = require("../models/author");
const router = express.Router();

/* Authors index */

router.get("/", async (req, res) => {
  // Search Author name
  let searchOptions = {};
  if (req.query != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);

    res.render("authors/index", {
      title: "All Authors ",
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

/*Author Routes*/
router.get("/create", function (req, res, next) {
  res.render("authors/create", {
    title: "Create New Author ",
  });
});

//Create page
router.post("/add", function (req, res, next) {
  const author = new Author({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    message: req.body.message,
  });
  author.save((err, newAuthor) => {
    if (err) {
      res.render("authors/create", {
        author: author,
        errorMessage: " Error occurred",
      });
    } else {
      res.redirect("/authors");
    }
  });
});

//Show page
router.get("/:id", function (req, res) {});

//Edit page
router.get("/:id/edit", function (req, res) {
  Author.findById(req.params.id, function (err, author) {
    res.render("authors/edit", {
      title: "Edit Author",
      author: author,
    });
  });
});

//Update page

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    (author.name = req.body.name),
      (author.email = req.body.email),
      (author.phone = req.body.phone);
    (author.address = req.body.address),
      (author.message = req.body.message),
      await author.save();

    res.redirect(`/authors`);
  } catch {
    if (author == null) {
      res.redirect("/authors");
    } else {
      res.render("authors/create", {
        author: author,
        errorMessage: "Error occured while updating",
      });
    }
  }
});

//Delete page
// Install method override library
router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);

    await author.remove();

    res.redirect(`/authors`);
  } catch {
    if (author == null) {
      res.redirect("/authors");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;
