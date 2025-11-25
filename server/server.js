const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
//loginroutes

const loginRoutes = require("./routes/loginRoutes");
app.use("/api/login", loginRoutes);

const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctors", doctorRoutes);


const staffRoutes = require("./routes/staffRoutes");
app.use("/api/staff", staffRoutes);


//APPOINTMENT ROUTES


const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api/bookAppointment", appointmentRoutes);

//prescription routes


const prescriptionRoutes = require("./routes/prescriptionRoutes");
app.use("/api/prescriptions", prescriptionRoutes);


//medicine
const medicineRoutes = require("./routes/medicineRoutes");
app.use("/api/medicines", medicineRoutes);

//labreports


const labReportRoutes = require("./routes/labReportRoutes");
app.use("/api/labreports", labReportRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("✅ Server running")
    );
  })
  .catch((err) => console.log(err));
