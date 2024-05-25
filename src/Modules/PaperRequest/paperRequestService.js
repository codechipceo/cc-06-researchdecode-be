const DatabaseService = require("../../Service/DbService");
const asyncHandler = require("../../Utils/asyncHandler");
const serviceHandler = require("../../Utils/serviceHandler");
const PaperRequest = require("./PaperRequest");
const model = new DatabaseService(PaperRequest);

const paperRequestService = {
  create: serviceHandler(async (data) => {
    const { DOI_number, requestBy } = data;
    const researchPaper = await model.getDocumentById({
      DOI_number: DOI_number,
    });
  }),
};
