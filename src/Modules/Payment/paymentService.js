const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const PaymentModel = require("./paymentModel");
const teacherModel=require("../Profiles/profileModel")
const model = new DatabaseService(PaymentModel);
const teacher=new DatabaseService(teacherModel)
const Razorpay = require('razorpay');

const paymentGatewayInstance=require('../../Utils/paymentGatewayUtil')

const razorpayInstance = new Razorpay({
  key_id:  process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_SECRET 
});

const paymentService = {
create: serviceHandler(async (data) => {
    console.log("Data received in service:", data);

  

    try {
      const {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          consultancyId,
          teacherId,
          amount,
          decodedUser
      } = data;
  
   const query = { _id: teacherId };
      const findTeacher = await teacher.getDocument(query);
      if (!findTeacher) {
          throw new Error("Teacher not found.");
      }
  
      const transferAmount = Math.floor(amount * 0.9);
  
      const isValid = paymentGatewayInstance.verifySignature(
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
      );
  
      if (!isValid) {
          throw new Error("Payment signature verification failed.");
      }
  
      const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);
      if (payment.status !== 'captured') {
          throw new Error("Payment not captured.");
      }
  console.log(findTeacher.razorPayID);
  
      const transferToVendor = await razorpayInstance.payments.transfer(razorpay_payment_id, {
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
      });
  
      console.log("Vendor Transfer Successful:", transferToVendor);

    const paymentSaved=  await model.create({
        studentId:decodedUser._id,
        amount:amount,
        currency:transferToVendor.items.currency,
        transactionType:"online",
        paymentStatus:transferToVendor.items.status,
        razorpayOrderId:razorpay_order_id,
        transactionId:razorpay_payment_id
      })
if (!paymentSaved) {
  throw new Error("Payment not saved.");
}
      console.log(paymentSaved);
      
      return transferToVendor;
    } catch (error) {
     
    }
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

