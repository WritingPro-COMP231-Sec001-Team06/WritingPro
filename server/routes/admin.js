let express = require("express");
let router = express.Router();
let adminController = require("../controller/admin");

router.get("/admin", adminController.displayHomePage);
router.get("/admin/home", adminController.displayHomePage);

router.get("/admin/approved", adminController.displayApprovedPage);

router.get("/admin/pending", adminController.displayPendingPage);

router.get("/admin/rejected", adminController.displayRejectedPage);

router.get("/admin/task1", adminController.displayTask1Page);

router.get("/admin/task2", adminController.displayTask2Page);

module.exports = router;