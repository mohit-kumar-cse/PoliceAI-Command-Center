// C:\PoliceAI-Command-Center\server\src\server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

// Routes
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const crimeRoutes = require("./routes/crimeRoutes");
const alertRoutes = require("./routes/alertRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const cctvRoutes = require("./routes/cctvRoutes");
const patrolRoutes = require("./routes/patrolRoutes");
const investigationRoutes = require("./routes/investigationRoutes");

// Database
const connectDB = require("./config/db");

// Socket Service
const { initSocket } = require("./services/websocketService");

// Error Middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/crime", crimeRoutes);
app.use("/api/alert", alertRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/cctv", cctvRoutes);
app.use("/api/patrol", patrolRoutes);
app.use("/api/investigation", investigationRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "Police AI Command Center Server Running 🚔",
    status: "ACTIVE",
  });
});

// 404 + Error Handlers (must come after all routes)
app.use(notFound);
app.use(errorHandler);

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚔 Server running on port ${PORT}`);
});