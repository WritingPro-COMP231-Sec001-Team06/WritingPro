let express = require("express");
let fs = require("fs");
let AWS = require('aws-sdk');

const accessKey = 'AKIA2VR32QISDVBT3LHG';
const secretKey = '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';

const bucketName = 'comp231writingpro';

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: 'us-east-1'
});

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
    console.log("here");
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

  module.exports.displayAddTask1Page = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/task1_add", { title: "Task 1 Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.processAddTask1Page = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    const fileContent = fs.readFileSync('C:/Users/DONDON/Downloads/WritingPro/public/images/ieltsbarchart.png');

    let params = {
      Bucket: bucketName,
      Key: 'example.png',
      Body: fileContent
    };

    s3.upload(params, function(err, data) {
      if(err){
        throw err;
      }
      console.log('File uploaded successfully. ', data.Location);
    });

    console.log(req.body.prompt);
    console.log(req.body.imageInput);
    res.redirect("/admin/home");
  };