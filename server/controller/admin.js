let express = require("express");
let fs = require("fs");
let AWS = require('aws-sdk');
let tmp = require('tmp');
let Prompt = require('../models/prompt');

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

  module.exports.displayAddTask1AcadPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/task1acad_add", { title: "Task 1 Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayAddTask1GenPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/task1gen_add", { title: "Task 1 Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayAddTask2Page = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    res.render("admin/task2_add", { title: "Task 1 Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.processAddTask1AcadPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    console.log(req.body.prompt);
    console.log(req.files.imageInput.name);
    let image = req.files.imageInput;
    let pathdir = tmp.dirSync();
    let temp = pathdir.name + image.name;
    image.mv(temp, function(error) {
      if(error){
        throw error;
      }
      const fileContent = fs.readFileSync(temp);
      let params = {
        Bucket: bucketName,
        Key: req.files.imageInput.name,
        Body: fileContent
      };
      s3.upload(params, function(err, data) {
        if(err){
          throw err;
        }
        console.log('File uploaded successfully. ', data.Location);
        let signedUrl = s3.getSignedUrl('getObject', params);
        console.log(signedUrl);


      });
    });
    pathdir.removeCallback();
    res.redirect("/admin/home");
  };

  