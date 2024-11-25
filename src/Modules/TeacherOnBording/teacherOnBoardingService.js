const TeacherOnbording = require("./teacherOnBordingModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const CustomError = require("../../Errors/CustomError");
const {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
} = require("../../Utils/utils");
const { sendVerificationEmail,sendTeacherAcceptEmail,sendTeacherRejectEmail } = require("../../Utils/mailer");
const model = new DbService(TeacherOnbording);

const teacherOnBordingService={
    create: serviceHandler(async (data) => {
        const { email, password, ...userData } = data;
        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        const hashedPassword = await hashPassword(password);
    
        const savedData = await model.save({
          email,
          ...userData,
          password: hashedPassword,
        });
    
        
    const student ={
      _id:savedData._id,
      firstName:savedData.firstName,
      userType:savedData.userType
    
    }
        const token = generateToken(student)
    
        await sendVerificationEmail(email, token);
    
        return { msg: "teacher created Successfully", data: savedData };
      }),

      verifyEmail: serviceHandler(async (decodedUser) => {
        const { _id } = decodedUser;
      
       
        const query = { _id };
        const updateData = { emailVerified: true };
      
        const options = { new: true }; 
        const savedUser = await model.updateDocument(query, updateData, options);
      
        if (!savedUser) {
          throw new Error("teacher not found or could not be updated");
        }
        return savedUser;
      }),
      acceptOrReject:serviceHandler(async(data)=>{
        const {_id,accept}=data;

        const query={_id}
        const updateDate={isOnboard:accept}
        const options={new:true}

        const savedUser=await model.updateDocument(query,updateDate,options);

        if (!savedUser) {
          throw new Error("teacher not found or could not be updated");
        }
savedUser.isOnboard===true? await sendTeacherAcceptEmail(savedUser.email) :await sendTeacherRejectEmail(savedUser.email)
        return savedUser;
      })
}

const TeacherServiceOnboardingService = teacherOnBordingService;
module.exports = TeacherServiceOnboardingService;