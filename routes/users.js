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

  req.checkBody("name", "Name is required").notEmpty();

  user.save((err, newUser) => {
    if (err) {
      res.render("users/register", {
        user: user,
      });
    } else {
      //res.send("Thanks for registering");
      res.redirect("/users/login");
      //After registration take the user to the thanks you or confirmation page
      // res.redirect("/users/confirmation");
    }
  });
});

// router.post("/add", function (req, res, next) {

//   const name = req.body.name;
//   const email = req.body.email;
//   const username = req.body.username;
//   const password = req.body.password;
//   const password2 = req.body.password2;
//   req.checkBody("name", "Name is required").notEmpty();
//   req.checkBody("email", "Email is not valid").isEmail();
//   req.checkBody("username", "Username is required").notEmpty();
//   req.checkBody("password", "Password is required").notEmpty();
//   req
//     .checkBody("password2", "Passwords do not match")
//     .equals(req.body.password);

//   //Check Errors
//   let errors = req.validationErrors();
//   if (errors) {
//     res.render("users/register", {
//       errors: errors,
//     });
//   } else {
//     let newUser = new Register({
//       name: name,
//       email: email,
//       username: username,
//       password: password,
//     });
//     //Hash the password using bcrypt
//     bcrypt.genSalt(10, function (err, salt) {
//       bcrypt.hash(newUser.passport, salt, function (err, hash) {
//         if (err) {
//           console.log(err);
//         }
//         newUser.password = hash;

//         newUser.save(function (err) {
//           if (err) {
//             console.log(err);
//             return;
//           } else {
//             res.redirect("/users/login");
//           }
//         });
//       });
//     });
//   }
// });

// Bring passport config to here

// require("../config/passport")(passport);

//Bring these middleware - Passport Middleware
router.use(passport.initialize());
router.use(passport.session());

//Get login FORM
router.get("/login", function (req, res, next) {
  // res.send("LOGIN");
  res.render("users/login", {
    title: "Login ",
  });
});

//Get Login info

router.post("/login", function (req, res, next) {
  res.send("LOGIN");
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
