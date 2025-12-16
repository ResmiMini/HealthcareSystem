const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const connectDB = require("./config/db");


app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/patient", authRoutes);

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});
 //patient routes
 const patientroutes=require("./routes/patientroutes");
app.use("/api/patient",patientroutes)


//loginroutes
const loginRoutes = require("./routes/loginRoutes");
app.use("/api/login", loginRoutes);


//doctor routes
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctor", doctorRoutes);


const staffRoutes = require("./routes/staffRoutes");
app.use("/api/staff", staffRoutes);


//APPOINTMENT ROUTES


const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointment", appointmentRoutes);

//prescription routes


const prescriptionRoutes = require("./routes/prescriptionRoutes");
app.use("/api/prescriptions", prescriptionRoutes);


//medicine
const medicineRoutes = require("./routes/medicineRoutes");
app.use("/api/medicine", medicineRoutes);

//medical records
const medicalrecord = require("./routes/medicalRecordRoutes");
app.use("/api/medicalrecord", medicalrecord);



const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);


//labreports


const labReportRoutes = require("./routes/labReportRoutes");
app.use("/api/labreports", labReportRoutes);




  module.exports = app;
