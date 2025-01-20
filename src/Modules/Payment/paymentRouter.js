const paymentRouter = require("express").Router();
const { create }=require("./paymentCtrl")
const { verifyToken } = require("../../Utils/utils");

paymentRouter.route("/create").post(verifyToken,create)


console.log("in router");

module.exports = { paymentRouter };