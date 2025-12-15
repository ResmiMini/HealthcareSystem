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

    
    
    // ✅ 3. Create patient record (using loginId)
    const patient = new Patient({
      userId: newUserId,
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
