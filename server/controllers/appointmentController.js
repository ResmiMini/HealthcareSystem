const Appointment = require("../models/Appointment");

//book an appointment


exports.bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId,date,} = req.body;
    console.log("Received data:", req.body); 

    // 1️⃣ Generate appointment ID
        const lastAppointment = await Appointment.findOne().sort({ createdAt: -1 });
    
        let newId = "AP001";
    
        if (lastAppointment) {
          const lastNum = parseInt(lastAppointment.appointmentId.replace("AP", ""));
          newId = "AP" + String(lastNum + 1).padStart(3, "0");
        }

    const newAppointment = new Appointment({
      appointmentId:newId,
      patientId,
      doctorId,
            date,
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
    const { patientId } = req.params;

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name")   // ← fetch only doctor name
      .sort({ date: 1 });

    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//appoint by doctor
exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const appointments = await Appointment.find({ doctorId });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.json({ appointments });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.deleteAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const deleted = await Appointment.findOneAndDelete({ appointmentId });

    if (!deleted) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};