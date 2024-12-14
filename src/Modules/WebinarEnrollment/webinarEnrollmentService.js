const dbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const webinarEnrollmentModel = require("./webinarEnrollmentModel");
const model = new dbService(webinarEnrollmentModel)

const webinarEnrollmentService = {
    create: serviceHandler(async (data) => {
        const { _id: webinarId, decodedUser: { _id: studentId } } = data;
        data = {
            webinarId,
            studentId
        }
        return await model.save(data);
    }),

    getById: serviceHandler(async (data) => {
        const { _id: studentId } = data.decodedUser;
        const query = {studentId:studentId};
        const savedDataById = await model.getAllDocuments(query);
        return savedDataById;
    }),

    delete: serviceHandler(async (data) => {
        const {_id: webinarId, decodedUser:{_id: studentId} } = data;
        const query = { webinarId, studentId };
        const deletedDocDetails = await model.getDocumentById(query);
        const deletedDoc = await model.deleteDocument({ studentId, webinarId });
        return deletedDocDetails
    })
}

const WebinarEnrollmentService = webinarEnrollmentService;
module.exports = WebinarEnrollmentService;