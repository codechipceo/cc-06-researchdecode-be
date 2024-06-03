const Student = require("./studentModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const CustomError = require("../../Errors/CustomError");
const {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
} = require("../../Utils/utils");
const { sendVerificationEmail } = require("../../Utils/mailer");
const model = new DbService(Student);

const studentService = {
  create: serviceHandler(async (data) => {
    const { email, password, ...userData } = data;
    // const email=data.email
    console.log(password, email);
    // Check if email and password are provided
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const hashedPassword = await hashPassword(password);

    // Save the student data to the database
    const savedData = await model.save({
      email,
      ...userData,
      password: hashedPassword,
    });

    // Generate a token for email verification
    const token = generateToken({ userId: savedData.email });
    console.log("token create:",token);

    console.log("Sending verification email to:", email);
    // Send verification email
    await sendVerificationEmail(email, token);
    console.log("Verification email sent successfully to:", email);

    return { msg: "Student created Successfully", data: savedData, token };
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
    const savedData = await model.getAllDocuments(query, data);
    const totalCount = await model.totalCounts({ isDelete: false });

    return { savedData, totalCount };
  }),

  getById: serviceHandler(async (dataId) => {
    const { studentId } = dataId;
    const query = { isDelete: false, _id: studentId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),

  update: serviceHandler(async (updateData) => {
    const { StudentId } = updateData;
    const filter = { _id: StudentId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),

  delete: serviceHandler(async (deleteId) => {
    const { StudentId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: StudentId },
      { isDelete: true }
    );
    return deletedDoc;
  }),

  signIn: serviceHandler(async (email, password) => {
    const filter = { email };
    const student = await model.getDocument(filter);

    if (!student) {
      throw new CustomError(404, "Student not found");
    }
    const isPasswordMatch = await comparePasswords(password, student.password);

    if (!isPasswordMatch) {
      throw new CustomError(401, "Incorrect password");
    }

    const token = generateToken({ userId: student._id });
    return { token };
  }),

  verifyEmail: serviceHandler(async (decodedUser) => {
  

    const { userId } = decodedUser.userId.userId;

    // Define the query to find the user
    const query = { _id: userId };
  
    // Find the user in the database by userId
    const user = await model.getDocumentById({userId});
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Update the emailVerified status
    user.emailVerified = true;
    const savedUser = await user.save();
    console.log("saveduserr",savedUser);
  
    return savedUser;
    
    
  }),
};

const StudentService = studentService;
module.exports = StudentService;
