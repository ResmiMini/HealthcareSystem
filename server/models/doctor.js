const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {type: Number, ref: "Login", required: true },
  doctorId: { type: String, required: true, unique: true },  
  name: { type: String, required: true },
  address:{type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String },
  specialization: { type: String, required: true },
  resume: { type: String },
  status:{type:String,
  enum: ["approved", "submitted"],
      default: "submitted"},
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
