const socketIo = require("socket.io");
const { chatService } = require("../Chats/ChatService");

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
    console.log("A new client connected", socket.id);

    // Track total connected clients
    const clientsCount = io.sockets.sockets.size;
    console.log(`Total connected clients: ${clientsCount}`);

    // Join a room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      // Leave a room
      socket.on("leaveroom", (params) => {
        console.log(`User ${socket.id} left room`, params);
        socket.leave(params.roomId);
      });

      // Chat event handling
      socket.on("chat", async (params) => {
        const { sender, recipient, content, senderModel, recipientModel } = params;
        const messageData = {
          sender,
          senderModel,
          recipient,
          recipientModel,
          content,
        };

        await chatService.createChats(messageData);
        io.to(roomId).emit("message", messageData);
        console.log(`Message sent in room ${roomId} by ${sender}: ${content}`);
      });
    });

    // WebRTC signaling events
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
      socket.broadcast.emit("offer", data);
    });

    socket.on("answer", (data) => {
      socket.broadcast.emit("answer", data);
    });

    socket.on("candidate", (data) => {
      console.log("Candidate received:", data);
      socket.broadcast.emit("candidate", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
      socket.broadcast.emit("callEnded");
    });
  });
};

module.exports = conSocket;
