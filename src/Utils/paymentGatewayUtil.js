const Razorpay = require("razorpay");

class PaymentGateway {
  init() {
    return new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }
}

const paymentInstance = new PaymentGateway();
module.exports = paymentInstance;
