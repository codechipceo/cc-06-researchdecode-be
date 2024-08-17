const DatabaseService = require("../../Service/DbService");
const paymentInstance = require("../../Utils/paymentGatewayUtil");
const serviceHandler = require("../../Utils/serviceHandler");
const Consultancy = require("./ConsultancyModel");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const CustomError = require("../../Errors/CustomError");
const paymentService = require("../Payment/paymentService");
const model = new DatabaseService(Consultancy);
const paymentGatewayInstance = require("../../Utils/paymentGatewayUtil");
const instance = paymentGatewayInstance.getInstance();

const consultancyService = {
  create: serviceHandler(async (data) => {
    const { teacherId, studentId, cardId, type, scheduledDate, amount } = data;
    let consultancy, payment;

    try {
      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `rec-${uuidv4()}`,
      };
      const order = await instance.orders.create(options);
      if (order.status) {
        const paymentPayload = {
          studentId,
          amount,
          currency: order.currency,
          razorpayOrderId: order.id,
        };
        payment = await paymentService.create(paymentPayload);

        const consultancyPayload = {
          teacherId,
          studentId,
          cardId,
          type,
          scheduledDate,
          paymentId: payment?._id,
        };

        consultancy = await model.save(consultancyPayload);
      }

      return { consultancy, order: order, payment: payment };
    } catch (error) {
      throw error;
    }
  }),

  getAll: serviceHandler(async (data) => {
    data.populate = [
      { path: "teacherId" },
      { path: "studentId", select: "name" },
      { path: "cardId", select: "title pricing" },
    ];
    return await model.getAllDocuments({}, data);
  }),

  getById: serviceHandler(async (data) => {
    const { consultancyId } = data;
    const query = { _id: consultancyId };
    const populateOptions = [
      { path: "teacherId" },
      { path: "studentId", select: "name" },
      { path: "cardId", select: "title pricing" },
    ];
    return await model.getDocumentById(query, populateOptions);
  }),
  verifyPayment: serviceHandler(async (data) => {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      consultancyId,
    } = data;
    const isSignatureVerified = paymentGatewayInstance.verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (isSignatureVerified === false) {
      throw new CustomError(400, "Payment Not Verified");
    } else {
      const getConsultancy = await model.getDocumentById({
        _id: consultancyId,
      });
      const promises = [];

      const filter = { _id: consultancyId };
      const updateDocument = {
        isScheduled: true,
        paymentStatus: "paid",
      };
      promises.push(
        model.updateDocument(filter, updateDocument, {
          new: true,
          populate: [
            { path: "studentId" },
            { path: "teacherId" },
            { path: "cardId" },
          ],
        })
      );
      const updatePayment = {
        paymentStatus: "Completed",
        transactionId: razorpay_payment_id,
        paymentId: getConsultancy?.paymentId,
      };
      promises.push(paymentService.updatePayment(updatePayment));
      await Promise.all(promises);
    }
  }),
};

module.exports = consultancyService;
