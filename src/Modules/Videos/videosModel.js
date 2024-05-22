const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    videoTitle: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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
    isActive: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const VIDEOS = new mongoose.model("Video", videoSchema);
module.exports = VIDEOS;
