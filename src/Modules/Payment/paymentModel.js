const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,

    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
