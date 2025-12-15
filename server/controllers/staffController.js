const Staff = require("../models/staff");
exports.addStaff = async (req, res) => {
  try {
    
    const lastStaff = await Staff.findOne().sort({ createdAt: -1 });
    
        let newId = "ST001";
    
        if (lastStaff) {
          const lastNum = parseInt(lastStaff.staffId.replace("ST", ""));
          newId = "ST" + String(lastNum + 1).padStart(3, "0");
        }
    
    // ✅ SAVE STAFF DATA WITH SAME userId
    const staff = new Staff({
      userId:req.body.userId,
      staffId:newId,
      name:req.body.name,
     address:req.body.address,
     phone:req.body.phone,
     email:req.body.email,
    qualification:req.body.qualification,
    departement:req.body.departement,
      designation:req.body.designation,
       resume:req.file ? req.file.filename : null,
    });

    await staff.save();

    res.status(201).json({
      message: "Staff registered successfully",
      staff
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
