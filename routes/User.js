var express = require("express");
const { Login } = require("../controllers/UserController");
var router = express.Router();

/* GET users listing. */
router.post("/login", Login);

module.exports = router;
