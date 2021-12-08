let express = require("express");
let router = express.Router();
let instructorController = require('../controller/instructor');
let authorization = require("../controller/check-auth");

router.get("/instructor/documents", authorization.Instructor, instructorController.displayDocumentsPage);

router.get("/instructor/", authorization.Instructor, authorization.InstructorIsApproved, instructorController.displayInstructorHomePage);
router.get("/instructor/home", authorization.Instructor, authorization.InstructorIsApproved, instructorController.displayInstructorHomePage);

router.get("/instructor/documents/upload", authorization.Instructor, instructorController.displayUploadDocumentPage);

router.post("/instructor/documents/upload", authorization.Instructor, instructorController.processUploadDocumentPage);

router.get("/instructor/documents/view/:_id", authorization.Instructor, instructorController.displayViewDocumentPage);

router.get("/instructor/documents/delete/:_id", authorization.Instructor, instructorController.processDeleteDocument);

module.exports = router;