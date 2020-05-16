var express = require("express");
const Register = require("../models/register");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send('respond with a resource');
  res.redirect("/users/register");
});

router.get("/register", function (req, res, next) {
  res.render("users/register", {
    title: "Register New User ",
  });
});

router.get("/login", function (req, res, next) {
  // res.send("LOGIN");
  res.render("users/login", {
    title: "Login ",
  });
});

//Register new user
router.post("/add", function (req, res, next) {
  //res.send("Registered new user");
  const user = new Register({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
  });
  user.save((err, newUser) => {
    if (err) {
      res.render("users/register", {
        user: user,
      });
    } else {
      res.redirect("/users/login");
    }
  });
});

module.exports = router;
