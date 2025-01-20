const mongoose = require("mongoose");

// Define the schema
const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    onboardingStatus: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      required: true,
      default: "pending",
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    IFSC_Code: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
    experience: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create the model
const TeacherOnboarding = mongoose.model("TeacherOnboarding", teacherSchema);

module.exports = TeacherOnboarding;
