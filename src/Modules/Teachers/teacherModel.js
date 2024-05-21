const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  qualification: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String, 
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  experience: {
    type: Number, 
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isDelete:{
    type: Boolean , 
    default: false 
  }
}, {
  timestamps: true,
});

const TEACHER = mongoose.model("Teacher", teacherSchema);
module.exports = TEACHER;