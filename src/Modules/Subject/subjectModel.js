const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  iconImage: {
    type: String, 
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const SUBJECT = mongoose.model("subject", subjectSchema);
module.exports = SUBJECT;