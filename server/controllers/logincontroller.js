
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const Logins = require("../models/login");

// POST: Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists in Atlas
    const user = await Logins.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        password:user.password,
        role:user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
