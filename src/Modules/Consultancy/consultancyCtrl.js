const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const consultancyService = require("./consultancyService");
const conssultancyService = require("./consultancyService");
const consultancyCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const docData = req.body;
    const response = await conssultancyService.create(docData);
    return successResponse({
      res,
      data: response,
      msg: "Consultancy Scheduled",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const docData = req.body;
    const response = await consultancyService.getById(docData);
    return successResponse({ res, data: response, msg: "Card By ID" });
  }),
  getAll: asyncHandler(async (req, res, next) => {
    const docData = req.body;
    const response = await consultancyService.getAll(docData);
    return successResponse({ res, data: response });
  }),
  verifyPayment: asyncHandler(async (req, res, next) => {
    const paymentObj = req.body;
    const response = await consultancyService.verifyPayment(paymentObj);
    return successResponse({
      res,
      data: response,
      msg: "Payment Successfully Done",
    });
  }),
};

module.exports = consultancyCtrl;
