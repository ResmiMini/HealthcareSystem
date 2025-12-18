const Medicine = require("../models/medicine");

// ➤ Add Medicine
exports.addMedicine = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ AUTO-GENERATE UNIQUE MEDICINE ID
    const lastMedicine = await Medicine.findOne()
      .sort({ createdAt: -1 });

    let newMedicineId = "MED001";

    if (lastMedicine) {
      const lastNum = parseInt(
        lastMedicine.medicineId.replace("MED", "")
      );
      MedicineId =
        "MED" + String(lastNum + 1).padStart(3, "0");
    }

    const medicine = new Medicine({
      MedicineId,
      name,
      category,
      price
    });

    await medicine.save();

    res.status(201).json({
      message: "Medicine added successfully",
      medicine
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
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

exports.getByMedicineId = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      medicineId: req.params.medicineId
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found"
      });
    }

    res.status(200).json(medicine);

  } catch (error) {
    console.error("FETCH MEDICINE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message  
    });
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
