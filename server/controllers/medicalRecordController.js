const MedicalRecord = require("../models/MedicalRecord");
const Doctor=require("../models/doctor");
const connectDB = require("../config/db");
// Create record
exports.createRecord = async (req, res) => {
 await connectDB(); 
  try {
    const { patientId, doctorId, appointmentId, symptoms, diagnosis } = req.body;
   

    const last = await MedicalRecord.findOne().sort({ createdAt: -1 });
    let recordId = "MR001";

    if (last) {
      const num = parseInt(last.recordId.replace("MR", ""));
      recordId = "MR" + String(num + 1).padStart(3, "0");
    }

    const record = new MedicalRecord({
      recordId,
      patientId,
      doctorId,
      appointmentId,
      symptoms,
      diagnosis,
    });

    await record.save();

    res.status(201).json({
      message: "Medical record created",
      record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all records
exports.getAllRecords = async (req, res) => {
  await connectDB();
  try {
    const records = await MedicalRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID

exports.getRecordById = async (req, res) => {
  await connectDB();
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
    await connectDB();

    const { patientId } = req.params;
    console.log(patientId);

    // 1️⃣ Get medical records of patient
    const records = await MedicalRecord.find({ patientId });

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No medical records found"
      });
    }

    // 2️⃣ Attach doctor name manually
    const recordsWithDoctorName = await Promise.all(
      records.map(async (record) => {
        const doctor = await Doctor.findOne(
          { doctorId: record.doctorId },
          { name: 1 }
        );

        return {
          ...record._doc,
          doctorName: doctor ? doctor.name : "Unknown Doctor"
        };
      })
    );

    res.status(200).json({
      success: true,
      records: recordsWithDoctorName
    });

  } catch (error) {
    console.error("GET RECORDS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ➤ Get records by doctor ID
exports.getByDoctorId = async (req, res) => {
  await connectDB();
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
  await connectDB();
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
  await connectDB();
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
  await connectDB();
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
