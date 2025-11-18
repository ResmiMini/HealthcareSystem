const express = require("express");
const router = express.Router();
const controller = require("../controllers/prescriptionController");

// CRUD
router.post("/add", controller.createPrescription);
router.get("/", controller.getAllPrescriptions);
router.get("/:id", controller.getPrescriptionById);
router.put("/:id", controller.updatePrescription);
router.delete("/:id", controller.deletePrescription);

// Search

router.get("/patient/:patientId", controller.getPrescriptionsByPatient);
router.get("/doctor/:doctorId", controller.getPrescriptionsByDoctor);

module.exports = router;
