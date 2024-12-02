const { verifyToken } = require("../../Utils/utils");
const { chatCtrl } = require("./ChatCtrl");
const chatRouter = require("express").Router();

// chatRouter.post("/create", chatCtrl.createChat);
// chatRouter.post("/getAll", chatCtrl.getAll);
// chatRouter.post("/getinbox", verifyToken, chatCtrl.inbox);
// chatRouter.post("/twouserchats", chatCtrl.getChatsBetweenUsers);
chatRouter.post("/send", verifyToken, chatCtrl.sendMessage);
chatRouter.post("/history", verifyToken, chatCtrl.getChatHistory);

module.exports = { chatRouter };
