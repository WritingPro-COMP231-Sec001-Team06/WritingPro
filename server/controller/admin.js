let express = require("express");

module.exports.displayAdminHomePage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("../views/admin/home", { title: "Admin Home Page", 
    username: req.user ? req.user.username: ''  });
  };