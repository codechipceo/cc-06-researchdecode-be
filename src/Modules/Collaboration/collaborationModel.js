const mongoose = require("mongoose");
const CollaborationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

const Collaboration = mongoose.model("Collaboration", CollaborationSchema);
module.exports = Collaboration;
