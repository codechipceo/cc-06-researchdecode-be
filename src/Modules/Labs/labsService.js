const DbService = require("../../Service/DbService");
const Labs = require("./labsModel");
const model = new DbService(Labs);
const serviceHandler = require("../../Utils/serviceHandler");
const uploadFileService = require("../../Utils/uploader");

const labsService = {
  search: serviceHandler(async (searchTerm) => {
    const labs = await model.getAllDocuments({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    });
    return labs;
  }),
  create: serviceHandler(async (data) => {
    data.createdByRole = data.decodedUser.role;
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDeleted: false, ...data };
    console.log(query);
    const populate = [
      {
        path: "studentRequests",
      },
    ];
    const options = { populate };

    const savedData = await model.getAllDocuments(query, options);
    const totalCount = await model.totalCounts({ isDeleted: false });
    return { savedData, totalCount };
  }),

  getLabById: serviceHandler(async (labId) => {
    const query = { isDeleted: false, _id: labId };
    const savedData = await model.getDocumentById(query);
    const totalCount = await model.totalCounts({ isDeleted: false });
    return { savedData, totalCount };
  }),
  update: serviceHandler(async (updateData) => {
    const { labId } = updateData;
    const filter = { _id: labId, isDeleted: false };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (labId) => {
    const deletedDoc = await model.updateDocument(
      { _id: labId },
      { isDeleted: true }
    );
    return deletedDoc;
  }),
};

module.exports = labsService;
