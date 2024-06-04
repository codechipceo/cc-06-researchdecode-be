const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const PaperRequest = require("./PaperRequest");
const ResearchPaperModel = require("../ResearchPapers/researchPaperModel");
const model = new DatabaseService(PaperRequest);
const researchPapers = new DatabaseService(ResearchPaperModel);

const paperRequestService = {
  createRequestResearchPaper: serviceHandler(async (data) => {
    const { DOI_number, requestBy } = data;
    const isResearchPaper = await researchPapers.getDocumentById({
      DOI_number,
    });

    if (isResearchPaper) {
      // callBotUser()
    }

    const isResearchPaperRequest = await model.getDocumentById({
      DOI_number,
      requestBy,
    });
    if (isResearchPaperRequest && !isResearchPaper) {
    }
    const newResearchPaperRequest = await model.save({ DOI_number, requestBy });
    return newResearchPaperRequest;
  }),

  approveRequestResearchPaper: serviceHandler(async (data) => {
    const { DOI_number, fulfilledBy, requestId } = data;
    const filter = { _id: requestId, DOI_number };
    const updatePayload = { requestStatus: "approved" };
    const updatedRequest = await model.updateDocument(filter, updatePayload);
    return updatedRequest;
  }),

  getAllRequestResearchPapers: serviceHandler(async (data) => {
    const query = { requestStatus: "pending" };
    const allRequests = await model.getAllDocuments(query, data);
    const totalCounts = await model.totalCounts(query);
    return { allRequests, totalCounts };
  }),
};

module.exports = paperRequestService;
