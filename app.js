require("dotenv");
var createError = require("http-errors");
var express = require("express");
var partials = require("express-partials");
var path = require("path");
var cookieParser = require("cookie-parser");
var expressLayouts = require("express-ejs-layouts");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var multer = require("multer");
var logger = require("morgan");
var expressValidator = require("express-validator");
var slugify = require("slugify");
const passport = require("passport");

//Bring the Database
var config = require("./config/database");

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

let db = mongoose.connection;

// Check database connection
db.once("open", function () {
  console.log("Connected to MongoDB database");
});

//1st, Check for database errors
db.on("error", function (err) {
  console.log(err);
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authorRouter = require("./routes/authors");
var bookRouter = require("./routes/books");
var usersRouter = require("./routes/users");

var galleryRouter = require("./routes/gallery");

var app = express();

//Put validator after app express() otherwise it will not work
app.use(expressValidator());

//1. for heruku
const port = process.env.PORT || 5000;
app.listen(port);

// view engine setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
//custom Routes -moved to the top

app.use("/users", usersRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/gallery", galleryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// partials
app.use(partials());

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
