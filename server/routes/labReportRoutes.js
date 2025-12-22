const express = require("express");
const router = express.Router();
const labReportController = require("../controllers/labReportController");

// Routes
router.post("/add", labReportController.createLabReport);
// router.get("/", labReportController.getAllLabReports);
router.get("/labreportbyid/:id", labReportController.getLabReportById);
router.get("/patientreport/:patientId", labReportController.getLabReportsByPatient);
router.put("/updateresult/:id", labReportController.updateLabResult );
router.get("/reportpdf/:labReportId", labReportController.generateLabReportPDF);

//router.delete("/:id", labReportController.deleteLabReport);

module.exports = router;
