const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const TeacherServiceOnboardingService = require("./teacherOnBoardingService");

const teacheronboardingCtrl={
    create: asyncHandler(async (req, res, next) => {
        const teacherData = req.body;

        const savedTeacher = await TeacherServiceOnboardingService.create(teacherData);
        return successResponse({
          res: res,
          data: savedTeacher,
          msg: "Teacher created Successfully",
        });
      }),

      verifyEmail: async (req, res, next) => {

        const decodedUser = req.decodedUser;
       const user= await TeacherServiceOnboardingService.verifyEmail(decodedUser);
  
        return successResponse({
          res,
          data: user,
          msg: "email verified",
        })
    },

    acceptOrReject: asyncHandler(async(req,res,next)=>{
      const data=req.body
      const user= await TeacherServiceOnboardingService.acceptOrReject(data);
   
       return successResponse({
         res,
         data: user,
         msg: "Updated ",
       })
    })
}

module.exports=teacheronboardingCtrl;