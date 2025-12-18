const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "doctor_resumes",     // folder in Cloudinary
    resource_type: "raw",   
         
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.replace(".pdf", "")}`
  },
});

const upload = multer({ storage });

module.exports = upload;