let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let fileUpload = require('express-fileupload');

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

//authentication objects
let localStrategy = passportLocal.Strategy;
// create a Visitor Model Instance
let visitorModel = require('../models/visitor');
let Visitor = visitorModel.Visitor;

//module for auth messaging and error management
let flash = require('connect-flash');

//Database Setup
let mongoose = require("mongoose");
let DB = require("./db");

mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});
mongoDB.once('connected', ()=>{
  console.log('MongoDB Connected');
});

mongoDB.on('disconnected', ()=>{
  console.log('MongoDB Disconnected');
});

mongoDB.on('reconnected', ()=>{
  console.log('MongoDB Reconnected');
});

let indexRouter = require("../routes/index");
let studentRouter = require("../routes/student");
let adminRouter = require("../routes/admin");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));
app.use(fileUpload());

//setup express session
let Auth = require('./auth');
app.use(session({
  secret: Auth.Secret,
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport visitor configuration

// impletment a User Authentication Strategy
passport.use(Visitor.createStrategy());

// serialize and deserialize the Visitor Info
passport.serializeUser(Visitor.serializeUser());
passport.deserializeUser(Visitor.deserializeUser());

app.use("/", indexRouter);
app.use("/student", studentRouter);
app.use("/", adminRouter);

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
