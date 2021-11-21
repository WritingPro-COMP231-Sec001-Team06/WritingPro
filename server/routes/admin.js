let express = require("express");
let router = express.Router();
let adminController = require("../controller/admin");

router.get("/admin", adminController.displayHomePage);
router.get("/admin/home", adminController.displayHomePage);

router.get("/admin/approved", adminController.displayApprovedPage);

router.get("/admin/pending", adminController.displayPendingPage);

router.get("/admin/rejected", adminController.displayRejectedPage);

router.get("/admin/task1", adminController.displayTask1Page);

router.get("/admin/task1acad/add", adminController.displayAddTask1AcadPage);

router.get("/admin/task1gen/add", adminController.displayAddTask1GenPage);

router.get("/admin/task2/add", adminController.displayAddTask2Page);

router.get("/admin/task2", adminController.displayTask2Page);

router.post("/admin/task1acad/add", adminController.processAddTask1AcadPage);



module.exports = router;