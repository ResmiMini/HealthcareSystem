const Appointment = require("../models/Appointment");
const Doctor = require("../models/doctor");
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
  try {
    await connectDB();

    const { patientId } = req.params;

    const appointments = await Appointment
      .find({ patientId })
      .sort({ date: 1 });

    // 🔥 Manually attach doctor name
    const result = await Promise.all(
      appointments.map(async (appt) => {
        const doctor = await Doctor.findOne(
          { doctorId: appt.doctorId },   // STRING match
          { name: 1, specialization: 1 }
        );

        return {
          ...appt.toObject(),
          doctorName: doctor ? doctor.name : "Unknown",
          specialization: doctor ? doctor.specialization : "-"
        };
      })
    );

    res.status(200).json({
      success: true,
      count: result.length,
      appointments: result
    });

  } catch (err) {
    console.error("GET APPOINTMENTS ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
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

exports.getAllAppointmentsExceptToday = async (req, res) => {
  try {
    await connectDB();

    const { doctorId } = req.params;

    // 🔹 Start of today (UTC)
    const now = new Date();
    const startOfTodayUTC = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0, 0, 0, 0
    ));

    // 🔹 Start of tomorrow (UTC)
    const startOfTomorrowUTC = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0, 0, 0, 0
    ));

    const appointments = await Appointment.find({
      doctorId,
      $or: [
        { date: { $lt: startOfTodayUTC } },   // past
        { date: { $gte: startOfTomorrowUTC } } // future
      ]
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error("❌ Appointments error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
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