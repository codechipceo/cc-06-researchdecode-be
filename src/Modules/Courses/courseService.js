const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const Course = require("./coursesModel");
const model = new DbService(Course);

const courseService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
    const populate = [
      {
        path: "instructor",
      },
    ];
    const options = { ...data, populate };

    const savedData = await model.getAllDocuments(query, options);
    const totalCount = await model.totalCounts({ isDelete: false });
    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { courseId } = dataId;
    const query = { isDelete: false, _id: courseId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { courseId } = updateData;
    const filter = { _id: courseId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { courseId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: courseId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
};

module.exports = courseService;
