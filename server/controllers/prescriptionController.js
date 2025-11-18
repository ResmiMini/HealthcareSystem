const Prescription = require("../models/prescription");

// Create a new prescription

exports.createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();

    res.status(201).json({
      message: "Prescription created successfully",
      data: prescription
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get prescription by prescriptionId
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      prescriptionId: req.params.id
    });

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search prescriptions by patientId


exports.getPrescriptionsByPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patientId: req.params.patientId
    });

    if (prescriptions.length === 0) {
      return res.status(404).json({ message: "No prescriptions found" });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search prescriptions by doctorId


exports.getPrescriptionsByDoctor = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      doctorId: req.params.doctorId
    });

    if (prescriptions.length === 0) {
      return res.status(404).json({ message: "No prescriptions found" });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update prescription


exports.updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findOneAndUpdate(
      { prescriptionId: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({
      message: "Prescription updated successfully",
      data: updatedPrescription
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete prescription


exports.deletePrescription = async (req, res) => {
  try {
    const deleted = await Prescription.findOneAndDelete({
      prescriptionId: req.params.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
