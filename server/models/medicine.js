const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicineId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }  ,
  category:
  {
    type:String ,
    required:true
  },

    price: {
    type: Number,
    required: true
  }
   
},{ timestamps: true });
module.exports =  mongoose.models.Medicine ||
  mongoose.model("Medicine", medicineSchema);