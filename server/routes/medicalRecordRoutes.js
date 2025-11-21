const express = require("express");
const router = express.Router();
const controller = require("../controllers/medicalRecordController");

router.post("/add", controller.createRecord);
router.get("/", controller.getAllRecords);

router.get("/patient/:pid", controller.getByPatientId);
router.get("/doctor/:did", controller.getByDoctorId);
router.get("/appointment/:aid", controller.getByAppointmentId);

router.get("/:id", controller.getRecordById);
router.put("/:id", controller.updateRecord);
router.delete("/:id", controller.deleteRecord);

module.exports = router;
