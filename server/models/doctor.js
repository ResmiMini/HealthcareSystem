const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    
  doctorId: { type: String, required: true, unique: true },   // Like D1001
  name: { type: String, required: true },
  address:{type: String, required: true },
phone: { type: String, required: true },
 email: { type: String, required: true, unique: true },
  qualification: { type: String },

  specialization: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
