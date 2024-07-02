const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: [true, "Please make sure you provide the company name"],
      maxlength: 100,
    },

    position: {
      type: String,
      require: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobSchema);
