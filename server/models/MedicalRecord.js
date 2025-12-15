const mongoose = require("mongoose");


const medicalRecordSchema = new mongoose.Schema({
  recordId: {
    type: String,
    unique: true
  },

  patientId: {
    type: String,
    required: true
  },

  doctorId: {
    type: String,
    required: true
  },
  appointmentId: { 
    type: String, required: true
},
symptoms:{
  type:String,
  required:true
},

  diagnosis: {
    type: String,
    required: true
  },
    
  createdAt: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
