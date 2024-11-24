const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const TeacherServiceOnbordingService = require("./teacherOnBordingService");

const teacheronbordingCtrl={
    create: asyncHandler(async (req, res, next) => {
        const teacherData = req.body;
    console.log(teacherData);
    
        const savedTeacher = await TeacherServiceOnbordingService.create(teacherData);
        return successResponse({
          res: res,
          data: savedTeacher,
          msg: "Student created Successfully",
        });
      }),

      verifyEmail: async (req, res, next) => {

        const decodedUser = req.decodedUser;

  
       const user= await TeacherServiceOnbordingService.verifyEmail(decodedUser);
  
  
        return successResponse({
          res,
          data: user,
          msg: "email verified",
        })
    }
}

module.exports=teacheronbordingCtrl;