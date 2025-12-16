const Login = require("../models/login");
const Doctor=require("../models/doctor");

exports.addlogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Login.findOne({ username});

    if (!user) {
      return res.status(401).json({
        message: "Invalid"
      });
    }
if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Doctor approval check
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({
        userId: Number(user.userId)
      });

      if (!doctor) {
        return res.status(403).json({
          message: "Doctor profile not found"
        });
      }

      if (doctor.status !== "approved") {
        return res.status(403).json({
          message: "Your account is not approved yet. Please wait for admin approval."
        });
      }
    }

    // ✅ Login success
    return res.status(200).json({
      user: {
        userId: user.userId,
        username: user.username,
        role: user.role
      },
      token: "dummy-token"
    });

  } catch (err) {
    console.error("LOGIN ERROR 👉", err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};



//user login using username and password


exports.loginUser = async (req, res) => {
  
  try {
    const { username, password } = req.body;

    console.log("LOGIN REQUEST:", username, password);

    const user = await Login.findOne({ username, password });
    console.log("LOGIN USER:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role === "doctor") {
      console.log("Checking doctor status for userId:", user.userId);

      const doctor = await Doctor.findOne({ userId: user.userId });
      console.log("DOCTOR:", doctor);

      if (!doctor || doctor.status !== "approved") {
        return res.status(403).json({
          message: "Your account is not approved yet."
        });
      }
    }

    res.status(200).json({
      user,
      token: "dummy-token"
    });

  } catch (err) {
    console.error("LOGIN ERROR 👉", err);   // 🔥 THIS WILL SHOW ROOT CAUSE
    res.status(500).json({ message: err.message });
  }
};

