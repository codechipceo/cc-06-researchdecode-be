const courseCtrl = require("./courseCtrl");

const courseRouter = require("express").Router();

courseRouter.post("/create", courseCtrl.create);
courseRouter.post("/getAll", courseCtrl.getAll);
courseRouter.post("/getById", courseCtrl.getById);
courseRouter.post("/update", courseCtrl.update);
courseRouter.post("/delete", courseCtrl.delete);

module.exports = { courseRouter };
