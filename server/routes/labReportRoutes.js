const express = require("express");
const router = express.Router();
const labReportController = require("../controllers/labReportController");

// Routes
router.post("/add", labReportController.createLabReport);
// router.get("/", labReportController.getAllLabReports);
router.get("/labreportbyid/:id", labReportController.getLabReportById);
router.get("/patientreport/:patientId", controller.getLabReportsByPatient);
router.put("/updateresult/:id", labReportController.updateLabResult );
router.get("/reportpdf/:labReportId", controller.generateLabReportPDF);

//router.delete("/:id", labReportController.deleteLabReport);

module.exports = router;
