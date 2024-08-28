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
  getInbox: serviceHandler(async (data) => {
    const { decodedUser } = data ?? {};
    const pipeline = [
      {
        // Match records where the teacher is the recipient and the sender is a student
        $match: {
          recipient: new ObjectId(decodedUser?._id),
          recipientModel: "Profile",
          senderModel: "Student",
        },
      },
      {
        $group: {
          _id: "$sender", // Group by sender ID (Student ID)
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "_id",
          as: "studentDetails",
        },
      },
      {
        $unwind: "$studentDetails",
      },
      {
        // Project to flatten the studentDetails object fields to the top level
        $project: {
          _id: 1,
          firstName: "$studentDetails.firstName",
          lastName: "$studentDetails.lastName",
          email: "$studentDetails.email",
          emailVerified: "$studentDetails.emailVerified",
          isActive: "$studentDetails.isActive",
          points: "$studentDetails.points",
        },
      },
    ];
    const inbox = await model.aggregatePipeline(pipeline);

    return inbox;
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
        { sender: senderId, recipient: recepientId },
        { sender: recepientId, recipient: senderId },
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
