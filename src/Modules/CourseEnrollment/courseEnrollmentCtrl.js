const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const courseEnrollmentService = require("./courseEnrollmentService");

const courseEnrollCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const courseEnrollmentDto = req.body;

    const courseEnrollment = await courseEnrollmentService.create(
      courseEnrollmentDto
    );
    return successResponse({
      res: res,
      data: courseEnrollment,
      msg: "Enrolled Successfully",
    });
  }),

  isStudentEnrolled: asyncHandler(async (req, res, next) => {
    const courseEnrollDTO = req.body;
    const isEnrolled = await courseEnrollmentService.isStudentEnrolled(
      courseEnrollDTO
    );
    return successResponse({ res, data: isEnrolled, msg: "Enrollment Status" });
  }),

  verifyEnroll: asyncHandler(async (req, res, next) => {
    const doc = req.body;
    const response = await courseEnrollmentService.verifyEnrollmentPayment(doc);
    return successResponse({
      res,
      data: response,
      msg: "Payment Verification Completed",
    });
  }),

  //   getById: asyncHandler(async (req, res, next) => {
  //     const courseId = req.body;
  //     const courseById = await courseEnrollmentService.getById(courseId);
  //     return successResponse({ res, data: courseById, msg: "Course By Id" });
  //   }),

  //   update: asyncHandler(async (req, res, next) => {
  //     const courseDto = req.body;
  //     const updatedCourse = await courseEnrollmentService.update(courseDto);
  //     return successResponse({
  //       res,
  //       data: updatedCourse,
  //       msg: "Updated Course successfully",
  //     });
  //   }),

  //   delete: asyncHandler(async (req, res, next) => {
  //     const courseId = req.body;
  //     const deletedDoc = await courseEnrollmentService.delete(courseId);
  //     return successResponse({
  //       res,
  //       data: deletedDoc,
  //       msg: "Course Deleted Successfully",
  //     });
  //   }),
};

module.exports = courseEnrollCtrl;
