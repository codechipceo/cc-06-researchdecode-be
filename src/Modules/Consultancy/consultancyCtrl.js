const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const consultancyService = require("./consultancyService");

const consultancyCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const docData = req.body;
    const response = await consultancyService.create(docData);
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

  verifyConsultancy: asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await consultancyService.verifyConsultancy(data);
    return successResponse({ res, data: result });
  }),

  validateConsultancy: asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await consultancyService.validateConsultancy(data);
    return successResponse({ res, data: result });
  }),

  endConsultancy: asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await consultancyService.endConsultancy(data);
    return successResponse({ res, data: result });
  }),

  activeOrInactiveConsultancy: asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await consultancyService.activeOrInactiveConsultancy(data);
    return successResponse({ res, data: result });
  }),
};

module.exports = consultancyCtrl;
