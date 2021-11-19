let express = require("express");
let router = express.Router();
let adminController = require("../controller/admin");

router.get("/admin", adminController.displayAdminHomePage);

module.exports = router;