const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // ⬅️ VERY IMPORTANT
    });

    isConnected = true;
    console.log("✅ MongoDB connected (cached)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;
