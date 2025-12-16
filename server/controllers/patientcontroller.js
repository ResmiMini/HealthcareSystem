const Patient = require("../models/patient");

// ADD Patient

exports.addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();

    res.status(201).json({
      message: "Patient Registered Successfully",
      data: patient
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to register patient",
      details: err
    });
  }
};




// GET all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({ patientId: req.params.patientId });

    if (!patient)
      return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patient" });
  }
};


exports.getPatientByUserId = async (req, res) => {
  try {
    const patient = await Patient.findOne(
      { userId: req.params.userId},
      { patientId: 1 }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ success: true, patient });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

