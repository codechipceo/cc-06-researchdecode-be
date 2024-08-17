const socketIo = require("socket.io");
// Assume you have a Chat model for saving messages to the database
const corsOptions = {
  origin: "*", // Add allowed origins here
  methods: ["GET", "POST"],
  credentials: false,
};
const conSocket = (server) => {
  const io = socketIo(server, {
    cors: corsOptions, // Apply CORS configuration
  });

  io.on("connection", (socket) => {
    console.log("A new client connected");

    socket.on("joinRoom", (params) => {
      console.log(params)
      const { roomId, userId } = params;
      console.log(`${userId} joined room ${roomId}`);
      socket.emit("roomJoinConfirm", { msg: "new room joined" });
    });

    socket.emit('connection' , socket.id)

    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("offer", (data) => {
      console.log("Offer received:", data);
      socket.broadcast.emit("offer", data);
    });

    socket.on("answer", (data) => {
      console.log("Answer received:", data);
      socket.broadcast.emit("answer", data);
    });

    socket.on("candidate", (data) => {
      console.log("Candidate received:", data);
      socket.broadcast.emit("candidate", data);
    });
  });
};

module.exports = conSocket;
