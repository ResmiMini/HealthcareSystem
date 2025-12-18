
const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { addDoctor,approveDoctor,deleteDoctor,getSpecializations ,getDoctorsByDepartment,getDoctorByDoctorId,getDoctorByuserId,getAllDoctors} = require("../controllers/doctorController");

// router.post("/addDoctor", addDoctor);
router.get("/test", (req, res) => {
  res.send("Doctor route loaded");
});
router.post("/addDoctor", upload.single("resume"), addDoctor);
router.get("/department",getSpecializations);
router.get("/alldoctors",getAllDoctors);
router.put("/approvedoctor/:doctorId", approveDoctor);
router.delete("/deletedoctor/:doctorId",deleteDoctor);
router.get("/getByDoctorId/:doctorId", getDoctorByDoctorId);
router.get("/getByuserId/:userId", getDoctorByuserId);

router.get("/byDepartment/:dept", getDoctorsByDepartment);
module.exports = router;
