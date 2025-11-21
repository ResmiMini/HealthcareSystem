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

  diagnosis: {
    type: String,
    required: true
  },

  treatment: {
    type: String,
    required: true
  },

   
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate Medical Record ID => MR0001, MR0002...
medicalRecordSchema.pre("save", async function (next) {
  if (!this.recordId) {
    const count = await mongoose.model("MedicalRecord").countDocuments();
    this.recordId = "MR" + String(count + 1).padStart(4, "0");
  }
  next();
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
