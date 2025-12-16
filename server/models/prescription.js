const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    medicineId:{type: String,required:true},
  dosage: String,
  frequency: String,
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
  medicines: [medicineSchema],
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
