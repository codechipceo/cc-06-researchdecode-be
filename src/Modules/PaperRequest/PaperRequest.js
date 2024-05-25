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
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const PaperRequest = new mongoose.model("PaperRequest", paperRequestSchema);
module.exports = PaperRequest;
