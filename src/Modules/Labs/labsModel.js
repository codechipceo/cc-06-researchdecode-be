const mongoose = require("mongoose");

const labsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  maxStudentsAllowed: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  labType: { type: String, required: true },
  labLocation: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ["Available", "In Use", "Under Maintenance"],
    default: "Available",
  },
  createdAt: { type: Date, default: Date.now },
  price: {
    type: Number,
    required: function () {
      return this.isPaid;
    },
    min: [0, "Price must be a positive number"],
  },

  createdByRole: {
    type: String,
    enum: ["Student", "TEACHER", "Admin"],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByRole",
    required: true,
  },
  studentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  totalRequests: { type: Number, default: 0 },
  availableSubjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "labsSchema",
    },
  ],
  isDeleted: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
});

const Labs = new mongoose.model("labs", labsSchema);
module.exports = Labs;
