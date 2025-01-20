const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const Consultancy = require("./ConsultancyModel");
const ConsultancyCardModel  = require("../ConsultancyCard/consultancyCardModel");
const { v4: uuidv4 } = require("uuid");

const CustomError = require("../../Errors/CustomError");
const paymentService = require("../Payment/paymentService");
const model = new DatabaseService(Consultancy);
const ConsultancyCard = require("../ConsultancyCard/consultancyCardModel");
const consultancyCardModel = new DatabaseService(ConsultancyCard);
const paymentGatewayInstance = require("../../Utils/paymentGatewayUtil");
const instance = paymentGatewayInstance.getInstance();

const consultancyService = {
  create: serviceHandler(async (data) => {
    const {  decodedUser, cardId, type, scheduledDate } = data;
    let consultancy, payment;


    const studentId  = decodedUser._id
    try {

      // if active consultancy for this card exists, then reject the request
      const isActive  = await model.getDocument({cardId : cardId, studentId : studentId, isScheduled : true})

      if (isActive?.isScheduled) throw new CustomError(400,"Consultancy Is Already Active")
      const consultancyCard = await cardModel.getDocumentById({ _id: cardId });
    const { teacherId, pricing } = consultancyCard;

    const amount =
      type.toLowerCase() === "single" ? pricing.single : pricing.project;
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

  verifyConsultancy: serviceHandler(async (data) => {
    const { consultancyCardId, decodedUser } = data;
    let isScheduled = false;

    const getCard = await consultancyCardModel.getDocumentById({
      _id: consultancyCardId,
    });
    if (!getCard) {
      throw new CustomError(400, "Incorrect Card Id");
    }

    const query = {
      teacherId: getCard?.teacherId,
      cardId: consultancyCardId,
      studentId: decodedUser._id,
      status: "inProgress",
      isScheduled: true,
    };

    isScheduled = await model.getAllDocuments(query);
    if (isScheduled.length > 0) {
      return true;
    }

    return false;
  }),

  endConsultancy: serviceHandler(async (data) => {
    const { consultancyCardId,  decodedUser } = data;

    const getCard = await consultancyCardModel.getDocumentById({
      _id: consultancyCardId,
    });
    if (!getCard) {
      throw new CustomError(400, "Incorrect Card Id");
    }

    const query = {
      teacherId: getCard?.teacherId,
      cardId: consultancyCardId,
      studentId: decodedUser._id,
      status: "inProgress",
    };

    const updatedDocument = await model.updateDocument(query, {status:'completed'});
    return updatedDocument;
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
