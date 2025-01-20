const asyncHandler = require("../../Utils/asyncHandler");
const TeacherService = require("./teacherService");
const successResponse = require("../../Utils/apiResponse");
const teachermiddleware = require("../../middlewares/validation/teachervalidationschema");
const { validationResult } = require("express-validator");

const teacherCtrl = {
  create: [
    teachermiddleware,
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.errors);
        return res.json({ msg: errors.errors });
      } else {
        const teacherDTO = req.body;
        let savedData;
        if (Array.isArray(teacherDTO)) {
          savedData = await TeacherService.createMany(teacherDTO);
        } else {
          savedData = await TeacherService.create(teacherDTO);
        }
        return successResponse({
          res,
          data: savedData,
          msg: "teacher created successfully",
        });
      }
    }),
  ],

  getAll: asyncHandler(async (req, res, next) => {
    const teacherDTO = req.body;
    const { savedData, totalCount } = await TeacherService.getAll(teacherDTO);
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All teachers",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const teacherId = req.body;
    const teacherById = await TeacherService.getById(teacherId);
    return successResponse({
      res,
      data: teacherById,
      msg: "teacher By Id",
    });
  }),

  update: asyncHandler(async (req, res, next) => {
    const teacherDTO = req.body;
    const updatedTeacher = await TeacherService.update(teacherDTO);
    return successResponse({
      res,
      data: updatedTeacher,
      msg: "Updated teacher successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const teacherId = req.body;
    const deletedDoc = await TeacherService.delete(teacherId);
    return successResponse({
      res,
      data: deletedDoc,
      msg: "teacher Deleted Successfully",
    });
  }),
  signIn: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, token } = await TeacherService.signIn(email, password);
    return successResponse({
      res,
      data: { user, token },
      msg: " login successful",
    });
  }),

  approvedTeacher:asyncHandler(async(req,res,next)=>{
    const decodedUser = req.decodedUser;
    console.log(decodedUser);
    const user = await TeacherService.approvedTeacher(decodedUser);
    
    return successResponse({
      res,
      data: user,
      
    });
  })
};

module.exports = teacherCtrl;
