const mongoose = require("mongoose");

// Define the schema
const teacherSchema = new mongoose.Schema(
  {
    teachername: {
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
    profileImage:{
      type: String,
      required: false,
    },
    aboutTeacher:{
      type:String,
      required:true
    },
    qualification: {
      type: String,
      required: true,
      trim: true,
    },
   contactNumber: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
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