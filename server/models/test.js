const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    testId: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

   
module.exports =
  mongoose.models.Test || mongoose.model("Test", testSchema);
