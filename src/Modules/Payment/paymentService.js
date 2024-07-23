const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const PaymentModel = require("./paymentModel");
const model = new DatabaseService(PaymentModel);
const paymentService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),
};

module.exports= paymentService
