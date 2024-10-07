const DbService = require("../../Service/DbService");
const Labs = require("./labsModel");
const model = new DbService(Labs);
const serviceHandler = require("../../Utils/serviceHandler");

const labsService = {
  create: serviceHandler(async (data) => {}),
};

module.exports = labsService;
