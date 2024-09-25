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
    const { q } = req.query;
    const labs = await labsService.search(q);
    return successResponse({
      res: res,
      data: labs,
      msg: "Search results fetched successfully",
    });
  }),
};

module.exports = labsCtrl;
