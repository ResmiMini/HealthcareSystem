const express = require("express");
const router = express.Router();
const { addPatient } = require("../controllers/patientcontroller");

// Test route
router.get("/test", (req, res) => {
  res.send("✅ Patient route working");
});

// Add patient route
router.post("/add-patient", addPatient);

module.exports = router;
