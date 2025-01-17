const TeacherOnbording = require("./teacherOnBordingModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const CustomError = require("../../Errors/CustomError");
const { generatePassword, hashPassword } = require("../../Utils/utils");
const PROFILE = require("../Profiles/profileModel");
const model = new DbService(TeacherOnbording);
const profileModel = new DbService(PROFILE);
const { sendCustomEmail } = require("../../Utils/mailer");
const callRazorpayApi= require("../../Utils/razorpayHelper.js")
const teacherOnBordingService = {
  submitRequest: serviceHandler(async (data) => {
    const { 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      experience, 
      accountNumber, 
      bankName,
      IFSC_Code, 
      address 
    } = data;
  
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
      accountNumber,
      bankName,
      IFSC_Code,
      address, 
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
  console.log(onboardId);
  
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
  console.log(generatedPwd);
  
  const hashedPassword = await hashPassword(generatedPwd, 10);


 
console.log(isOnboardTeacher);


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
    accountNumber:isOnboardTeacher.accountNumber,
    IFSC_Code:isOnboardTeacher.IFSC_Code,
    address: isOnboardTeacher.address, // Address added here
  };

  const newTeacher = await profileModel.save(newTeacherPayload);



  const payload = {
    email: newTeacher.email,
    phone: newTeacher.phoneNumber,
    type: "route",
    reference_id: newTeacher._id.toString().substring(0, 20),
    legal_business_name: newTeacher.name,
    business_type: "partnership",
    contact_name: newTeacher.name,
    profile: {
     "category":"healthcare",
    "subcategory":"clinic",
      addresses: {
        registered: {
          street1: newTeacher.address.city,
          street2: newTeacher.address.street,
          city: newTeacher.address.city,
          state: newTeacher.address.state,
          postal_code:newTeacher.address.postalCode,
          country: newTeacher.address.country,
        },
      },
    },
  
  };

  const response = await callRazorpayApi('/v2/accounts', 'POST', payload);
  console.log('Razorpay account created:', response);


  newTeacher.razorPayID=response.id
  await newTeacher.save()

  await model.updateDocument(
    { _id: onboardId },
    { onboardingStatus: "approved" }
  );

  console.log(newTeacher);

  const dashboardPath =
    `${process.env.FRONTEND_URL}` ?? `https://dashboard.researchdecode.com/`;
  const emailPayload = {
    name: newTeacher.name,
    email: newTeacher.email,
    password: generatedPwd,
    loginUrl: dashboardPath,
  };

  // Uncomment the following line to send an email after approval
  // await sendCustomEmail(
  //   newTeacher?.email,
  //   "onboarding-approval",
  //   "Congrats For Approval Of Supervisor At ResearchDecode",
  //   emailPayload
  // );

  delete newTeacher.password;
  return newTeacher;
}),


activateBank: serviceHandler(async (data) => {
  const { teacherId } = data;

  if (!teacherId) {
    throw new CustomError(400, "Teacher ID is required");
  }

  const query = { _id: teacherId };
  
  const teacher = await profileModel.getDocumentById(query);

  if (!teacher) {
    throw new CustomError(404, "Teacher not found");
  }

  const updateData = { isBankActive: !teacher.isBankActive };
  const options = { new: true };

  const teacherUpdate = await profileModel.updateDocument(query, updateData, options);

  return {
    message: teacherUpdate.isBankActive
      ? "Bank account activated successfully"
      : "Bank account deactivated successfully",
    teacher: teacherUpdate,
  };
}),

  rejectOnboarding: serviceHandler(async () => {}),
};

const TeacherServiceOnboardingService = teacherOnBordingService;
module.exports = TeacherServiceOnboardingService;