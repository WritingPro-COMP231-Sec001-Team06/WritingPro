let express = require("express");
let router = express.Router();
let adminController = require("../controller/admin");

router.get("/admin", adminController.displayHomePage);
router.get("/admin/home", adminController.displayHomePage);

router.get("/admin/approved", adminController.displayApprovedPage);

router.get("/admin/pending", adminController.displayPendingPage);

router.get("/admin/rejected", adminController.displayRejectedPage);

router.get("/admin/prompts", adminController.displayPromptsPage);

router.get("/admin/prompts/create/:settings", adminController.displayCreatePromptPage);

router.post("/admin/prompts/create/:settings", adminController.processCreatePromptPage);

router.get("/admin/prompts/view/:id", adminController.displayViewPage);

module.exports = router;