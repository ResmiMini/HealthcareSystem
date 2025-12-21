const Appointment = require("../models/Appointment");
const connectDB = require("../config/db");
//book an appointment


exports.bookAppointment = async (req, res) => {
  await connectDB();
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
  await connectDB();
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
  await connectDB();
  try {
    const { doctorId } = req.params;

    // Start & end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctorId,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ date: 1 });

    res.json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error("❌ Today doctor appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//upcoming appointment

exports.getUpcomingAppointmentsByDoctor = async (req, res) => {
  await connectDB();
  try {
    const { doctorId } = req.params;

    // End of today
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctorId,
      date: { $gt: endOfToday }  
    }).sort({ date: 1 });

    res.json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error("❌ Upcoming appointments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteAppointmentById = async (req, res) => {
  await connectDB();
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