let express = require("express");
let router = express.Router();
let studentController = require("../controller/student");

// GET - /student
router.get("/", studentController.displayDashboardPage);
// GET - /student/dashboard
router.get("/dashboard", studentController.displayDashboardPage);

module.exports = router;
