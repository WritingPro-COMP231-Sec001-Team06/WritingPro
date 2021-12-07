let express = require("express");
let router = express.Router();
let studentController = require("../controller/student");

// GET - /student
router.get("/", studentController.displayDashboardPage);
// GET - /student/dashboard
router.get("/dashboard", studentController.displayDashboardPage);
// GET - /student/test-yourself
router.get("/test-yourself", studentController.displayTestYourselfCustomization);
// POST - /student/test-yourself
router.post("/test-yourself", studentController.processTestYourselfCustomization);
// POST - /student/test-yourself/submit
router.post("/test-yourself-single/submit", studentController.submitSingleEssay);
// POST - /student/test-yourself/submit
router.post("/test-yourself-multiple/submit", studentController.submitEssays);
// GET - /student/test-yourself/test/single
router.get("/test-yourself/test/single", studentController.displayTestYourselfSingle);
// GET - /student/test-yourself/test/multiple
router.get("/test-yourself/test/multiple", studentController.displayTestYourselfMultiple);
// GET - /student/feedbacks
router.get("/feedbacks", studentController.displayFeedbacks);
// GET - /student/feedbacks/id
router.get("/feedbacks/detail", studentController.displayFeedback);

module.exports = router;
