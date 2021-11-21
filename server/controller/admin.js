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

  module.exports.displayPromptsPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    Prompt.find({}, (err, prompts) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      let mappedPrompts = prompts.map( prompt => {
        let task = prompt.isTask1 ? 'Task 1' : 'Task 2';
        let examType = prompt.isAcademic ? 'Academic' : 'General';
        let promptMessage = prompt.promptMessage.split('&#13;&#10;').join('\r\n');
        return {
          id: prompt._id,
          isTask1: prompt.isTask1,
          isAcademic: prompt.isAcademic,
          isActive: prompt.isActive,
          task: task,
          examType: examType,
          imageDescription: prompt.imageDescription,
          dateCreated: new Date(prompt.dateCreated).toLocaleString('en-US'),
          imageUrl: prompt.imageUrl,
          promptMessage: promptMessage,
          status: prompt.isActive ? 'Active' : 'Inactive'
        };
      });
      res.render('admin/prompts', {
        title: "Prompts",
        prompts: mappedPrompts,
        username: req.user ? req.user.username: ''
      });
    });
  };

  module.exports.displayCreatePromptPage = (req, res, next) => {
    let settings = req.params.settings;
    let isTask1 = true;
    let isAcademic = false;
    let title = '';
    if(!req.user){
      return res.redirect("/login");
    }
    if(settings === '1a'){
      isTask1 = true;
      isAcademic = true;
      title = 'Create Task 1 Academic';
    }
    else if(settings === '1g'){
      isTask1 = true,
      isAcademic = false;
      title = 'Create Task 1 General';
    }
    else if(settings === '2t'){
      isTask1 = false,
      isAcademic = true
      title = 'Create Task 2';
    }
    else{
      return res.redirect("/admin/prompts");
    }
    res.render("admin/create", { title: title, 
    isTask1: isTask1,
    isAcademic: isAcademic});
  };

  module.exports.processCreatePromptPage = (req, res, next) => {
    let isTask1 = req.body.isTask1 === 'true' ? true : false;
    let isAcademic = req.body.isAcademic === 'true' ? true : false;
    let imageDescription = '';
    let regexp = /\r\n/;
    let prompt = req.body.prompt;
    let key = '';
    if(!req.user)
    {
        return res.redirect("/login");
    }
    if(isTask1 && isAcademic)
    {
      let image = req.files.imageInput;
      let pathdir = tmp.fileSync();
      console.log(pathdir.name);
      let tempk0 = (new Date().toISOString() + image.name).toLowerCase();
      let tempk1 = tempk0.split(/[^a-z0-9]/);
      let ext = '.' + tempk1[tempk1.length - 1];
      let temp = pathdir.name;
      imageDescription = req.body.imageDescription;
      tempk1.splice(-1);
      key = tempk1.join('') + ext;
      image.mv(temp, function(error) {
        if(error){
          throw error;
        }
        let fileContent = fs.readFileSync(temp);
        let params = {
          Bucket: bucketName,
          Key: key,
          Body: fileContent
        };
        s3.upload(params, function(err, data) {
          if(err){
            req.flash('createError', 'Upload Unsuccessful');
            throw err;
          }
          console.log('File uploaded successfully. ', data.Location);
        });
        pathdir.removeCallback();
      });
    }
    Prompt.create({
      isTask1: isTask1,
      isAcademic: isAcademic,
      imageDescription: imageDescription,
      imageUrl: key,
      promptMessage: prompt.split(regexp).join('&#13;&#10;'),
      isActive: true
    },(err, data) => {
      if(err){
        console.log(err);
        res.end(err);
      }
    });
    res.redirect("/admin/prompts");
  };

  module.exports.displayViewPage = (req, res, next) => {
    if(!req.user)
    {
        return res.redirect("/login");
    }
    Prompt.findById(req.params.id, (err, prompt) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      let task = prompt.isTask1 ? 'Task 1' : 'Task 2';
      let examType = prompt.examType ? 'Academic' : 'General';
      let promptMessage = prompt.promptMessage.split('&#13;&#10;').join('\r\n');
      let imageUrl = '';
      if(prompt.isTask1 && prompt.isAcademic){
        imageUrl = s3.getSignedUrl('getObject', {Bucket: bucketName, Key: prompt.imageUrl});
      }
      res.render('admin/view', {title: 'View Prompt',
      username: req.user ? req.user.username: '', prompt: {
        isTask1: prompt.isTask1,
        isAcademic: prompt.isAcademic,
        isActive: prompt.isActive,
        task: task,
        examType: examType,
        imageDescription: prompt.imageDescription,
        dateCreated: new Date(prompt.dateCreated).toLocaleString('en-US'),
        imageUrl: imageUrl,
        promptMessage: promptMessage,
        status: prompt.isActive ? 'Active' : 'Inactive'
      }});
    });
  };