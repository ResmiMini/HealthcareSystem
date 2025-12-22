const Test = require("../models/test");
const connectDB = require("../config/db");

/* ✅ ADD NEW TEST with auto-increment T001 */
exports.addTest = async (req, res) => {
  try {
    await connectDB();

    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Test name and price are required"
      });
    }

    const existingTest = await Test.findOne({ name });
    if (existingTest) {
      return res.status(409).json({
        success: false,
        message: "Test already exists"
      });
    }

    const lastTest = await Test.findOne().sort({ createdAt: -1 });

    let testId = "T001";

    if (lastTest && lastTest.testId) {
      const lastNumber = parseInt(lastTest.testId.replace("T", ""));
      testId = `T${String(lastNumber + 1).padStart(3, "0")}`;
    }

    // ✅ Create Test
    const newTest = new Test({
      testId,
      name,
      price
    });

    await newTest.save();

    res.status(201).json({
      success: true,
      message: "Test added successfully",
      test: newTest
    });

  } catch (error) {
    console.error("ADD TEST ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
