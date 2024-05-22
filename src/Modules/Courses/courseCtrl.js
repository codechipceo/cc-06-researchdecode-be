const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const courseService = require("./courseService");

const courseCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const courseDto = req.body;
    const courseSaved = await courseService.create(courseDto);
    return successResponse({
      res: res,
      data: courseSaved,
      msg: "Course created Successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const courseDto = req.body;
    const { savedData, totalCount } = await courseService.getAll(courseDto);
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All Courses",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const courseId = req.body;
    const courseById = await courseService.getById(courseId);
    return successResponse({ res, data: courseById, msg: "Course By Id" });
  }),

  update: asyncHandler(async (req, res, next) => {
    const courseDto = req.body;
    const updatedCourse = await courseService.update(courseDto);
    return successResponse({
      res,
      data: updatedCourse,
      msg: "Updated Course successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const courseId = req.body;
    const deletedDoc = await courseService.delete(courseId);
    return successResponse({
      res,
      data: deletedDoc,
      msg: "Course Deleted Successfully",
    });
  }),
};

module.exports = courseCtrl;
