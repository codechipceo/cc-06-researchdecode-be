const consultancyCtrl = require("./consultancyCtrl");

const consultancyRouter = require("express").Router();

consultancyRouter.post("/create", consultancyCtrl.create);
consultancyRouter.post("/getAll", consultancyCtrl.getAll);
consultancyRouter.post("/getById", consultancyCtrl.getById);
consultancyRouter.post("/verifypayment", consultancyCtrl.verifyPayment);


module.exports = consultancyRouter;
