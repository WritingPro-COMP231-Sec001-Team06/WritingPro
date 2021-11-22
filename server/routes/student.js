let express = require("express");
let router = express.Router();
let studentController = require("../controller/student");

// GET - /student
router.get("/", studentController.displayDashboardPage);
// GET - /student/dashboard
router.get("/dashboard", studentController.displayDashboardPage);
// GET - /student/test-yourself
router.get("/test-yourself", studentController.displayTestYourself);

module.exports = router;
