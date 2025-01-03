const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const TeacherServiceOnboardingService = require("./teacherOnBoardingService");

const teacheronboardingCtrl = {
  submitRequest: asyncHandler(async (req, res, next) => {
    const teacherData = req.body;

    const savedTeacher = await TeacherServiceOnboardingService.submitRequest(
      teacherData
    );
    return successResponse({
      res: res,
      data: savedTeacher,
      msg: "Teacher created Successfully",
    });
  }),

  getPendingOnboardingRequests: asyncHandler(async (req, res, next) => {
    const reqDto = req.body;
    const { result, pendingCount } =
      await TeacherServiceOnboardingService.getPendingRequests(reqDto);
    return successResponse({
      res: res,
      data: result,
      msg: "Pending onboarding requests fetched successfully",
      count: pendingCount,
    });
  }),

  approveOnboardingRequest: asyncHandler(async (req, res, next) => {
    const reqDto = req.body
    const approvedTeacher = await TeacherServiceOnboardingService.approveOnboarding(reqDto)
    return successResponse({
      res: res,
      data: approvedTeacher,
      msg: "Onboarding request approved successfully",
    });
  })
};

module.exports = teacheronboardingCtrl;
