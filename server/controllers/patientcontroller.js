const Login = require("../models/login");
const PatientDetails = require("../models/patient");

exports.addPatient = async (req, res) => {
  try {
    const {
      userId,
      patientId,
      name,
      address,
      age,
      email,
      phone,
      blood_group,
      insurance,
    } = req.body;

    // ✅ Check if userId exists in login collection
    const user = await Login.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid userId. User not found." });
    }

    // ✅ Create patient record
    const patient = new PatientDetails({
      userId,
      patientId,
      name,
      address,
      age,
      email,
      phone,
      blood_group,
      insurance,
    });

    await patient.save();

    res.status(201).json({
      message: "✅ Patient added successfully",
      patient,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
