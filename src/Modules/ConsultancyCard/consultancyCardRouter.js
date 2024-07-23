const consultancyCardCtrl = require("./consultancyCardCtrl");

const consultancyCardRouter = require("express").Router();

consultancyCardRouter.post("/create", consultancyCardCtrl.create);
consultancyCardRouter.post("/getById", consultancyCardCtrl.getById);
consultancyCardRouter.post("/getAll", consultancyCardCtrl.getAll);

module.exports = consultancyCardRouter;
