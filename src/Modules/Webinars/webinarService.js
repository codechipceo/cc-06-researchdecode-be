const WebinarModel = require("./webinarModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const model = new DbService(WebinarModel);

const webinarService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    console.log(data)
    const role = data.userRole;
    const query = { isDeleted: false };
    if (role === "TEACHER") {
      query.createdBy = data.createdBy;
    }
    const { search } = data;
    if (search) {
      query.webinarTitle = { $regex: search, $options: "i" };
    }
    const populate = [
      {
        path: "createdBy", select: "name email"
      },
    ];
    const options = { ...data, populate };

    const savedData = await model.getAllDocuments(query, options);
    const totalCount = await model.totalCounts({ isDelete: false });

    return { savedData, totalCount };
  }),

  getById: serviceHandler(async (data) => {
    const { _id: webinarId } = data;
    const query = { _id: webinarId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),

  update: serviceHandler(async (data) => {
    const { _id: webinarId } = data;
    const filter = { _id: webinarId };
    const updatePayload = { ...data };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),

  delete: serviceHandler(async (data) => {
    const { _id: webinarId } = data;
    const deletedDoc = await model.deleteDocument({ _id: webinarId });
    return deletedDoc;
  }),
};

const WebinarService = webinarService;
module.exports = WebinarService;
