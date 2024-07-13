const { paperRequestCtrl } = require("./paperRequestCtrl");
const paperRequestRouter = require("express").Router();

paperRequestRouter.post("/createRequest", paperRequestCtrl.create);
paperRequestRouter.post("/approveRequest", paperRequestCtrl.approve);
paperRequestRouter.post("/uploadRequestPaper", paperRequestCtrl.upload);
paperRequestRouter.post(
  "/pendingRequests",
  paperRequestCtrl.getAllPendingRequests
);

paperRequestRouter.post(
  "/getPendingRequestById",
  paperRequestCtrl.getPendingRequestById
);
paperRequestRouter.post(
  "/getPendingRequestByUserId",
  paperRequestCtrl.getRequestByUserId
);

module.exports = { paperRequestRouter };
