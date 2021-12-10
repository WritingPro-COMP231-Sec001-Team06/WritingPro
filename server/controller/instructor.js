let express = require("express");
let fs = require("fs");
let AWS = require('aws-sdk');
let tmp = require('tmp');
let DocumentMetadata = require('../models/document-metadata');

const accessKey = 'AKIA2VR32QISDVBT3LHG';
const secretKey = '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';

const bucketName = 'comp231writingpro';

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: 'us-east-1'
});

module.exports.displayDocumentsPage = (req, res, next) => {
    DocumentMetadata.find({username: req.user.username}, (err, metadatas) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        res.render("instructor/documents", { 
            title: "Documents",
            username: req.user ? req.user.username : '',
            metadatas: metadatas
        });
    });
}

module.exports.displayInstructorHomePage = (req, res, next) => {
    res.render("instructor/home", { 
        title: "Home",
        username: req.user ? req.user.username : ''
    });
}

module.exports.displayUploadDocumentPage = (req, res, next) => {
    if(req.user.role === "instructor" && req.user.isApproved){
        res.redirect("/instructor");
    }
    res.render("instructor/upload", { 
        title: "upload",
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
        username: req.user.username,
        title: req.body.title,
        description: req.body.description,
        filename: key,
        status: "pending",
        dateUploaded: Date.now()
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
            title: "upload",
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
        if(documentMetadata.username === req.user.username){
           
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