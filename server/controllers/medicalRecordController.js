const MedicalRecord = require("../models/MedicalRecord");

// Create record
exports.createRecord = async (req, res) => {
  try {
    const record = new MedicalRecord(req.body);
    await record.save();

    res.status(201).json({
      message: "Medical record created successfully",
      data: record
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all records
exports.getAllRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID

exports.getRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ➤ Get records by patient ID
exports.getByPatientId = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patientId: req.params.pid });

    if (records.length === 0) {
      return res.status(404).json({ message: "No records found for patient" });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get records by doctor ID
exports.getByDoctorId = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ doctorId: req.params.did });

    if (records.length === 0) {
      return res.status(404).json({ message: "No records found for doctor" });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get records by appointment ID
exports.getByAppointmentId = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ appointmentId: req.params.aid });

    if (records.length === 0) {
      return res.status(404).json({ message: "No records found for appointment" });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update record

exports.updateRecord = async (req, res) => {
  try {
    const updated = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({
      message: "Medical record updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete record
exports.deleteRecord = async (req, res) => {
  try {
    const deleted = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Medical record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
