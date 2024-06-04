import successResponse from "../../Utils/apiResponse";
import asyncHandler from "../../Utils/asyncHandler";
import paperRequestService from "./paperRequestService";

export const paperRequestCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const newRequest = await paperRequestService.createRequestResearchPaper(
      docDTO
    );

    successResponse({ res, data: newRequest, msg: "New Request Raised" });
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
