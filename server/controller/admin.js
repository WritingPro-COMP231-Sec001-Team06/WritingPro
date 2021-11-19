let express = require("express");

module.exports.displayHomePage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("../views/admin/home", { title: "Admin Home Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayApprovedPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("../views/admin/approved", { title: "Approved Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayPendingPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("../views/admin/pending", { title: "Pending Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayRejectedPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("../views/admin/rejected", { title: "Rejected Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayTask1Page = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("../views/admin/task1", { title: "Task 1 Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayTask2Page = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("../views/admin/task2", { title: "Task 2 Page", 
    username: req.user ? req.user.username: ''  });
  };