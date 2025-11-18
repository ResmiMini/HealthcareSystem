const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  frequency: String,
  duration: String
});

const prescriptionSchema = new mongoose.Schema({
  prescriptionId: {
    type: String,
    unique: true
  },
  patientId: String,
  doctorId: String,
  appointmentId: String,
  date: {
    type: Date,
    default: Date.now
  },
  disease: String,
  medicines: [medicineSchema],
  notes: String
});

//  Auto-generate ID before saving
prescriptionSchema.pre("save", async function (next) {
  if (this.prescriptionId) return next(); // if already set, skip

  try {
    const last = await mongoose
      .model("Prescription")
      .findOne({})
      .sort({ _id: -1 });

    let nextNumber = 1001;

    if (last && last.prescriptionId) {
      const lastNum = parseInt(last.prescriptionId.replace("PR", ""));
      nextNumber = lastNum + 1;
    }

    this.prescriptionId = "PR" + nextNumber;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
