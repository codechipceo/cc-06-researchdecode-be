const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const Chats = require("./ChatModel");

const model = new DatabaseService(Chats);
const chatService = {
  createChats: serviceHandler(async (data) => {
    return await model.save(data);
  }),
  getAll: serviceHandler(async (data) => {
    const query = {};
    data.populate = [{ path: "sender" }, { path: "recipient" }];
    const savedData = await model.getAllDocuments(query, data);
    const totalCount = await model.totalCounts({ isDelete: false });
    return { savedData, totalCount };
  }),

  getChatOfTwoUsers: serviceHandler(async (data) => {
    const { senderId, recepientId } = data;

    const query = {
      $or: [
        { sender: senderId, recepient: recepientId },
        { sender: recepientId, recepient: senderId },
      ],
    };

    const chats = await model.getAllDocuments(query);
    return chats;
  }),

  getById: serviceHandler(async (data) => {
    const { chatId } = data;
    const query = { isDelete: false, _id: chatId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { chatId } = updateData;
    const filter = { _id: chatId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { chatId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: chatId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
};

module.exports = { chatService };
