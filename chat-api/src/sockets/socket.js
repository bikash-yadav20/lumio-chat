const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    const { userId } = socket.handshake.auth;

    if (userId) {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined personal room ${userId}`);
    }

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room ${conversationId}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};

const getIO = () => io;

module.exports = {
  initializeSocket,
  getIO,
};
