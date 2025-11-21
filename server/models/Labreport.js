const mongoose = require("mongoose");

const labReportSchema = new mongoose.Schema({
  testId: {
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
  testName: {
    type: String,
    required: true
  },
  testDate: {
    type: Date,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate testId before saving
labReportSchema.pre("save", async function (next) {
  if (!this.testId) {
    const count = await mongoose.model("LabReport").countDocuments();
    this.testId = "LAB" + String(count + 1).padStart(4, "0"); // LAB0001, LAB0002...
  }
  next();
});

module.exports = mongoose.model("LabReport", labReportSchema);
