var express = require("express");
const { JobList, JobDetail } = require("../controllers/JobListController");
const verifyToken = require("../middlewares/VerifyToken");
var router = express.Router();

router.get("/joblist", verifyToken, JobList);
router.get("/jobdetail/:id", verifyToken, JobDetail);

module.exports = router;
