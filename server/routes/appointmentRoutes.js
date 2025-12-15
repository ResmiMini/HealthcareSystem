const express = require("express");
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentController");
const { getAppointmentsByPatientId,getAppointmentsByDoctorId,deleteAppointmentById} = require("../controllers/appointmentController");

router.post("/bookappointment", bookAppointment);
router.get("/viewappointment/:patientId", getAppointmentsByPatientId);
router.get("/getByDoctorId/:doctorId",getAppointmentsByDoctorId);
router.delete("/deleteappointment/:appointmentId", deleteAppointmentById);
module.exports = router;
