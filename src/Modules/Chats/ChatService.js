const DatabaseService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const Chats = require("./ChatModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const model = new DatabaseService(Chats);
const Student = require('../Students/studentModel');
const Teacher = require("../Teachers/teacherModel");
const chatService = {
  createChats: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getChatHistory: serviceHandler(async ( data) => {



    const { decodedUser } = data ?? {};
    const senderId = decodedUser._id;

     console.log(senderId);
    const query = {
      $or: [
        { sender: senderId, recipient: data.recipientId },
        { sender: data.recipientId, recipient: senderId },
      ],
    };
    return await model.getAllDocuments(query);
  }),


getInbox: serviceHandler(async (data) => {
  const { decodedUser } = data ?? {};
  const userId = decodedUser?._id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  
  const messages = await model.getAllDocuments({
    $or: [
      { sender: userId },   
      { recipient: userId }, 
    ],
  });


  const participantIds = new Set();
  messages.forEach((message) => {
    if (message.sender.toString() !== userId) {
      participantIds.add(message.sender.toString());
    }
    if (message.recipient.toString() !== userId) {
      participantIds.add(message.recipient.toString()); 
    }
  });

  console.log(participantIds);
  

  
  const studentDetails = await Student.find({
    _id: { $in: Array.from(participantIds) },
  });

  const teacherDetails = await Teacher.find({
    _id: { $in: Array.from(participantIds) },
  });


  const participantDetails = [...studentDetails, ...teacherDetails];

  
  return {
    msg: "User Inbox",
    data: participantDetails,
    count: participantDetails.length,
  };
}),


// getInbox: serviceHandler(async (data) => {
//   const { decodedUser } = data ?? {};

//   const pipeline = [
//     {
//       // Match records where the user is either the recipient or sender (both sent and received messages)
//       $match: {
//         $or: [
//           {
//             recipient: new ObjectId(decodedUser?._id), // Messages received
//           },
//           {
//             sender: new ObjectId(decodedUser?._id), // Messages sent
//           },
//         ]
//       }
//     },
//     {
//       // Group by sender and recipient to get all involved users
//       $group: {
//         _id: null,  // Null to group all records together
//         senderIds: { $addToSet: "$sender" },  // Collect unique sender IDs
//         recipientIds: { $addToSet: "$recipient" },  // Collect unique recipient IDs
//       },
//     },
//     {
//       // Combine sender and recipient IDs into a single array of unique IDs
//       $project: {
//         _id: 0,
//         ids: { $setUnion: ["$senderIds", "$recipientIds"] },  // Combine both sets into one
//       },
//     },
//     {
//       // Lookup the details of users based on the combined IDs (could be students or teachers)
//       $lookup: {
//         from: "students", // Look up from the students collection (you may need to adjust this for teachers if required)
//         localField: "ids", // Use the combined array of IDs
//         foreignField: "_id",
//         as: "userDetails",
//       },
//     },
//     {
//       // Unwind the user details array to separate each user in the array
//       $unwind: "$userDetails",
//     },
//     {
//       // Exclude the logged-in user (do not return details for the logged-in user)
//       $match: {
//         "userDetails._id": { $ne: new ObjectId(decodedUser?._id) },
//       },
//     },
//     {
//       // Project the relevant user details for each user
//       $project: {
//         _id: "$userDetails._id",
//         firstName: "$userDetails.firstName",
//         lastName: "$userDetails.lastName",
//         email: "$userDetails.email",
//         emailVerified: "$userDetails.emailVerified",
//         isActive: "$userDetails.isActive",
//         points: "$userDetails.points",
//       },
//     },
//   ];

//   const inbox = await model.aggregatePipeline(pipeline);

//   return inbox;
// }),


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
