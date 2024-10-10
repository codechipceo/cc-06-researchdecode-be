const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const collaborationService = require("./collaborationService");
const CustomError = require("../../../src/Errors/CustomError"); // Ensure you import CustomError

const collaborationRequestCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const newCollaboration = await collaborationService.createCollaboration(
      docDTO
    );
    successResponse({
      res,
      data: newCollaboration,
      msg: "New Collaboration Created",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    // Extract any necessary data from the request body
    const collaborationDto = req.body;

    // Call the service to get all collaborations
    const { savedData, totalCount } =
      await collaborationService.getAllCollaborations(collaborationDto);

    // Return the success response
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All Collaborations Fetched",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const { paperId } = req.body;
    const collaboration = await collaborationService.getCollaborationById(
      paperId
    );

    if (!collaboration) {
      throw new CustomError(404, "Collaboration not found");
    }

    successResponse({
      res,
      data: collaboration,
      msg: "Collaboration Details",
    });
  }),

  update: asyncHandler(async (req, res, next) => {
    const { paperId, studentId, ...updateData } = req.body;

    const collaboration = await collaborationService.getCollaborationById(
      paperId
    );

    if (!collaboration) {
      throw new CustomError(404, "Collaboration not found");
    }

    if (collaboration.postedBy.studentId.toString() !== studentId) {
      throw new CustomError(
        403,
        "You are not authorized to update this collaboration"
      );
    }

    const updatedCollaboration = await collaborationService.updateCollaboration(
      paperId,
      updateData
    );

    successResponse({
      res,
      data: updatedCollaboration,
      msg: "Collaboration updated successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const { paperId, studentId } = req.body;

    const collaboration = await collaborationService.getCollaborationById(
      paperId
    );

    if (!collaboration) {
      throw new CustomError(404, "Collaboration not found");
    }

    if (collaboration.postedBy.studentId.toString() !== studentId) {
      throw new CustomError(
        403,
        "You are not authorized to delete this collaboration"
      );
    }

    await collaborationService.deleteCollaboration(paperId);

    successResponse({
      res,
      msg: "Collaboration deleted successfully",
    });
  }),

  search: asyncHandler(async (req, res, next) => {
    const { query } = req.body;
    const results = await collaborationService.searchCollaborations(query);
    successResponse({
      res,
      data: results,
      msg: "Search Results",
    });
  }),

  getByStudentId: asyncHandler(async (req, res, next) => {
    const { studentId } = req.body;
    const collaborations =
      await collaborationService.getCollaborationsByStudentId(studentId);
    successResponse({
      res,
      data: collaborations,
      msg: "Student Collaborations Fetched",
    });
  }),
};

module.exports = { collaborationRequestCtrl };
