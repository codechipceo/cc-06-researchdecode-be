const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const GlobalErrorHandler = require("./src/Errors/GlobalError");
const { adminRouter, userRouter } = require("./src/indexRouter");
const CustomError = require("./src/Errors/CustomError");

const app = express();

// initialise required modules
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

// to manage routes of ADMIN_PANEL and WEBSITE seperately
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.use(GlobalErrorHandler);

// to manage incorrect routes
app.use("*", (req, res) => {
  return res
    .status(404)
    .json({ msg: `Requested Route ${req.originalUrl} does not exist ` });
});

module.exports = app;
