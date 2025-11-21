
const LabReport = require("../models/Labreport");

// ➤ Create a new lab report
exports.createLabReport = async (req, res) => {
  try {
    const labReport = new LabReport(req.body);
    await labReport.save();

    res.status(201).json({
      message: "Lab report created successfully",
      data: labReport
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get all lab reports
exports.getAllLabReports = async (req, res) => {
  try {
    const reports = await LabReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get lab report by ID
exports.getLabReportById = async (req, res) => {
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
  try {
    const updatedReport = await LabReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ error: "Lab report not found" });
    }

    res.status(200).json({
      message: "Lab report updated successfully",
      data: updatedReport
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Delete lab report
exports.deleteLabReport = async (req, res) => {
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
