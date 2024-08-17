require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const CustomError = require("./src/Errors/CustomError");
const  http = require('http');
const conSocket = require("./src/Modules/Sockets/socket");
// Shut down server if Uncaught Exception occurs

const socketServer = http.createServer(app);
socketServer.listen(5001)
conSocket(socketServer);
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception, Shutting down server");
  process.exit(1);
});

const activeEnviroment = process.env.NODE_ENV;
const activeDbString = {
  local: process.env.MONGODB_LOCAL,
  test: process.env.MONGODB_TEST,
  prod: process.env.MONGODB_PROD,
};

const URI = activeDbString[activeEnviroment];

mongoose
.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Mongo Db Connected", URI);
})
.catch((err) => {
  console.log(err);
  throw err;
});

const PORT = process.env.PORT || 5000;

// node start server
const server = app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});




// Shut down server if unhandled rejection occurs
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection, Shutting Down");
  server.close(() => {
    process.exit(1);
  });
});
