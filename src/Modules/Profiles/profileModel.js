const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
    },
    profileImage: {
      type: String, // Assuming this will store the URL of the profile image
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 50,
    },
    experience: {
      type: Number, // Number of years of experience
    },
    phoneNumber: {
      type: String,
      unique: true,
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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountNumber:{
      type:Number,
      required:true
    },
    IFSC_Code:{
      type:String,
      required:true
    },
   
    isBankActive:{
      type:Boolean,
      default:false
    },
   razorPayID:{
    type:String,
    required:true
   },
    role: {
      type: String,
      enum: ["ADMIN", "TEACHER"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PROFILE = mongoose.model("Profile", profileSchema);
module.exports = PROFILE;