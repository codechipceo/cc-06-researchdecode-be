const { paperRequestCtrl } = require("./paperRequestCtrl");
const paperRequestRouter = require("express").Router();

paperRequestRouter.post("/createRequest", paperRequestCtrl.create);
paperRequestRouter.post("/approveRequest", paperRequestCtrl.approve);
paperRequestRouter.post("/uploadRequestPaper", paperRequestCtrl.upload);
paperRequestRouter.post(
  "/pendingRequests",
  paperRequestCtrl.getAllPendingRequests
);

module.exports = { paperRequestRouter };
