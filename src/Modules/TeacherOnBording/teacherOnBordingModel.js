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

    emailVerified: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: "TEACHER",
    },
    isOnboard:{
      type:Boolean,
      default:false
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
    },
    role:{
      type:String,
      default:"TEACHER"
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