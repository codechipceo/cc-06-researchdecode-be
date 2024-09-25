const DbService = require("../../Service/DbService");
const Labs = require("./labsModel");
const model = new DbService(Labs);
const serviceHandler = require("../../Utils/serviceHandler");

const labsService = {
  create: serviceHandler(async (data) => {
    const lab = await model.save(data);
    return lab;
  }),
  search: serviceHandler(async (searchTerm) => {
    const labs = await model.getAllDocuments({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    });
    return labs;
  }),
};

module.exports = labsService;
