let express = require("express");
let router = express.Router();
let indexController = require("../controller/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);
router.get("/home", indexController.displayHomePage);

//router.post("/", indexController.exampleCreatePage);

module.exports = router;
