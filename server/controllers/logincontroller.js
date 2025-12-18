
const bcrypt = require("bcryptjs");
const Login = require("../models/login");
const Doctor=require("../models/doctor");

exports.addlogin = async (req, res) => {
  try {
    const { username, password, role = "patient" } = req.body;

    // 1️⃣ Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    // 2️⃣ Check duplicate username
    const existingUser = await Login.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Generate userId
    const lastUser = await Login.findOne().sort({ userId: -1 });
    const newUserId = lastUser ? lastUser.userId + 1 : 1;

    // 5️⃣ SAVE TO LOGIN TABLE
    const newLogin = await Login.create({
      userId: newUserId,
      username,
      password: hashedPassword,
      role
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newLogin.userId
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Registration failed"
    });
  }
};



//user login using username and password


exports.loginUser = async (req, res) => {
  
  try {
  const { username, password } = req.body;

  console.log("LOGIN REQUEST:", username);

  // 1️⃣ Find user by username
  const user = await Login.findOne({ username });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  // 2️⃣ Compare password securely
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  // 3️⃣ Doctor approval check
  if (user.role === "doctor") {
    console.log("Checking doctor status for userId:", user.userId);

    const doctor = await Doctor.findOne({ userId: user.userId });

    if (!doctor || doctor.status !== "approved") {
      return res.status(403).json({
        message: "Your account is not approved yet."
      });
    }
  }

  // 4️⃣ Success
  res.status(200).json({
    user: {
      userId: user.userId,
      username: user.username,
      role: user.role
    },
    token: "dummy-token" // (replace with JWT later)
  });

} catch (err) {
  console.error("LOGIN ERROR 👉", err);
  res.status(500).json({
    message: "Internal server error"
  });
}
};

