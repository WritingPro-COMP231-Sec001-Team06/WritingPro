let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create the visitor model instance
// let visitorModel = require("../models/visitor");
// let Visitor = visitorModel.Visitor;

module.exports.displayDashboardPage = (req, res, next) => {
  let randomDate = new Date(2021, 11, 10);
  let month = [
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let datestring = `${
    month[randomDate.getMonth() - 1]
  } ${randomDate.getDate()}, ${randomDate.getFullYear()}`;
  // example essay
  let essays = [
    {
      id: "15236",
      title: "My first essay title",
      date: datestring,
      status: "Complete",
      type: "Academic",
      promptTitle: [
        "This first prompt very very long long I'm gonna make it super long so I can test elipse",
        "Next prompt title",
      ],
    },
    {
      id: "52368",
      title: "My second some title",
      date: datestring,
      status: "Pending",
      type: "General",
      promptTitle: ["Some of my prompts"],
    },
    {
      id: "23451",
      title: "My second some title",
      date: datestring,
      status: "Pending",
      type: "General",
      promptTitle: ["Some of my prompts"],
    },
  ];
  res.render("student/dashboard", {
    title: "Dashboard",
    username: req.user ? req.user.username : "",
    essays: essays,
  });
};

module.exports.displayTestYourself = (req, res, next) => {
  res.render("student/test-yourself", {
    title: "test-yourself",
  });
};

/*
module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      username: req.user ? req.user.username : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server error?
    if (err) {
      return next(err);
    }
    // is there a visitor login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      //server error?
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (!req.user) {
    console.log("Here1");
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      username: req.user ? req.user.username : "",
    });
  } else {
    console.log("Here2");
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a visitor object

  let newVisitor = new Visitor({
    username: req.body.username,
    //password cover
    //password: req.body,password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    firstLanguage: req.body.firstLanguage,
    startingIELTSLevel: req.body.startingIELTSLevel,
    targetScore: req.body.targetScore,
    targetTestCountry: req.body.targetTestCountry,
    //displayName: req.body.displayName
  });

  console.log(newVisitor);

  Visitor.register(newVisitor, req.body.password, (err) => {
    if (err) {
      // seems no problem in data
      console.log("Error: Inserting New Visitor");
      console.log(err);
      if (err.name == "UserExistError") {
        req.flash(
          "registerMessage",
          "Registration Error: Visitor Already Exists!"
        );
        console.log("Error: Visitor Already Exists!");
      }
      return res.redirect("/register");
    } else {
      //if no error exists, then registration is successful

      // redirect the user and authenticate them

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/");
        console.log("success register");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};
*/
