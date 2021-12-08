let express = require("express");
let router = express.Router();
let adminController = require("../controller/admin");
let authorization = require("../controller/check-auth");

router.get("/admin", authorization.Admin, adminController.displayHomePage);
router.get("/admin/home", authorization.Admin, adminController.displayHomePage);

router.get("/admin/approved", authorization.Admin, adminController.displayApprovedPage);

router.get("/admin/pending", authorization.Admin, adminController.displayPendingPage);

router.get("/admin/rejected", authorization.Admin, adminController.displayRejectedPage);

router.get("/admin/prompts", authorization.Admin, adminController.displayPromptsPage);

router.post("/admin/prompts", authorization.Admin, adminController.processPromptFilter);

router.get("/admin/prompts/create/:settings", authorization.Admin, adminController.displayCreatePromptPage);

router.post("/admin/prompts/create/:settings", authorization.Admin, adminController.processCreatePromptPage);

router.get("/admin/prompts/view/:id", authorization.Admin, adminController.displayViewPage);

router.get("/admin/prompts/edit/:id", authorization.Admin, adminController.displayEditPage);

router.get("/admin/prompts/delete/:id", authorization.Admin, adminController.processDeletePrompt);

router.post("/admin/prompts/edit/:id", authorization.Admin, adminController.processSavePrompt);

router.get("/admin/prompts/changestatus/:id", authorization.Admin, adminController.processPromptStatus);

module.exports = router;