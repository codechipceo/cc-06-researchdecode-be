const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const paperRequestService = require("./paperRequestService");

const paperRequestCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const newRequest = await paperRequestService.createRequestResearchPaper(
      docDTO
    );

    successResponse({ res, data: newRequest, msg: "New Request Raised" });
  }),
  upload: asyncHandler(async (req, res, next) => {
    const file = req.files;
    const payload = { file };
    const newChat = await paperRequestService.uploadRequestPaper(payload);

    return successResponse({ res, msg: "File sent", data: newChat });
  }),

  approve: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const approved = await paperRequestService.approveRequestResearchPaper(
      docDTO
    );
    successResponse({ res, data: approved, msg: "Request Approved" });
  }),

  getAllPendingRequests: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const { allRequests, totalCounts } =
      await paperRequestService.getAllRequestResearchPapers(docDTO);
    successResponse({
      res,
      data: allRequests,
      count: totalCounts,
      msg: "All pending requests",
    });
  }),
};

module.exports = { paperRequestCtrl };
