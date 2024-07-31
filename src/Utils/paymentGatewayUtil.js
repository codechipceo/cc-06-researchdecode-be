const Razorpay = require("razorpay");
const crypto = require("crypto");

class PaymentGateway {
  constructor() {
    this.instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }

  getInstance() {
    return this.instance;
  }

  verifySignature(razorpay_order_id, razorpay_payment_id, signature) {
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");
    return digest === signature;
  }
}
const paymentGatewayInstance = new PaymentGateway()
module.exports = paymentGatewayInstance


