const Prescription = require("../models/prescription");
const Medicine = require("../models/medicine");

exports.getPatientMedicinesDetailed = async (req, res) => {
  try {
    const { patientId } = req.params;

    // 1️⃣ Fetch prescriptions
    const prescriptions = await Prescription.find({ patientId });

    if (!prescriptions.length) {
      return res.json({ medicines: [] });
    }

    // 2️⃣ Extract medicines from prescriptions
    const prescribedMeds = prescriptions.flatMap(p => p.medicines);

    // 3️⃣ Get medicine IDs
    const medicineIds = prescribedMeds.map(m => m.medicineId);

    // 4️⃣ Fetch medicine details
    const medicineDetails = await Medicine.find({
      medicineId: { $in: medicineIds }
    });

    // 5️⃣ Merge prescription + medicine data
    const finalMedicines = prescribedMeds.map(pm => {
      const med = medicineDetails.find(
        m => m.medicineId === pm.medicineId
      );

      return {
        medicineId: pm.medicineId,
        name: med?.name || "Unknown",
        category: med?.category || "N/A",
        dosage: pm.dosage,
        frequency: pm.frequency
      };
    });

    res.json({
      success: true,
      medicines: finalMedicines
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new prescription
exports.createPrescription = async (req, res) => {
  try {
    console.log("VERCEL medicines:", req.body.medicines);

    const { patientId, doctorId, appointmentId, medicines } = req.body;

    if (!medicines || medicines.some(m => !m.medicineId)) {
      return res.status(400).json({ message: "Medicine ID missing" });
    }

    const prescription = new Prescription({
      patientId,
      doctorId,
      appointmentId,
      medicines
    });

    await prescription.save();

    res.status(201).json({
      message: "Prescription created",
      prescription
    });
  } catch (err) {
    console.error("Prescription error:", err);
    res.status(500).json({ message: err.message });
  }
};




//  Get all prescriptions
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
    const { patientId } = req.params;

    // 1️⃣ Get prescriptions
    const prescriptions = await Prescription.find({ patientId });

    // 2️⃣ Extract medicines 
    const prescribedMedicines = prescriptions.flatMap(
      p => p.medicines
    );

    // 3️⃣ Extract medicineIds
    const medicineIds = prescribedMedicines.map(
      m => m.medicineId
    );

    // 4️⃣ Get medicine master data
    const medicineDocs = await Medicine.find({
      medicineId: { $in: medicineIds }
    });

    // 5️⃣ Merge prescription + medicine master
    const finalMedicines = prescribedMedicines.map(pm => {
      const med = medicineDocs.find(
        m => m.medicineId === pm.medicineId
      );

      return {
        medicineId: pm.medicineId,

        // FROM MEDICINE TABLE
        name: med?.name || "Unknown",
        category: med?.category || "N/A",

        // ✅ FROM PRESCRIPTION TABLE
        dosage: pm.dosage,
        frequency: pm.frequency
      };
    });

    res.json({ medicines: finalMedicines });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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
