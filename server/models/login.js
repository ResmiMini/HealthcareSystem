const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "patient", "doctor", "staff"],
      default: "patient",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Login", loginSchema);
