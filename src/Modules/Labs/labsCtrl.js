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
};

module.exports = labsCtrl;
