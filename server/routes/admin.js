let express = require("express");
let router = express.Router();
let adminController = require("../controller/admin");
let authorization = require("../controller/check-auth");

router.get("/admin", authorization.Admin, adminController.displayHomePage);
router.get("/admin/home", authorization.Admin, adminController.displayHomePage);

router.get("/admin/applicants", authorization.Admin, adminController.displayApplicantsPage);

router.get("/admin/applications", authorization.Admin, adminController.displayApplicationsPage);

router.get("/admin/prompts", authorization.Admin, adminController.displayPromptsPage);

router.post("/admin/prompts", authorization.Admin, adminController.processPromptFilter);

router.get("/admin/prompts/create/:settings", authorization.Admin, adminController.displayCreatePromptPage);

router.post("/admin/prompts/create/:settings", authorization.Admin, adminController.processCreatePromptPage);

router.get("/admin/prompts/view/:id", authorization.Admin, adminController.displayViewPage);

router.get("/admin/prompts/edit/:id", authorization.Admin, adminController.displayEditPage);

router.get("/admin/prompts/delete/:id", authorization.Admin, adminController.processDeletePrompt);

router.post("/admin/prompts/edit/:id", authorization.Admin, adminController.processSavePrompt);

router.get("/admin/prompts/changestatus/:id", authorization.Admin, adminController.processPromptStatus);

router.get("/admin/document/view/:id", authorization.Admin, adminController.displayViewDocumentPage);

router.get("/admin/document/approve/:id", authorization.Admin, adminController.processApproveDocument);

router.get("/admin/document/reject/:id", authorization.Admin, adminController.processRejectDocument);

module.exports = router;