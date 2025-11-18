
const express = require("express");
const router = express.Router();
const { registerStaff } = require("../controllers/staffController");

router.post("/register", registerStaff);

module.exports = router;
