const express = require("express");
const router = express.Router();
const controller = require("../controllers/prescriptionController");

// CRUD
// router.post("/addprescription", controller.createPrescription);
router.post(
  "/addprescription",
  (req, res, next) => {
    console.log("🔥 /addprescription route HIT");
    next();
  },
  controller.createPrescription
);
router.get("/", controller.getAllPrescriptions);
router.get("/:id", controller.getPrescriptionById);
router.put("/:id", controller.updatePrescription);
router.delete("/:id", controller.deletePrescription);

// Search

router.get("/patientviewmedicine/:patientId", controller.getPrescriptionsByPatient);
router.get("/doctor/:doctorId", controller.getPrescriptionsByDoctor);

module.exports = router;
