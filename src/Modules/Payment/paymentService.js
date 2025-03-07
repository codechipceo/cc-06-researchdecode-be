const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const PaymentModel = require("./paymentModel");
const teacherModel = require("../Profiles/profileModel");
const model = new DatabaseService(PaymentModel);
const teacher = new DatabaseService(teacherModel);
const Razorpay = require("razorpay");

const paymentGatewayInstance = require("../../Utils/paymentGatewayUtil");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const paymentService = {
  create: serviceHandler(async (data) => {
    console.log("Payment Service: Init Creating payment ");
    try {
      const { studentId, amount, currency, razorpayOrderId, transactionType, referenceModel, referenceId } =
        data;

      const paymentSaved = await model.save({
        studentId: studentId,
        amount,
        currency,
        transactionType,referenceModel, referenceId,
        razorpayOrderId,
        transactionId: "",
      });
      if (!paymentSaved) {
        throw new Error("Payment not saved.");
      }

      console.log("Payment Service: END Saving payment for Admin ");

      return paymentSaved;
    } catch (error) {
      throw new Error(error);
    }
  }),

  transferToVendor: serviceHandler(async (data) => {
    try {
      console.log("Transfer To Vendor INIT");
      const { teacherId, amount, razorpay_payment_id, consultancyId } = data;
      const query = { _id: teacherId };
      const findTeacher = await teacher.getDocument(query);
      if (!findTeacher) {
        throw new Error("Teacher not found.");
      }

      const transferAmount = Math.floor(amount * 0.8);

      const payment = await razorpayInstance.payments.fetch(
        razorpay_payment_id
      );
      console.log(payment, "Razorpay payment");
      if (payment.status !== "captured") {
        throw new Error("Payment not captured.");
      }
      console.log(findTeacher.razorPayID);

      const transferToVendor = await razorpayInstance.payments.transfer(
        razorpay_payment_id,
        {
          transfers: [
            {
              account: findTeacher.razorPayID,
              amount: transferAmount * 100,
              currency: "INR",
              notes: {
                consultancyId,
                transferType: "vendor",
              },
            },
          ],
        }
      );
    } catch (error) {
      throw new Error("Transfer to vendor error", error);
    }
  }),

  getPaymentHistory: serviceHandler(async (data) => {
    const { decodedUser } = data;
    const query = {
      studentId: decodedUser._id,
      transactionId :{$ne :""}
    };
data.populate = [{ path: "referenceId" }];
   return await  model.getAllDocuments(query, data)
  }),

  getById: serviceHandler(async (data) => {
    const { paymentId } = data;
    const payment = await model.getDocumentById({ _id: paymentId });
    return payment;
  }),

  updatePayment: serviceHandler(async (data) => {
    const { paymentId } = data;
    const filter = { _id: paymentId };
    const updateDoc = { ...data };
    const updatedPayment = await model.updateDocument(filter, updateDoc);
    return updatedPayment;
  }),
};

module.exports = paymentService;
