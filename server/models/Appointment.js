const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  patientId: { type:String, required: true },
  doctorId: { type: String, required: true },
    date: { type: Date, required: true },
},{ timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
