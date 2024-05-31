// const CustomError = require("../../Errors/CustomError");
// const successResponse = require("../../Utils/apiResponse");
// const asyncHandler = require("../../Utils/asyncHandler");
// const studentService = require("./studentService");

// const studentCtrl = {
//   create: asyncHandler(async (req, res, next) => {
//     const studentData = req.body;

//     const savedStudent = await studentService.create(studentData);

//     return successResponse({
//       res: res,
//       data: savedStudent,
//       msg: "Student created Successfully",
//     });
//   }),

//   getAll: asyncHandler(async (req, res, next) => {
//     const studentDTO = req.body;
//     const { savedData, totalCount } = await studentService.getAll(
//       studentDTO
//     );
//     return successResponse({
//       res,
//       data: savedData,
//       count: totalCount,
//       msg: "All students",
//     });
//   }),

//   getById: asyncHandler(async (req, res, next) => {
//     const studentId = req.body;
//     const studentById = await studentService.getById(studentId);
//     return successResponse({ res, data: studentById, msg: "student By Id" });
//   }),

//   update: asyncHandler(async (req, res, next) => {
//     const studentDTO = req.body;
//     const updatedStudent = await studentService.update(studentDTO);
//     return successResponse({
//       res,
//       data: updatedStudent,
//       msg: "Updated student successfully",
//     });
//   }),

//   delete: asyncHandler(async (req, res, next) => {
//     const studentId = req.body;
//     const deleteStudent = await CategoryService.delete(studentId);
//     return successResponse({
//       res,
//       data: deletedStudent,
//       msg: "student Deleted Successfully",
//     });
//   }),
//   signIn: asyncHandler(async (req, res, next) => {
//     const { email,password } = req.body;
//     const {user,token} = await studentService.signIn(email,password);
//     return successResponse({
//       res,
//       data: {user,token},
//       msg: " login successful",
//     });
//   }),
// };

// module.exports = studentCtrl;


const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const StudentService = require("./studentService");

const studentCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const studentData = req.body;

    const savedStudent = await StudentService.create(studentData);
console.log(savedStudent);
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
  verifyEmail: asyncHandler(async (req, res, next) => {
    const  token = req.body;
    try {
      await StudentService.verifyEmail(token);
    
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }),
};

module.exports = studentCtrl;
