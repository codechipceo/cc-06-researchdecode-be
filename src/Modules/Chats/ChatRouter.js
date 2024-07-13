const { chatCtrl } = require("./ChatCtrl");
const chatRouter = require("express").Router();

// chatRouter.post("/create");
// chatRouter.post("/create");
// chatRouter.post("/create");
// chatRouter.post("/create");
// chatRouter.post("/create");
chatRouter.post("/twouserchats", chatCtrl.getChatsBetweenUsers)

module.exports = { chatRouter };
