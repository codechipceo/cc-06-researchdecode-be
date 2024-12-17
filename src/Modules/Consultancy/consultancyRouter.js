const { verifyToken } = require("../../Utils/utils");
const consultancyCtrl = require("./consultancyCtrl");

const consultancyRouter = require("express").Router();

consultancyRouter.post("/create", consultancyCtrl.create);
consultancyRouter.post("/getAll", consultancyCtrl.getAll);
consultancyRouter.post("/getById", consultancyCtrl.getById);
consultancyRouter.post("/verifypayment", consultancyCtrl.verifyPayment);
consultancyRouter.post("/verifyConsultancy",verifyToken, consultancyCtrl.verifyConsultancy);
consultancyRouter.post("/endConsultancy",verifyToken, consultancyCtrl.endConsultancy);
consultancyRouter.post("/activeOrInactiveConsultancy",verifyToken, consultancyCtrl.activeOrInactiveConsultancy);
module.exports = consultancyRouter;