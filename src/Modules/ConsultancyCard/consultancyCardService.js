const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const ConsultancyCard = require("./consultancyCardModel");

const model = new DatabaseService(ConsultancyCard);

const consultancyCardService = {
  create: serviceHandler(async (data) => {
    console.log(data)
    const payload = { ...data, teacherId : data.createdBy}
    return await model.save(payload);
  }),

getAll: serviceHandler(async (data) => {
  const { search, userRole,createdBy  } = data; // Extract user role and teacher ID

  const query = { isDelete: false };

  // Apply search filter
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const res = await model.getAllDocuments(query, data);

   const filteredData = userRole === "TEACHER" 
    ? res.filter((item) => item.teacherId?._id.toString() === createdBy.toString()) 
    : res;
  return filteredData;
}),


  getById: serviceHandler(async (data) => {
    const { consultancyCardId } = data;
    const query = { _id: consultancyCardId };
    const populateOptions = [{ path: "teacherId" }];
    return await model.getDocumentById(query, populateOptions);
  }),

  getUserConsultancyCard: serviceHandler(async (teacherId) => {
    const query = { teacherId: teacherId, isDelete: false }; // Assuming userId is a field in the model
    return await model.getAllDocuments(query);
  }),

  update: serviceHandler(async (data) => {
    const { consultancyCardId, ...updateData } = data; // Extract ID and other fields
    const query = { _id: consultancyCardId };
    return await model.updateDocument(query, updateData);
  }),

  delete: serviceHandler(async (data) => {
    const { consultancyCardId } = data;
    const query = { _id: consultancyCardId };
    return await model.deleteDocument(query);
  }),
};

module.exports = consultancyCardService;
