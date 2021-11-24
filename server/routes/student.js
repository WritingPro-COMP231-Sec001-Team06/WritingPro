let express = require("express");
let router = express.Router();
let studentController = require("../controller/student");

// GET - /student
router.get("/", studentController.displayDashboardPage);
// GET - /student/dashboard
router.get("/dashboard", studentController.displayDashboardPage);
// GET - /student/test-yourself
router.get("/test-yourself", studentController.displayTestYourselfCustomization);
// GET - /student/test-yourself/test/single
router.get("/test-yourself/test/single", studentController.displayTestYourselfSingle);
// GET - /student/test-yourself/test/multiple
router.get("/test-yourself/test/multiple", studentController.displayTestYourselfMultiple);
// GET - /student/feedbacks
router.get("/feedbacks", studentController.displayFeedbacks);
// GET - /student/feedbacks/id
router.get("/feedbacks/detail", studentController.displayFeedback);

module.exports = router;
