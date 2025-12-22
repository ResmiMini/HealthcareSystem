
const LabReport = require("../models/Labreport");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Test = require("../models/test");
const connectDB = require("../config/db");
// ➤ Create a new lab report


exports.createLabReport = async (req, res) => {
  try {
    await connectDB();

    const { patientId, doctorId, testId} = req.body;

    //  Validation
    if (!patientId || !doctorId || !testId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 🔢 AUTO-INCREMENT LAB REPORT ID
    const lastReport = await LabReport.findOne()
      .sort({ createdAt: -1 })
      .select("labreportId");

    let nextNumber = 1;

    if (lastReport && lastReport.labreportId) {
      nextNumber =
        parseInt(lastReport.labreportId.replace("LAB", ""), 10) + 1;
    }

    const labreportId = "LAB" + String(nextNumber).padStart(4, "0");

    // ✅ Create lab report
    const labReport = new LabReport({
      labreportId,
      patientId,
      doctorId,
      testId,
      result: null,          // explicitly null
      payment: "not paid"    // default
    });

    await labReport.save();

    res.status(201).json({
      success: true,
      message: "Lab report created successfully",
      data: labReport
    });

  } catch (error) {
    console.error("CREATE LAB REPORT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getLabReportsByPatient = async (req, res) => {
  await connectDB();
  try {
    const { patientId } = req.params;

    const reports = await LabReport.find({ patientId });

    const response = await Promise.all(
      reports.map(async (r) => {
        const doctor = await Doctor.findOne({ doctorId: r.doctorId });
        const test = await Test.findOne({ testId: r.testId });

        return {
          labReportId: r.labReportId,
          doctorName: doctor?.name,
          testName: test?.name,
          result: r.result || "Pending"
        };
      })
    );

    res.json(response);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.generateLabReportPDF = async (req, res) => {
  await connectDB();
  try {
    const { labReportId } = req.params;

    const report = await LabReport.findOne({ labReportId });
    if (!report) {
      return res.status(404).json({ message: "Not found" });
    }

    const doctor = await Doctor.findOne({ doctorId: report.doctorId });
    const patient = await Patient.findOne({ patientId: report.patientId });
    const test = await Test.findOne({ testId: report.testId });

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${labReportId}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(18).text("Healthcare Hospital", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text("LAB REPORT", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(11);
    doc.text(`Lab Report ID : ${labReportId}`);
    doc.text(`Patient Name  : ${patient?.name}`);
    doc.text(`Doctor Name   : ${doctor?.name}`);
    doc.text(`Test Name     : ${test?.name}`);
    doc.text(`Date          : ${new Date().toLocaleDateString()}`);

    doc.moveDown();
    doc.fontSize(12).text("Result:");
    doc.moveDown(0.5);
    doc.fontSize(11).text(report.result || "Pending");

    doc.moveDown(3);
    doc.text("Authorized Signature", { align: "right" });

    doc.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





















// ➤ Get all lab reports
exports.getAllLabReports = async (req, res) => {
  await connectDB();
  try {
    const reports = await LabReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get lab report by ID
exports.getLabReportById = async (req, res) => {
  await connectDB();
  try {
    const { labReportId } = req.params;
    const report = await LabReport.findOne({ labReportId });

    if (!report) {
      return res.status(404).json({ error: "Lab report not found" });
    }

    const doctor = await Doctor.findOne({ doctorId: report.doctorId });
    const patient = await Patient.findOne({ patientId: report.patientId });
    const test = await Test.findOne({ testId: report.testId });

    // ✅ SEND NAMES TO FRONTEND
    res.status(200).json({
      labReportId: report.labReportId,
      doctorName: doctor ? doctor.name : "Unknown Doctor",
      patientName: patient ? patient.name : "Unknown Patient",
      testName: test ? test.name : "Unknown Test",
      result: report.result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Update a lab report

  exports.updateLabResult = async (req, res) => {
  try {
    await connectDB();

    const { labReportId } = req.params;
    const { result } = req.body;

    const report = await LabReport.findOneAndUpdate(
      { labReportId },
      { result },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Lab Report not found" });
    }

    res.json({
      success: true,
      message: "Result updated successfully",
      report
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ➤ Delete lab report
exports.deleteLabReport = async (req, res) => {
  await connectDB();
  try {
    const deleted = await LabReport.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Lab report not found" });
    }

    res.status(200).json({ message: "Lab report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
