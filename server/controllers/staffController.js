

const Login = require("../models/login");
const Staff = require("../models/staff");

exports.registerStaff = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
    address,
      phone,
      email,     
      qualification,
      departement,
      designation
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

    // ✅ SAVE STAFF DATA WITH SAME userId
    const staff = new Staff({
      userId: newUserId,
      staffId: "S" + String(newUserId).padStart(4, "0"),
      name,
      address,
     phone,
     email,
    qualification,
      departement,
      designation
       
    });

    await staff.save();

    res.status(201).json({
      message: "Staff registered successfully",
      login,
      staff
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
