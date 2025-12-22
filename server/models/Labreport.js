const mongoose = require("mongoose");

const labReportSchema = new mongoose.Schema({
  labreportId: {
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
  testId: {
    type: String,
    required: true
  },
   result: {
      type: String,
      default: null
    },
   payment: {
      type: String,
      enum: ["paid", "not paid"],
      default: "not paid",
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

module.exports =
  mongoose.models.LabReport ||
  mongoose.model("LabReport", labReportSchema);
