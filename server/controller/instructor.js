let express = require("express");
let fs = require("fs");
let AWS = require('aws-sdk');
let tmp = require('tmp');
let DocumentMetadata = require('../models/document-metadata');
let MockTest = require('../models/mocktest');
const mocktest = require("../models/mocktest");
let Essays = require("../models/essay");
let Prompt = require('../models/prompt');
let Feedback = require('../models/feedback');

const accessKey = 'AKIA2VR32QISDVBT3LHG';
const secretKey = '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';

const bucketName = 'comp231writingpro';

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: 'us-east-1'
});

module.exports.displayDocumentsPage = (req, res, next) => {
    DocumentMetadata.find({instructorId: req.user._id}, (err, metadatas) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        res.render("instructor/documents", { 
            title: "Documents",
            role: "Instructor",
            username: req.user ? req.user.username : '',
            metadatas: metadatas
        });
    });
}

module.exports.displayInstructorHomePage = (req, res, next) => {
    res.render("instructor/home", { 
        title: "Home",
        role: "Instructor",
        username: req.user ? req.user.username : ''
    });
}

module.exports.displayUploadDocumentPage = (req, res, next) => {
    if(req.user.role === "instructor" && req.user.isApproved){
        res.redirect("/instructor");
    }
    res.render("instructor/upload", { 
        title: "Upload",
        role: "Instructor",
        username: req.user ? req.user.username : ''
    });
}

module.exports.processUploadDocumentPage = (req, res, next) => {
    let isUploaded = false;
    let pdfFile = req.files.filename;
    let pathdir = tmp.fileSync();
    let tempk1 = (new Date().toISOString() + req.body.title)
    .toLowerCase().split(/[^a-z0-9]/);
    let key = tempk1.join('') + ".pdf";
    pdfFile.mv(pathdir.name, function(error) {
        if(error){
            throw error;
        }
        let fileContent = fs.readFileSync(pathdir.name);
        let params = {
            Bucket: bucketName,
            Key: key,
            Body: fileContent,
            ACL: 'public-read',
            ContentType: 'application/pdf',
            ContentDisposition: 'inline;'
        };
        s3.upload(params, function(err, data) {
            if(err){
                throw err;
            }
            console.log('File uploaded successfully.', data.Location);
            isUploaded = true;
        });
        pathdir.removeCallback();
    });
    DocumentMetadata.create({
        instructorId: req.user._id,
        title: req.body.title,
        description: req.body.description,
        filename: key,
        status: "pending",
        dateUploaded: Date.now(),
        fullName: req.user.firstName + " " + req.user.lastName
    }, (error, data) => {
        if(error){
            console.log(error);
            res.end(error);
        }
    });
    res.redirect("/instructor/documents");
};

module.exports.displayViewDocumentPage = (req, res, next) => {
    DocumentMetadata.findById(req.params._id, (err, documentMetadata) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        if(documentMetadata.username !== req.user.username){
            return res.redirect("/instructor/documents");
        }
        let pdfUrl = s3.getSignedUrl('getObject', {Bucket: bucketName, Key: documentMetadata.filename});
        res.render("instructor/view", {
            title: "View Document",
            role: "Instructor",
            username: req.user ? req.user.username : '',
            pdfUrl: pdfUrl
        });
    });
}

module.exports.processDeleteDocument = (req, res, next) => {
    
    DocumentMetadata.findById(req.params._id, (err, documentMetadata) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        if(documentMetadata.instructorId === req.user._id.toString()){
           
            DocumentMetadata.findByIdAndDelete(req.params._id, (err, id) => {
                if(err){
                    console.log(err);
                    res.end(err);
                }
                if(id){
                    console.log("Deletion Successful...");
                    s3.deleteObject({Bucket: bucketName, Key: documentMetadata.filename}, (err, deleted) => {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            });
        }
    });
    res.redirect('/instructor/documents');
}

module.exports.displayFeedbackPage =  (req, res, next) => {

    Essays.find({status: 'pending'}, (err, essays) => {
        if(essays){
            res.render("instructor/essay", {
                title: "Essays",
                role: "Instructor",
                username: req.user ? req.user.username : '',
                essays: essays
            });
        }
    });
}
module.exports.displayGradeEssayPage =  (req, res, next) => {
    Essays.findById(req.params.id, (err, essay) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        if(essay){
            Prompt.findById(essay.promptId, (err, result) => {
                if(result){
                    let presigned = result;
                    presigned.presigned = essay.IELTSType === "academic" && essay.essayPart === "1" ? s3.getSignedUrl('getObject', {Bucket: bucketName, Key: result.imageUrl}) : "";
                    res.render("instructor/grade", {
                        title: "Grade Essay",
                        role: "Instructor",
                        username: req.user ? req.user.username : '',
                        essay: essay,
                        prompt: presigned
                    });
                }
            });
        }
    });
}

module.exports.processGradeEssay = (req, res, next) => {
    Feedback.create({
        instructerID: req.user._id,
        estimatedScore: req.body.bandScore,
        feedbackBody: req.body.feedback,
        submissionID: req.body.essayId
    }, (err, success) => {
        if(success){
            Essays.findByIdAndUpdate(req.body.essayId, {feedback: success._id, status: "finished"},
                (err, result) => {
                    if(result){
                        console.log("Update Successful.");
                        res.redirect("/instructor/essay");
                    }
                });
        }
    })
}