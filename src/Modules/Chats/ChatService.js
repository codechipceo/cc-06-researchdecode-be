const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const Chats = require("./ChatModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const model = new DatabaseService(Chats);

const chatService = {
  createChats: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getChatHistory: serviceHandler(async (senderId, recipientId) => {
    const query = {
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
    };
    return await model.getAllDocuments(query);
  }),
};

module.exports = { chatService };
