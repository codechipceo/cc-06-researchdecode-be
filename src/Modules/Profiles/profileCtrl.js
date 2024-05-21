const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const ProfileService = require("./profileService");

const profileCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const profileData = req.body;

    const savedProfile = await ProfileService.create(profileData);

    return successResponse({
      res: res,
      data: savedProfile,
      msg: "Profile created Successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const profileDTO = req.body;
    const { savedData, totalCount } = await ProfileService.getAll(
      profileDTO
    );
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All Profiles",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const profileId = req.body;
    const profileById = await ProfileService.getById(profileId);
    return successResponse({ res, data: profileById, msg: "profile By Id" });
  }),

  update: asyncHandler(async (req, res, next) => {
    const profileDTO = req.body;
    const updatedProfile = await ProfileService.update(profileDTO);
    return successResponse({
      res,
      data: updatedProfile,
      msg: "Updated profile successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const profileId = req.body;
    const deletedProfile = await CategoryService.delete(profileId);
    return successResponse({
      res,
      data: deletedProfile,
      msg: "Profile Deleted Successfully",
    });
  }),
  signIn: asyncHandler(async (req, res, next) => {
    const { email,password } = req.body;
    const {user,token} = await ProfileService.signIn(email,password);
    return successResponse({
      res,
      data: {user,token},
      msg: " login successful",
    });
  }),
};

module.exports = profileCtrl;
