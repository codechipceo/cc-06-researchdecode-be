const mongoose = require("mongoose");

const consultancySchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConsultancyCard",
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    type: {
      type: String,
      enum: ["single", "project"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "inProgress", "completed"],
      default: "pending",
    },

    isScheduled: {
      type: Boolean,
      default: false,
    },

    scheduledDate: { type: String },
  },
  {
    timestamps: true,
  }
);

const Consultancy = mongoose.model("Consultancy", consultancySchema);

module.exports = Consultancy;
