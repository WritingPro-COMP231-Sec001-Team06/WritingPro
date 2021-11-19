let express = require("express");

module.exports.displayHomePage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/home", { title: "Admin Home Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayApprovedPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/approved", { title: "Approved Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayPendingPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/pending", { title: "Pending Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayRejectedPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/rejected", { title: "Rejected Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayTask1Page = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/task1", { title: "Task 1 Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayTask2Page = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/task2", { title: "Task 2 Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.processAddTask1Page = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    console.log(req.body.prompt);
    res.redirect("/admin/home");
  };