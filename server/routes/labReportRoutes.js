const express = require("express");
const router = express.Router();
const labReportController = require("../controllers/labReportController");

// Routes
router.post("/add", labReportController.createLabReport);
// router.get("/", labReportController.getAllLabReports);
router.get("/labreportbyid/:id", labReportController.getLabReportById);
router.put("/updateresult/:id", labReportController.updateLabReport);
//router.delete("/:id", labReportController.deleteLabReport);

module.exports = router;
