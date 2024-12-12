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
    })
}

const WebinarEnrollmentService = webinarEnrollmentService;
module.exports = WebinarEnrollmentService;