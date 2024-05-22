const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const Videos = require("./videosModel");
const model = new DbService(Videos);

const videoService = {
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
    const { videoId } = dataId;
    const query = { isDelete: false, _id: videoId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { videoId } = updateData;
    const filter = { _id: videoId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { videoId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: videoId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
};

module.exports = videoService;
