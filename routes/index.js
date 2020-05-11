var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Welcoome to Alts Bookshop!" });
});

module.exports = router;
