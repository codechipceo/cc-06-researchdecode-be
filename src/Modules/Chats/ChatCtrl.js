const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const { chatService } = require("./ChatService");
const { io } = require("../Sockets/socket"); // Import the io instance

const chatCtrl = {
  sendMessage: asyncHandler(async (req, res, next) => {
    const { sender, recipient, content, senderModel, recipientModel } =
      req.body;

    const messageData = {
      sender,
      senderModel,
      recipient,
      recipientModel,
      content,
    };
    const savedMessage = await chatService.createChats(messageData);

    io.to(recipient).emit("message", savedMessage);

    return successResponse({ data: savedMessage, msg: "Message sent", res });
  }),


   getAll: asyncHandler(async (req, res, next) => {
    const courseDto = req.body;
    const { savedData, totalCount } = await chatService.getAll(courseDto);
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All Courses",
    });
  }),


  getChatHistory: asyncHandler(async (req, res, next) => {
    const courseDto = req.body;
    console.log(courseDto);
    
    const chatHistory = await chatService.getChatHistory(courseDto);
    return successResponse({
      data: chatHistory,
      msg: "Chat history retrieved",
      res,
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const courseId = req.body;
    const courseById = await courseService.getById(courseId);
    return successResponse({ res, data: courseById, msg: "Course By Id" });
  }),
  inbox: asyncHandler(async (req, res, next) => {
    const inbox = await chatService.getInbox(req.body);
    return successResponse({ data: inbox, res, msg: "User Inbox" });
  }),

   update: asyncHandler(async (req, res, next) => {
    const courseDto = req.body;
    const updatedCourse = await courseService.update(courseDto);
    return successResponse({
      res,
      data: updatedCourse,
      msg: "Updated Course successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const courseId = req.body;
    const deletedDoc = await courseService.delete(courseId);
    return successResponse({
      res,
      data: deletedDoc,
      msg: "Course Deleted Successfully",
    });
  }),
};


module.exports = { chatCtrl };
