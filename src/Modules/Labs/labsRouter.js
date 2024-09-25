const labsCtrl = require("./labsCtrl");
const { verifyToken } = require("../../Utils/utils");

const labsRouter = require("express").Router();

labsRouter.post("/create", verifyToken, labsCtrl.create);
labsRouter.post("/getById", verifyToken, labsCtrl.search);
module.exports = { labsRouter };
