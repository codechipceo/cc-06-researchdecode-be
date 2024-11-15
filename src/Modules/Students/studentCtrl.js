const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const StudentService = require("./studentService");

const studentCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const studentData = req.body;

    const savedStudent = await StudentService.create(studentData);
    return successResponse({
      res: res,
      data: savedStudent,
      msg: "Student created Successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const studentDTO = req.body;
    const { savedData, totalCount } = await StudentService.getAll(studentDTO);
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All students",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const  studentId  = req.body;
    const studentById = await StudentService.getById(studentId);
    return successResponse({ res, data: studentById, msg: "Student By Id" });
  }),

  update: asyncHandler(async (req, res, next) => {
    const studentDTO = req.body;
    const updatedStudent = await StudentService.update(studentDTO);
    return successResponse({
      res,
      data: updatedStudent,
      msg: "Updated student successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const { StudentId } = req.params;
    const deletedStudent = await StudentService.delete(StudentId);
    return successResponse({
      res,
      data: deletedStudent,
      msg: "Student Deleted Successfully",
    });
  }),

  signIn: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, token } = await StudentService.signIn(email, password);
    return successResponse({
      res,
      data: { user, token },
      msg: "Login successful",
    });
  }),


  verifyEmail: async (req, res, next) => {

      // Save the decoded user from the request
      const decodedUser = req.decodedUser;
console.log("decoded user is ",decodedUser);

     const user= await StudentService.verifyEmail(decodedUser);


      return successResponse({
        res,
        data: user,
        msg: "email verified",
      })
  }
}


module.exports = studentCtrl;
