const Teacher = require("../Profiles/profileModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const CustomError = require("../../Errors/CustomError");
const {
  hashPassword,
  comparePasswords,
  generateToken,
} = require("../../Utils/utils");
const bcrypt = require("bcryptjs");

const model = new DbService(Teacher);

const teacherService = {
  create: serviceHandler(async (data) => {
    const { password, ...teacherData } = data;
    const hashedPassword = await hashPassword(password);

    const savedData = await model.save({
      ...teacherData,
      password: hashedPassword,
    });

    return savedData;
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false, role: "TEACHER" };
    const savedData = await model.getAllDocuments(query, data);
    const totalCount = await model.totalCounts({ isDelete: false, role:"TEACHER" });

    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { supervisorId } = dataId;
    const query = { isDelete: false, _id: supervisorId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { teacherId } = updateData;
    const filter = { _id: teacherId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { teacherId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: teacherId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
  signIn: serviceHandler(async (email, password) => {
    const filter = { email };
    const customer = await model.getDocument(filter);

    if (!customer) {
      throw new CustomError(404, "customer not found");
    }
    const isPasswordMatch = await comparePasswords(password, customer.password);

    if (!isPasswordMatch) {
      throw new CustomError(401, "Incorrect password");
    }
    const token = generateToken(customer);
    return { token };
  }),
};
const TeacherService = teacherService;
module.exports = TeacherService;
