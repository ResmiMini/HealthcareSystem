
const LabReport = require("../models/Labreport");
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
    const report = await LabReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ error: "Lab report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Update a lab report
exports.updateLabReport = async (req, res) => {
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
