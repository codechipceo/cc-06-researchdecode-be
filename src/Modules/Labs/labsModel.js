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

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorRole: { type: String, enum: ["Expert", "Student"], required: true },
  studentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  totalRequests: { type: Number, default: 0 },
});

const Labs = new mongoose.model("labsSchema", labsSchema);
module.exports = Labs;
