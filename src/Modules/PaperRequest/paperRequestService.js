const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const PaperRequest = require("./PaperRequest");
const ResearchPaperModel = require("../ResearchPapers/researchPaperModel");
const model = new DatabaseService(PaperRequest);
const researchPapers = new DatabaseService(ResearchPaperModel);
const { chatService } = require("../Chats/ChatService");
const studentService = require("../Students/studentService");
const {
  researchPaperService,
} = require("../ResearchPapers/researchPaperService");
const CustomError = require("../../Errors/CustomError");
const paperRequestService = {
  createRequestResearchPaper: serviceHandler(async (data) => {
    const { DOI_number, requestBy, paperDetail } = data;
    const isResearchPaper = await researchPapers.getDocumentById({
      DOI_number,
    });

    if (isResearchPaper) {
      // callBotUser

      const botUsersArr = await studentService.getBotUsers();
      const randomIndex = Math.floor(
        Math.random() * botUsersArr.savedData.length
      );
      const botUser = botUsersArr.savedData[randomIndex];

      console.log(botUsersArr);

      const chatPayload = {
        sender: botUser._id,
        recepient: requestBy,
        content: isResearchPaper.fileUrl,
      };

      await chatService.createChats(chatPayload);
      return;
    }

    const isResearchPaperRequest = await model.getDocumentById({
      DOI_number,
      requestBy,
    });
    if (isResearchPaperRequest && !isResearchPaper) {
      throw new CustomError(400, "Request Already Exists");
    }
    const newResearchPaperRequest = await model.save({
      DOI_number,
      requestBy,
      paperDetail,
    });
    return newResearchPaperRequest;
  }),

  approveRequestResearchPaper: serviceHandler(async (data) => {
    const { DOI_number, fulfilledBy, requestId } = data;
    const filter = { _id: requestId,  };
    const updatePayload = { requestStatus: "approved", fulfilledBy };

    // await researchPaperService.create()
    const updatedRequest = await model.updateDocument(filter, updatePayload);
    console.log(updatedRequest);
    return updatedRequest;
  }),

  getAllRequestResearchPapers: serviceHandler(async (data) => {
    const query = { requestStatus: "pending" };
    const allRequests = await model.getAllDocuments(query, data);
    const totalCounts = await model.totalCounts(query);
    return { allRequests, totalCounts };
  }),
  uploadRequestPaper: serviceHandler(async (data) => {
    const { fulfilledBy, requestId, requestBy } = data;
    const filter = { _id: requestId };
    console.log(fulfilledBy, requestId, requestBy)
    const updatePayload = { requestStatus: "inProgress", fulfilledBy };
    await model.updateDocument(filter, updatePayload);

    const fileUrl = "https://morth.nic.in/sites/default/files/dd12-13_0.pdf"; // step to upload file

    const chatPayload = {
      sender: fulfilledBy,
      recepient: requestBy,
      content: fileUrl,
    };
    const newChat = await chatService.createChats(chatPayload);

    return newChat;
  }),

  getRequestDetailById: serviceHandler(async (data) => {
    const { requestId } = data
    const populateOptions = [{
      path:"requestBy"

      
    }]
    const requestData = await model.getDocumentById(
      { _id: requestId },
      populateOptions
    );
    return requestData
  })
};

module.exports = paperRequestService;
