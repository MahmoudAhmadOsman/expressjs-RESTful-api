var express = require("express");
const Gallery = require("../models/gallery");
var router = express.Router();

router.get("/", function (req, res, next) {
  //res.send("Gallery");
  res.render("gallery/index", {
    title: "Gallery Page ",
  });
});

router.get("/create", function (req, res, next) {
  //res.send("Gallery");
  res.render("gallery/create", {
    title: "Upload New File ",
  });
});

//Post

module.exports = router;
