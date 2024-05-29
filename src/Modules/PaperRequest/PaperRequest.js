const mongoose = require("mongoose");

const paperRequestSchema = new mongoose.Schema(
  {
    requestBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    researchPaperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResearchPaper",
    },
    requestStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    fulfilledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);
const PaperRequest = new mongoose.model("PaperRequest", paperRequestSchema);
module.exports = PaperRequest;
