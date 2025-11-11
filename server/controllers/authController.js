const Login = require("../models/login");
const Patient = require("../models/patient");

exports.register = async (req, res) => {
  try {
    const {
      username,
      password,
      role,
      patientId,
      name,
      address,
      age,
      email,
      phone,
      blood_group,
      insurance
    } = req.body;

    // ✅ 1. Auto-generate userId
    const lastUser = await Login.findOne().sort({ userId: -1 });
    const newUserId = lastUser ? lastUser.userId + 1 : 1;

    // ✅ 2. Create login record
    const loginUser = new Login({
      userId: newUserId,
      username,
      password,
      role
    });

    await loginUser.save();

    // ✅ 3. Create patient record (using loginId)
    const patient = new Patient({
      loginId: loginUser._id,
      patientId,
      name,
      address,
      age,
      email,
      phone,
      blood_group,
      insurance
    });

    await patient.save();

    res.status(201).json({
      message: "Registration successful",
      login: loginUser,
      patient: patient
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
