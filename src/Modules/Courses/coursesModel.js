const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseDescription: {
      type: String,
      required: true,
      trim: true,
    },
    courseExtras: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    courseThumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    courseBanner: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    enrolledCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    courseLanguage: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "createdBy.model",
      },
      model: {
        type: String,
        required: true,
        enum: ["Teacher", "Profile"], // Restrict the values to 'Teacher' and 'Owner'
      },
    }, 
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);
const Course = new mongoose.model("Course", courseSchema);
module.exports = Course;
