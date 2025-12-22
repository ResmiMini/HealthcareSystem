const express = require("express");
const mongoose = require("mongoose");
mongoose.set("bufferCommands", false);
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const connectDB = require("./config/db");


connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "https://healthcare-systemfrontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);



app.use(express.json());






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

// test routes
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

  module.exports = app;
