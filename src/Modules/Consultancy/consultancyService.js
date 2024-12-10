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

    if (!isSignatureVerified) {
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

  verifyConsultancy: serviceHandler(async (data) => {
    const { consultancyCardId, supervisorId, decodedUser } = data;

    const query = {
      teacherId: supervisorId,
      cardId: consultancyCardId,
      studentId: decodedUser._id,
      status: "inProgress",
    };

    const isScheduled = await model.getDocumentById(query);
    return isScheduled;
  }),

  endConsultancy: serviceHandler(async (data) => {
    const { consultancyCardId, supervisorId, decodedUser } = data;

    const query = {
      teacherId: supervisorId,
      cardId: consultancyCardId,
      studentId: decodedUser._id,
      status: "inProgress",
    };

    const matchingDocument = await model.getDocumentById(query);

    if (!matchingDocument) {
      throw new Error(
        "No matching document found. The consultancy may not exist or the status may not be 'inProgress'."
      );
    }

    matchingDocument.status = "completed";

    await model.save(matchingDocument);

    return matchingDocument;
  }),

  activeOrInactiveConsultancy: serviceHandler(async (data) => {
    const { consultancyCardId, supervisorId, decodedUser } = data;

    const query = {
      teacherId: supervisorId,
      cardId: consultancyCardId,
      studentId: decodedUser._id,
    };

    const consultancy = await model.getDocumentById(query);
    if (!consultancy) {
      throw new Error("No matching document found.");
    }

    if (consultancy.type === "single") {
      return consultancy.status === "inProgress" ? true : false;
    } else if (consultancy.scheduledDate) {
      const currentDate = new Date();
      const scheduledDate = new Date(consultancy.scheduledDate);
      const daysDifference = (currentDate - scheduledDate) / (1000 * 3600 * 24);

      return daysDifference <= 30 ? true : false;
    }
  }),
};

module.exports = consultancyService;
