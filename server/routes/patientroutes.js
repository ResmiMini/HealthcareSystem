const express = require("express");
const { addPatient, getAllPatients, getPatientById, getPatientByUserId} = require("../controllers/patientcontroller");

const router = express.Router();

router.post("/addpatient", addPatient);
router.get("/allpatient", getAllPatients);
router.get("/getByPatientId/:patientId", getPatientById);
router.get("/getByuserId/:userId", getPatientByUserId);

module.exports = router;
