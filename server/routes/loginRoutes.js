const express = require("express");
const router = express.Router();
const Logins = require("../models/login");
const { loginUser } = require("../controllers/logincontroller");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Logins.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
