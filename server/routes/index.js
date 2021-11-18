let express = require("express");
let router = express.Router();
let indexController = require("../controller/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);
router.get("/home", indexController.displayHomePage);

// get route for displaying Login page 
router.get('/login', indexController.displayLoginPage);
// post route for processing Login page 
router.post('/login', indexController.processLoginPage);
// get route for displaying register page 
router.get('/register', indexController.displayRegisterPage);
// post route for processing register page 
router.post('/register', indexController.processRegisterPage);
// Perform logout 
router.get('/logout', indexController.performLogout);

//router.post("/", indexController.exampleCreatePage);

module.exports = router;
