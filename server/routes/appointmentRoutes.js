const express = require("express");
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentController");
const {getAllAppointmentsExceptToday, getAppointmentsByPatientId,getAppointmentsByDoctorId,deleteAppointmentById} = require("../controllers/appointmentController");

router.post("/bookappointment", bookAppointment);
router.get("/viewappointment/:patientId", getAppointmentsByPatientId);
router.get("/getByDoctorId/:doctorId",getAppointmentsByDoctorId);
router.delete("/deleteappointment/:appointmentId", deleteAppointmentById);
router.get("/getBycomingappDoctorId/:doctorId",getAllAppointmentsExceptToday);

module.exports = router;
