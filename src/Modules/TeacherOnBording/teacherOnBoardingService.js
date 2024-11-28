const TeacherOnbording = require("./teacherOnBordingModel");
const DbService = require("../../Service/DbService");
const Teacher = require("../Teachers/teacherModel");
const serviceHandler = require("../../Utils/serviceHandler");
const CustomError = require("../../Errors/CustomError");
const {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
} = require("../../Utils/utils");
const {
  sendVerificationEmail,
  sendTeacherAcceptEmail,
  sendTeacherRejectEmail,
} = require("../../Utils/mailer");
const model = new DbService(TeacherOnbording);
const teacherModel = new DbService(Teacher);

const teacherOnBordingService = {
  create: serviceHandler(async (data) => {
    const { email, ...userData } = data;
    if (!email) {
      throw new Error("Email are required");
    }
    const savedData = await model.save({
      email,
      ...userData,
    });

    const student = {
      _id: savedData._id,
      firstName: savedData.firstName,
      userType: savedData.userType,
    };
    const token = generateToken(student);

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
  acceptOrReject: serviceHandler(async (data) => {
    const { _id, accept } = data;

    const query = { _id };
    const updateDate = { isOnboard: accept };
    const options = { new: true };

    const savedUser = await model.updateDocument(query, updateDate, options);

    if (!savedUser) {
      throw new Error("teacher not found or could not be updated");
    }

    if (savedUser.isOnboard === true) {
      const randomPassword = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const hashedPassword = await hashPassword(randomPassword);

      const savedData = await teacherModel.save({
        username: savedUser.teachername,
        name:savedUser.teachername,
        email: savedUser.email,
        qualification: savedUser.qualification,
        profileImage: savedUser.profileImage,
        aboutTeacher: savedUser.aboutTeacher,
        contactNumber: savedUser.contactNumber,
        experience: savedUser.experience,
        password: hashedPassword,
        isActive: true,
        password: hashedPassword,
      });
      if (savedData) {
        await sendTeacherAcceptEmail(savedData.email, randomPassword);

      }
    } else {
      await sendTeacherRejectEmail(savedUser.email);
    }

    return { msg: "teacher accepted Successfully", data: savedUser };
  }),
};

const TeacherServiceOnboardingService = teacherOnBordingService;
module.exports = TeacherServiceOnboardingService;
