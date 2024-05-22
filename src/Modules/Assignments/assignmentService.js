const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const Assignment = require("./assignmentModel");
const model = new DbService(Assignment);

const AssignmentService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
    const savedData = await model.getAllDocuments(query, data);
    const totalCount = await model.totalCounts({ isDelete: false });
    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { AssignmentId } = dataId;
    const query = { isDelete: false, _id: AssignmentId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { AssignmentId } = updateData;
    const filter = { _id: AssignmentId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { AssignmentId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: AssignmentId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
};

module.exports = AssignmentService;
