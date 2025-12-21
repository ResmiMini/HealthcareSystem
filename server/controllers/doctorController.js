const Doctor = require("../models/doctor");
const connectDB = require("../config/db");
exports.addDoctor = async (req, res) => {
  await connectDB();
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log(req.body.userId);
    // 1️⃣ Generate Doctor ID
    const lastDoctor = await Doctor.findOne().sort({ createdAt: -1 });

    let newId = "DOC001";

    if (lastDoctor) {
      const lastNum = parseInt(lastDoctor.doctorId.replace("DOC", ""));
      newId = "DOC" + String(lastNum + 1).padStart(3, "0");
    }
console.log(req.body.userId);
    // 2️⃣ Create doctor entry  
    const doctor = new Doctor({
      doctorId: newId,
      userId: req.body.userId,                      
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      qualification: req.body.qualification,
      specialization: req.body.specialization,
      resume: req.file?.path
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Registered Successfully wait for approval",
      doctorId: newId,
      doctor,
    });

  } catch (error) {
    console.error("DOCTOR SAVE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};



exports.getAllDoctors = async (req, res) => {
  await connectDB();
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//selecting various depatment from doctor table


exports.getSpecializations = async (req, res) => {
  try {
    const specializations = await Doctor.distinct("specialization");

    res.status(200).json({
      success: true,
      specializations
    });

  } catch (error) {
    console.error("Specialization Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// selecting doctor based on specialization

exports.getDoctorsByDepartment = async (req, res) => {
  await connectDB();
  try {
    const { dept } = req.params;

    const doctors = await Doctor.find(
      { specialization: dept,
        status: "approved" 
       },
      { doctorId:1,name:1} // return only name + specialization
    );

    res.json({ success: true, doctors });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
};


//doctor based on doctorid
exports.getDoctorByDoctorId = async (req, res) => {
  await connectDB();
  try {
    const doctor = await Doctor.findOne({ doctorId: req.params.doctorId });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 //delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findOneAndDelete({ doctorId: req.params.doctorId });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//doctor by userId
exports.getDoctorByuserId = async (req, res) => {
  await connectDB();
  try {
    const doctor = await Doctor.findOne({ userId: req.params.userId });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//approving doctor
exports.approveDoctor = async (req, res) => {
  await connectDB();
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { doctorId: req.params.doctorId },
      { status: "approved" },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor approved", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


