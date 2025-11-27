const mongoose = require("mongoose");

// Auto-generate patientId using a counter
const generatePatientId = () => {
  return "PAT" + Math.floor(1000 + Math.random() * 9000); 
};

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,        
      ref: "Login",
      required: true
    },

    patientId: {
      type: String,
      default: generatePatientId,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    dob: {
      type: Date
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    blood_group: {
      type: String,
      required: true
    },

    insurance: {
      type: Boolean,
      default: false
    }
  })
module.exports = mongoose.model("Patient",patientSchema);