const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const ConsultancyCard = require("./consultancyCardModel");

const model = new DatabaseService(ConsultancyCard);

const consultancyCardService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const { search } = data;
    const query = { isDelete: false };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    
    data.populate = [{ path: "teacherId" }];
    return await model.getAllDocuments(query, data);
  }),

  getById: serviceHandler(async (data) => {
    const { consultancyCardId } = data;
    const query = { _id: consultancyCardId };
    const populateOptions = [{ path: "teacherId" }];
    return await model.getDocumentById(query, populateOptions);
  }),
};


module.exports = consultancyCardService;