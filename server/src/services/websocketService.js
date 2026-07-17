// C:\PoliceAI-Command-Center\server\src\services\websocketService.js
let io;

const initSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🚔 Dashboard Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Dashboard Disconnected");
    });
  });
};

const sendAlert = (data) => {
  if (io) {
    io.emit("crime_alert", data);
  }
};

module.exports = {
  initSocket,
  sendAlert,
};