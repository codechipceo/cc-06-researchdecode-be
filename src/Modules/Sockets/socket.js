const socketIo = require("socket.io");
const { chatService } = require("../Chats/ChatService");

const conSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: false,
    },
  });

  io.on("connection", (socket) => {
    console.log("A new client connected", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      socket.on("chat", async (params) => {
        const { sender, recipient, content, senderModel, recipientModel } =
          params;

        const messageData = {
          sender,
          senderModel,
          recipient,
          recipientModel,
          content,
        };
        await chatService.createChats(messageData);

        io.to(roomId).emit("message", messageData);
        console.log(`Message sent from ${sender} to ${recipient}: ${content}`);
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = conSocket;
