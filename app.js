var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

var logger = require("morgan");

//Bring the Database
const config = require("./config/database");

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

// Check database connection
db.once("open", function () {
  console.log("Connected to Mongo database");
});

//1st, Check for database errors
db.on("error", function (err) {
  console.log(err);
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
var authorRouter = require("./routes/authors");
//Books
var bookRouter = require("./routes/books");
var usersRouter = require("./routes/users");

app.use("/users", usersRouter);
//Books Route
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
