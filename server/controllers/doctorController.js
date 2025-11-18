
const Login = require("../models/login");
const Doctor = require("../models/doctor");

exports.registerDoctor = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      address,
      phone,
      email,
    qualification,
    specialization
     
      
    } = req.body;

    // ✅ GENERATE NEXT USER ID
    const lastUser = await Login.findOne().sort({ userId: -1 });
    const newUserId = lastUser ? lastUser.userId + 1 : 1;

    // ✅ SAVE LOGIN DATA
    const login = new Login({
      userId: newUserId,
      username,
      password
    });

    await login.save();

    // ✅ SAVE DOCTOR DATA WITH SAME userId
    const doctor = new Doctor({
      userId: newUserId,
      doctorId: "D" + String(newUserId).padStart(4, "0"),
      name,
      address,
     phone,
     email,
    qualification,
    specialization,     
       
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor registered successfully",
      login,
      doctor
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
