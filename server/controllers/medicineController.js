const Medicine = require("../models/medicine");

// ➤ Add Medicine
exports.addMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();

    res.status(201).json({
      message: "Medicine added successfully",
      data: medicine,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ➤ Get All Medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get Medicine by ID (MongoDB _id)
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine)
      return res.status(404).json({ message: "Medicine not found" });

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Update Medicine
exports.updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMedicine)
      return res.status(404).json({ message: "Medicine not found" });

    res.json({
      message: "Medicine updated successfully",
      data: updatedMedicine,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ➤ Delete Medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!deletedMedicine)
      return res.status(404).json({ message: "Medicine not found" });

    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
