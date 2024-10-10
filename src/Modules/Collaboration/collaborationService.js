const DatabaseService = require("../../Service/DbService");
const Collaboration = require("./collaborationModel");

const model = new DatabaseService(Collaboration);

const collaborationService = {
  createCollaboration: async (data) => {
    const newCollaboration = await model.save(data);
    return newCollaboration;
  },

  getAllCollaborations: async (data) => {
    ents;
    const query = { isDelete: false };

    const savedData = await model.getAllDocuments(query);

    const totalCount = await model.totalCounts(query);

    return { savedData, totalCount };
  },

  getCollaborationById: async (paperId) => {
    return await model.getDocumentById({ paperId });
  },

  updateCollaboration: async (paperId, updateData) => {
    return await model.updateDocument(
      { paperId },
      updateData,
      { new: true } // Return the updated document
    );
  },

  deleteCollaboration: async (paperId) => {
    return await model.deleteDocument({ paperId });
  },

  searchCollaborations: async (query) => {
    const searchCondition = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { abstract: { $regex: query, $options: "i" } },
      ],
    };
    return await model.getAllDocuments(searchCondition);
  },

  getCollaborationsByStudentId: async (studentId) => {
    const filter = { "postedBy.studentId": studentId };
    return await model.getAllDocuments(filter);
  },
};

module.exports = collaborationService;
