const { collaborationRequestCtrl } = require("./collaborationCtrl");
const { verifyToken } = require("../../Utils/utils");

const collaborationRequestRouter = require("express").Router();

collaborationRequestRouter.post(
  "/create",
  verifyToken,
  collaborationRequestCtrl.create
);
collaborationRequestRouter.post("/getAll", collaborationRequestCtrl.getAll);
collaborationRequestRouter.post("/getById", collaborationRequestCtrl.getById);
collaborationRequestRouter.post(
  "/update",
  verifyToken,
  collaborationRequestCtrl.update
);
collaborationRequestRouter.post(
  "/delete",
  verifyToken,
  collaborationRequestCtrl.delete
);

collaborationRequestRouter.post("/search", collaborationRequestCtrl.search);

collaborationRequestRouter.post(
  "/student",
  collaborationRequestCtrl.getByStudentId
);

module.exports = { collaborationRequestRouter };
