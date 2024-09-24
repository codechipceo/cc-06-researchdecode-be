const labsCtrl = require("./labsCtrl");
const { verifyToken } = require("../../Utils/utils");

const labsRouter = require("express").Router();

labsRouter.post("/create", verifyToken, labsCtrl.create);

module.exports = { labsRouter };
