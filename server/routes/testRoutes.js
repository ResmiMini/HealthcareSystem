const express = require("express");
const router = express.Router();

const {  addTest,getAllTests} = require("../controllers/testController");

// ✅ Add new test
router.post("/addtest", addTest);
router.get("/getalltest",getAllTests);
module.exports = router;
