const multer = require("multer");

const { paperRequestCtrl } = require("./paperRequestCtrl");
const { verifyToken } = require("../../Utils/utils");
const paperRequestRouter = require("express").Router();

const upload = multer({ dest: "uploads/" });

paperRequestRouter.post("/createRequest", paperRequestCtrl.create);
paperRequestRouter.post("/approveRequest", paperRequestCtrl.approve);


paperRequestRouter.post(
  "/uploadRequestPaper",

  upload.single("file"),
  verifyToken,
  paperRequestCtrl.upload
);
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
