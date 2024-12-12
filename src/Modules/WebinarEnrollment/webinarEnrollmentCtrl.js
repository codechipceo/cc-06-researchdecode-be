const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const WebinarEnrollmentService = require("./webinarEnrollmentService");

const webinarEnrollmentCtrl = {
  create: asyncHandler(async (req, res, next) => {
    try {
      const webinarEnrollmentDTO = req.body;
      const savedEnrollment = await WebinarEnrollmentService.create(
        webinarEnrollmentDTO
      );
      return successResponse({
        res,
        data: savedEnrollment,
        msg: "Enrolled Successfully",
      });
    } catch (error) {
      next(error);
    }
  }),

  getById: asyncHandler(async (req, res, next) => {
    try {
      const webinarEnrollmentDTO = req.body;
      const savedEnrollment = await WebinarEnrollmentService.getById(
        webinarEnrollmentDTO
      );

      return successResponse({
        res,
        data: savedEnrollment,
        msg: "Enrollments fetched successfully!",
      });
    } catch (error) {
      next(error);
    }
  }),
};

module.exports = webinarEnrollmentCtrl;
