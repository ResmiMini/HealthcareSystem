const express = require("express");
const router = express.Router();

const {  addTest} = require("../controllers/testController");

// ✅ Add new test
router.post("/addtest", addTest);
module.exports = router;
