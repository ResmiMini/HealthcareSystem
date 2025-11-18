const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  patientId: { type:String, ref: "Patient", required: true },
  doctorId: { type: String, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  reason:{type:String , required:true}
});

module.exports = mongoose.model("Appointment", appointmentSchema);
