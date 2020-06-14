var express = require("express");

const bcrypt = require("bcryptjs");
const passport = require("passport");
var router = express.Router();
const Register = require("../models/register");
/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send('respond with a resource');
  res.redirect("/users/register");
});

//Get User Registeration form
router.get("/register", function (req, res, next) {
  res.render("users/register", {
    title: "Register ",
  });
});

//Register new user
router.post("/add", function (req, res, next) {
  //res.send("Registered new user");
  const user = new Register({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2,
  });

  // req.checkBody("name", "Name is required").notEmpty();

  user.save((err, newUser) => {
    if (err) {
      res.render("users/register", {
        user: user,
      });
    } else {
      //res.send("Thanks for registering");
      //res.redirect("/users/login");
      //After registration take the user to the thanks you or confirmation page
      res.redirect("/users/confirm");
    }
  });
});

//Bring these middleware - Passport Middleware
// router.use(passport.initialize());
// router.use(passport.session());

//Get login FORM
router.get("/login", function (req, res, next) {
  // res.send("LOGIN");
  res.render("users/login", {
    title: "Login ",
  });
});

//Get Login info

// router.post("/login", function (req, res, next) {
//   res.send("LOGIN");
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/users/login",
//     failureFlash: true,
//   })(req, res, next);
// });

//Confirmation page
router.get("/confirm", function (req, res, next) {
  //res.send("Confirmation Page");
  res.render("users/confirm", {
    title: "Registration Confirmation",
  });
});
module.exports = router;
