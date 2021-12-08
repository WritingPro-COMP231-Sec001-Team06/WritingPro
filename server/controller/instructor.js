let express = require("express");
let fs = require("fs");
let AWS = require('aws-sdk');
let tmp = require('tmp');

module.exports.displayUploadDocumentsPage = (req, res, next) => {
    if(req.user.role === "instructor" && req.user.isApproved){
        res.redirect("/instructor");
    }
    res.render("instructor/upload", { 
        title: "upload",
        username: req.user ? req.user.username : ''
    });
}

module.exports.displayInstructorHomePage = (req, res, next) => {
    res.render("instructor/home", { 
        title: "Home",
        username: req.user ? req.user.username : ''
    });
}