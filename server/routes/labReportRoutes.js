const express = require("express");
const router = express.Router();
const labReportController = require("../controllers/labReportController");

// Routes
router.post("/add", labReportController.createLabReport);
router.get("/", labReportController.getAllLabReports);
router.get("/:id", labReportController.getLabReportById);
router.put("/:id", labReportController.updateLabReport);
router.delete("/:id", labReportController.deleteLabReport);

module.exports = router;
