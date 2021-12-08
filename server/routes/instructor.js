let express = require("express");
let router = express.Router();
let instructorController = require('../controller/instructor');
let authorization = require("../controller/check-auth");

router.get("/instructor/upload", instructorController.displayUploadDocumentsPage);

router.get("/instructor/", authorization.Instructor, instructorController.displayInstructorHomePage);
router.get("/instructor/home", authorization.Instructor, instructorController.displayInstructorHomePage);

module.exports = router;