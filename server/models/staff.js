
const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    
  staffId: { type: String, required: true, unique: true },   // Like D1001
  name: { type: String, required: true },
  address:{type: String, required: true },
phone: { type: String, required: true },
 email: { type: String, required: true, unique: true },
   qualification: { type: String, required: true },
  departement: { type: String },
  designation: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
