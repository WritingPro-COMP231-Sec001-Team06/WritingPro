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
    res.render("admin/home", { title: "Admin Home Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayApprovedPage = (req, res, next) => {
    res.render("admin/approved", { title: "Approved Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayPendingPage = (req, res, next) => {
    res.render("admin/pending", { title: "Pending Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayRejectedPage = (req, res, next) => {
    res.render("admin/rejected", { title: "Rejected Page", 
    username: req.user ? req.user.username: ''  });
  };

  module.exports.displayPromptsPage = (req, res, next) => {
    let filterStatus = {
      value: "none",
      display: "Status"
    };
    let filterTask = {
      value: "none",
      display: "Task"
    };
    let filterType = {
      value: "none",
      display: "Exam Type"
    };
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
        username: req.user ? req.user.username: '',
        filterStatus: filterStatus,
        filterTask: filterTask,
        filterType: filterType
      });
    });
  };

  module.exports.displayCreatePromptPage = (req, res, next) => {
    let settings = req.params.settings;
    let isTask1 = true;
    let isAcademic = false;
    let title = '';
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

  module.exports.displayEditPage = (req, res, next) => {
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
      res.render('admin/edit', {title: 'View Prompt',
      username: req.user ? req.user.username: '', prompt: {
        id: prompt._id,
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

  module.exports.processDeletePrompt = (req, res, next) => {
    Prompt.findByIdAndDelete(req.params.id, (err, id) => {
      if(err){
        console.log(error);
        res.end(err);
      }
      if(id){
        s3.deleteObject({Bucket: bucketName, Key: id.imageUrl});
        console.log("Deletion Successful...");
      }
    });
    res.redirect('/admin/prompts');
  };

  module.exports.processSavePrompt = (req, res, next) => {
    Prompt.findByIdAndUpdate(req.body.id, {imageDescription: req.body.imageDescription, promptMessage: req.body.prompt}, (err, sucess) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      console.log('Update Successful...');
      res.redirect('/admin/prompts');
    });
  };

  module.exports.processPromptStatus = (req, res, next) => {
    let data = req.params.id.split('=');
    if(data.length !== 2){
      return res.redirect("/admin/prompts");
    }
    let status = data[1] === "true" ? true : false;
    Prompt.findByIdAndUpdate(data[0], {isActive: !status}, (err, success) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      console.log('Change Status Successful...');
      console.log(success.isActive);
      res.redirect('/admin/prompts');
    });
  };

  module.exports.processPromptFilter = (req, res, next) => {
    let filterStatus = {
      value: "none",
      display: "Status"
    };
    let filterTask = {
      value: "none",
      display: "Task"
    };
    let filterType = {
      value: "none",
      display: "Exam Type"
    };
    let filter = {};
    if(req.body.filterStatus !== 'none'){
      filter.isActive = req.body.filterStatus === 'active' ? true : false;
      filterStatus.value = req.body.filterStatus;
      filterStatus.display = req.body.filterStatus === 'active' ? 'Active' : 'Inactive';
    }
    if(req.body.filterTask !== 'none'){
      filter.isTask1 = req.body.filterTask === 'task1' ? true : false;
      filterTask.value = req.body.filterTask;
      filterTask.display = req.body.filterTask === 'task1' ? 'Task 1' : 'Task 2';
    }
    if(req.body.filterType !== 'none'){
      filter.isAcademic = req.body.filterType === 'academic' ? true : false;
      filterType.value = req.body.filterType;
      filterType.display = req.body.filterType === 'academic' ? 'Academic' : 'General';
    }
    /*if(!/^\s*$/.test(req.body.filterStatus)){
      filter.isActive = req.body.filterStatus === 'true' ? true : false;
    }
    if(!/^\s*$/.test(req.body.filterTask)){
      filter.isTask1 = req.body.filterTask === 'true' ? true : false;
    }
    if(!/^\s*$/.test(req.body.filterType)){
      filter.isAcademic = req.body.filterType === 'true' ? true : false;
    }*/
    Prompt.find(filter, (err, prompts) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      console.log(prompts);
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
        username: req.user ? req.user.username: '',
        filterStatus: filterStatus,
        filterTask: filterTask,
        filterType: filterType
      });
    });
  };