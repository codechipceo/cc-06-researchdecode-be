const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const labsService = require("./labsService");

const labsCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const labDto = req.body;

    const labSaved = await labsService.create(labDto);
    return successResponse({
      res: res,
      data: labSaved,
      msg: "Lab created Successfully",
    });
  }),
  search: asyncHandler(async (req, res, next) => {
    const { q } = req.body;
    const labs = await labsService.search(q);
    return successResponse({
      res: res,
      data: labs,
      msg: "Search results fetched successfully",
    });
  }),
  getAll: asyncHandler(async (req, res, next) => {
    const { savedData, totalCount } = await labsService.getAll(req.query);
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All Labs",
    });
  }),
  getLabById: asyncHandler(async (req, res, next) => {
    const { labId } = req.params;
    const { savedData, totalCount } = await labsService.getLabById(labId);
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "Labs by Id",
    });
  }),
  updateLab: asyncHandler(async (req, res, next) => {
    const { labId } = req.params;
    const data = { labId, ...req.body };

    const updatedLab = await labsService.update(data);
    return successResponse({
      res,
      data: updatedLab,
      msg: "Lab Updated successfully",
    });
  }),
  deleteLab: asyncHandler(async (req, res, next) => {
    const { labId } = req.params;
    const deletedDoc = await labsService.delete(labId);
    return successResponse({
      res,
      data: deletedDoc,
      msg: "Course Deleted Successfully",
    });
  }),
};

module.exports = labsCtrl;
