const express = require("express");
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentController");
const { getAppointmentsByPatientId} = require("../controllers/appointmentController");

router.post("/bookappoint", bookAppointment);


router.get("/patient/:patientId", getAppointmentsByPatientId);

module.exports = router;
