const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const ConsultancyCard = require("./ConsultancyCardModel");

const model = new DatabaseService(ConsultancyCard);

const consultancyCardService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    data.populate=[{path :'teacherId'}]
    return await model.getAllDocuments({}, data);
  }),

  getById: serviceHandler(async (data) => {
    const { consultancyCardId } = data;
    const query = { _id: consultancyCardId };
    const populateOptions = [{ path: "teacherId" }];
    return await model.getDocumentById(query, populateOptions);
  }),
};

module.exports = consultancyCardService;
