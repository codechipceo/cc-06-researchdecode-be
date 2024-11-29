const TeacherOnbording = require("./teacherOnBordingModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const CustomError = require("../../Errors/CustomError");
const { generatePassword, hashPassword } = require("../../Utils/utils");
const PROFILE = require("../Profiles/profileModel");
const model = new DbService(TeacherOnbording);
const profileModel = new DbService(PROFILE);
const { sendCustomEmail } = require("../../Utils/mailer");

const teacherOnBordingService = {
  submitRequest: serviceHandler(async (data) => {
    const { firstName, lastName, email, phoneNumber, experience } = data;
    const isTeacher = await model.getDocument({ email });
    if (isTeacher) {
      throw new CustomError(400, "Teacher with this email already exists");
    }
    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      experience,
    };
    return await model.save(payload);
  }),

  getPendingRequests: serviceHandler(async (data) => {
    const query = { onboardingStatus: "pending" };
    const result = await model.getAllDocuments(query, data);
    const pendingCount = await model.totalCounts(query);

    return { result, pendingCount };
  }),

  approveOnboarding: serviceHandler(async (data) => {
    const { onboardId } = data;
    const isOnboardTeacher = await model.getDocumentById({ _id: onboardId });
    if (!isOnboardTeacher) {
      throw new CustomError(404, "Teacher onboarding request not found");
    } else if (isOnboardTeacher.onboardingStatus !== "pending") {
      throw new CustomError(
        400,
        "Teacher onboarding request is already approved or rejected"
      );
    }
    const generatedPwd = generatePassword(12);
    const hashedPassword = await hashPassword(generatedPwd, 10);

    const newTeacherPayload = {
      name: `${isOnboardTeacher.firstName} ${isOnboardTeacher.lastName}`,
      qualification: isOnboardTeacher.qualification,
      profileImage: isOnboardTeacher.profileImage || "",
      experience: isOnboardTeacher.experience,
      username: isOnboardTeacher.firstName + isOnboardTeacher.email,
      phoneNumber: isOnboardTeacher.phoneNumber,
      email: isOnboardTeacher.email,
      password: hashedPassword,
      role: "TEACHER",
    };
    const newTeacher = await profileModel.save(newTeacherPayload);
    await model.updateDocument(
      { _id: onboardId },
      { onboardingStatus: "approved" }
    );
    const dashboardPath =
      `${process.env.FRONTEND_URL}` ?? `https://dashboard.researchdecode.com/`;
    const emailPayload = {
      name: newTeacher.name,
      email: newTeacher.email,
      password: generatedPwd,
      loginUrl: dashboardPath,
    };
    // await sendCustomEmail(
    //   newTeacher?.email,
    //   "onboarding-approval",
    //   "Congrats For Approval Of Supervisor At ResearchDecode",
    //   emailPayload
    // );

    delete newTeacher.password;
    return newTeacher;
  }),

  rejectOnboarding: serviceHandler(async () => {}),
};

const TeacherServiceOnboardingService = teacherOnBordingService;
module.exports = TeacherServiceOnboardingService;
