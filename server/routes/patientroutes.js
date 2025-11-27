const express = require("express");
const { addPatient, getAllPatients, getPatientById } = require("../controllers/patientcontroller");

const router = express.Router();

router.post("/addpatient", addPatient);
router.get("/allpatient", getAllPatients);
router.get("/:patientId", getPatientById);

module.exports = router;
