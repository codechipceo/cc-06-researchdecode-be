const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const paymentService = require("./paymentService");

const paymentCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const {verificationPayload} = req.body;

    console.log("in payment",req.body);

    const payment = await paymentService.create(req.body);

    return successResponse({
      res: res,
      data: payment,
      msg: "payment created Successfully",
    });
  }),

}

module.exports = paymentCtrl;