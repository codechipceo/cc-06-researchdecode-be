const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const consultancyCardService = require("./consultancyCardService");

const consultancyCardCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const docDto = req.body;
    const savedDoc = await consultancyCardService.create(docDto);

    return successResponse({ res, data: savedDoc, msg: "New Card Added" });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const docData = req.body;
    const response = await consultancyCardService.getById(docData);
    return successResponse({ res, data: response, msg: "Card By ID" });
  }),
  getAll: asyncHandler(async (req, res, next) => {
    const docData = req.body;
    const response = await consultancyCardService.getAll(docData);
    return successResponse({ res, data: response });
  }),
};

module.exports = consultancyCardCtrl;
