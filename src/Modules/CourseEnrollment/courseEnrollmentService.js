const CustomError = require("../../Errors/CustomError");
const DbService = require("../../Service/DbService");
const paymentGatewayInstance = require("../../Utils/paymentGatewayUtil");
const serviceHandler = require("../../Utils/serviceHandler");
const paymentService = require("../Payment/paymentService");
const CourseEnrollment = require("./courseEnrollmentModel");
const { v4: uuidv4 } = require("uuid");

const model = new DbService(CourseEnrollment);
const instance = paymentGatewayInstance.getInstance();

const courseEnrollmentService = {
  create: serviceHandler(async (data) => {
    const { amount, decodedUser, courseId, enrolledAt } = data;
    let courseEnrollment, payment;

    try {
      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `rec-${uuidv4()}`,
      };
      const order = await instance.orders.create(options);
      console.log(order);
      if (order.status === "created") {
        const paymentPayload = {
          studentId: decodedUser._id,
          amount,
          currency: order.currency,
          razorpayOrderId: order.id,
          transactionType: "courseEnroll",
        };

        const courseEnrollPayload = {
          studentId: decodedUser._id,
          courseId: courseId,
          enrolledAt: enrolledAt,
        };
        payment = await paymentService.create(paymentPayload);
        console.log(payment);
        courseEnrollment = await model.save({
          ...courseEnrollPayload,
          paymentId: payment._id,
        });
      }

      return { courseEnrollment, order, paymentId: payment._id };
    } catch (error) {
      throw error;
    }
  }),

  verifyEnrollmentPayment: serviceHandler(async (data) => {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      enrollmentId,
      paymentId,
    } = data;
    const isSignatureValid = paymentGatewayInstance.verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (isSignatureValid === false) {
      throw new CustomError(400, "Payment Not Verified");
    } else {
      const promises = [];
      const filter = { _id: enrollmentId };
      const updateDoc = { isEnrolled: true };
      let enrollmentUpdate = model.updateDocument(filter, updateDoc);
      const paymentPayload = {
        paymentId,
        paymentStatus: "Completed",
      };
      let paymentUpdate = paymentService.updatePayment(paymentPayload);

      promises.push(enrollmentUpdate, paymentUpdate);
      const result = await Promise.all(promises);
      console.log(result);
      return result;
    }
  }),

  isStudentEnrolled: serviceHandler(async (data) => {
    const { courseId, studentId } = data;
    const query = {
      courseId,
      studentId,
    };
    const isEnrolled = await model.getDocumentById(query);
    if (isEnrolled) return true;
    return false;
  }),
};

module.exports = courseEnrollmentService;
