
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {addStaff} = require("../controllers/staffController");

router.post("/addStaff", upload.single("resume"),addStaff);

module.exports = router;
