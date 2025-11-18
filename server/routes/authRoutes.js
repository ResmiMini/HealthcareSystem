const express = require("express");
const router = express.Router();
const { register } = require("../controllers/patientcontroller");

router.post("/register", register);

module.exports = router;
