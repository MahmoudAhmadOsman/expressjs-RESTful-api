var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send('respond with a resource');
  res.redirect("/users/register");
});

// router.get("/", function (req, res, next) {
//   res.render("users/index", {
//     title: "Register Forms ",
//   });
// });
router.get("/register", function (req, res, next) {
  res.render("users/register", {
    title: "Register New User ",
  });
});

router.get("/login", function (req, res, next) {
  res.send("LOGIN");
});
module.exports = router;
