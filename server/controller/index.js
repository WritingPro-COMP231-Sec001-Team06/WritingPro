let express = require("express");
//let userProfile = require('../models/examplemodel');

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", { title: "Home Page" });
};

/*module.exports.exampleCreatePage = (req, res, next) => {
  console.log('Here');
  userProfile.create({
    username: "dbslapitan",
    password: 'password',
    firstName: 'Dirk Brandon',
    lastName: 'Lapitan',
    email: 'dbslapitan@gmail.com',
    dateCreated: Date.now(),
  },
  (err, survey) => {
    if(err)
        {
            console.log(err);
            res.end(err);
        }
    res.redirect('/');
  });
};*/

