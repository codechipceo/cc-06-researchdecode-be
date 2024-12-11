const dbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const webinarEnrollmentModel = require("./webinarEnrollmentModel");
const model = new dbService(webinarEnrollmentModel)

const webinarEnrollmentService = {
    create: serviceHandler(async (data) => {
        console.log(data)
        return await model.save(data);
    })
}

const WebinarEnrollmentService = webinarEnrollmentService;
module.exports = WebinarEnrollmentService;