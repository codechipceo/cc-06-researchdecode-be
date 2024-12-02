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
  getChatHistory: asyncHandler(async (req, res, next) => {
    const { senderId, recipientId } = req.body;
    const chatHistory = await chatService.getChatHistory(senderId, recipientId);
    return successResponse({
      data: chatHistory,
      msg: "Chat history retrieved",
      res,
    });
  }),
};

module.exports = { chatCtrl };
