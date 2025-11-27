const Login = require("../models/login");

exports.addlogin = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // AUTO GENERATE USER ID
    const lastUser = await Login.findOne().sort({ userId: -1 });
    const newuserId = lastUser ? lastUser.userId + 1 : 1;

    const newLogin = new Login({
      userId:newuserId,
      username,
      password,
      role
    });

    await newLogin.save();

    res.status(201).json({
      success: true,
      message: "Login created successfully",
       userId: newuserId,     // <-- RETURN userId
      login: newLogin     
    });

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
};



//user login using username and password
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if both fields provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user by username
    const user = await Login.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password match
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Success
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        userId: user.userId,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
