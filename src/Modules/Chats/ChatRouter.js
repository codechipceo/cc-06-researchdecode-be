const { verifyToken } = require("../../Utils/utils");
const { chatCtrl } = require("./ChatCtrl");
const chatRouter = require("express").Router();

chatRouter.post("/create", chatCtrl.createChat);
chatRouter.post("/getAll", chatCtrl.getAll);
// chatRouter.post("/create");
// chatRouter.post("/create");
chatRouter.post("/getinbox", verifyToken, chatCtrl.inbox);
chatRouter.post("/twouserchats", chatCtrl.getChatsBetweenUsers);

module.exports = { chatRouter };
