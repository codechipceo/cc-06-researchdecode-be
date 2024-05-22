const videoCtrl = require("./videoCtrl");

const videoRouter = require("express").Router();

videoRouter.post("/create", videoCtrl.create);
videoRouter.post("/getAll", videoCtrl.getAll);
videoRouter.post("/getById", videoCtrl.getById);
videoRouter.post("/update", videoCtrl.update);
videoRouter.post("/delete", videoCtrl.delete);

module.exports = { videoRouter };
