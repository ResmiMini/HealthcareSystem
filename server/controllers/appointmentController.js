const Appointment = require("../models/Appointment");

//book an appointment


exports.bookAppointment = async (req, res) => {
  try {
    const { appointmentId, patientId, doctorId, date,reason } = req.body;

    const newAppointment = new Appointment({
      appointmentId,
      patientId,
      doctorId,
      date,
      reason
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//patient checking for upcoming appointments


exports.getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;  // P1001

    const appointments = await Appointment.find({ patientId });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this patient" });
    }

    res.status(200).json({
      patientId,
      totalAppointments: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


