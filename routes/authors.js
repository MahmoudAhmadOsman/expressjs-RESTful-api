const express = require("express");
const Author = require("../models/author");
const router = express.Router();

/* Authors index */

router.get("/", async (req, res) => {
  try {
    const authors = await Author.find()
      .sort({ createdAt: "desc" })
      .limit(10)
      .exec();
    res.render("authors/index", {
      title: "All Authors ",
      authors: authors,
    });
  } catch {
    res.redirect("/");
  }
});

/*load new Author form*/
router.get("/create", function (req, res, next) {
  res.render("authors/create", {
    title: "Add New Author ",
  });
});

//Create page
router.post("/add", function (req, res, next) {
  //res.send("Add new book");
  let author = new Author();
  author.name = req.body.name;
  author.email = req.body.email;
  author.phone = req.body.phone;
  author.address = req.body.address;
  author.message = req.body.message;

  // Check for error
  author.save(function (err) {
    if (err) {
      res.render("authors/create", {
        author: author,
      });
    } else {
      res.redirect("/authors");
    }
  });
});

//Show page

router.get("/:id/show", function (req, res) {
  Author.findById(req.params.id, function (err, author) {
    res.render("authors/show", {
      title: "Details of ",
      author: author,
    });
  });
});

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

//Delete Books

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
