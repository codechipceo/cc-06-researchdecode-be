const DatabaseService = require("../../Service/DbService");
const Collaboration = require("./collaborationModel");

const model = new DatabaseService(Collaboration);

const collaborationService = {
  createCollaboration: async (data) => {
    const newCollaboration = await model.save(data);
    return newCollaboration;
  },

  getAllCollaborations: async (data) => {
    const query = { isDelete: false };
    const { search } = data;

    let savedData;
    if (search) {
      const searchCondition = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { abstract: { $regex: search, $options: "i" } },
        ],
      };

      savedData = await model.getAllDocuments(
        { ...query, ...searchCondition },
        data
      );
    } else {
      savedData = await model.getAllDocuments(query, data);
    }

    const totalCount = await model.totalCounts(query);

    return { savedData, totalCount };
  },

  getCollaborationById: async (paperId) => {
    return await model.getDocumentById({ paperId });
  },

  updateCollaboration: async (paperId, updateData) => {
    return await model.updateDocument({ paperId }, updateData, { new: true });
  },

  deleteCollaboration: async (paperId) => {
    return await model.deleteDocument({ paperId });
  },

  getCollaborationsByStudentId: async (studentId) => {
    const filter = { "postedBy.studentId": studentId };
    return await model.getAllDocuments(filter);
  },
};

module.exports = collaborationService;
