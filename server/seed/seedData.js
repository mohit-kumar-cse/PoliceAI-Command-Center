// C:\PoliceAI-Command-Center\server\seed\seedData.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Crime = require("../src/models/Crime");
const Alert = require("../src/models/Alert");
const Vehicle = require("../src/models/Vehicle");
const Camera = require("../src/models/Camera");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Crime.deleteMany();
    await Alert.deleteMany();
    await Vehicle.deleteMany();
    await Camera.deleteMany();

    const crimes = await Crime.insertMany([
      {
        crimeType: "Robbery",
        location: "Sector 15",
        latitude: 26.85,
        longitude: 80.95,
        severity: "high",
        riskScore: 85,
      },
      {
        crimeType: "Vehicle Theft",
        location: "Railway Station",
        latitude: 26.83,
        longitude: 80.92,
        severity: "medium",
        riskScore: 60,
      },
      {
        crimeType: "Assault",
        location: "Market Area",
        latitude: 26.86,
        longitude: 80.94,
        severity: "critical",
        riskScore: 90,
      },
    ]);

    const alerts = await Alert.insertMany([
      {
        type: "Weapon Detected",
        location: "Sector 15",
        latitude: 26.85,
        longitude: 80.95,
        confidence: 94,
        source: "CCTV",
      },
      {
        type: "Suspicious Activity",
        location: "Market Area",
        latitude: 26.86,
        longitude: 80.94,
        confidence: 87,
        source: "AI",
      },
    ]);

    const vehicles = await Vehicle.insertMany([
      {
        vehicleId: "POLICE-101",
        driverName: "Officer Sharma",
        status: "available",
        currentLocation: {
          latitude: 26.84,
          longitude: 80.93,
        },
      },
      {
        vehicleId: "POLICE-102",
        driverName: "Officer Kumar",
        status: "busy",
        currentLocation: {
          latitude: 26.86,
          longitude: 80.94,
        },
      },
    ]);

    // streamUrl points to demo video files served from client/public/streams
    const cameras = await Camera.insertMany([
      {
        cameraName: "Camera Sector 15",
        location: "Sector 15",
        latitude: 26.85,
        longitude: 80.95,
        status: "online",
        streamUrl: "/streams/sector15.mp4",
      },
      {
        cameraName: "Camera Market",
        location: "Market Area",
        latitude: 26.86,
        longitude: 80.94,
        status: "online",
        streamUrl: "/streams/market.mp4",
      },
      {
        cameraName: "Camera Railway Station",
        location: "Railway Station",
        latitude: 26.83,
        longitude: 80.92,
        status: "online",
        streamUrl: "/streams/railway.mp4",
      },
      {
        cameraName: "Camera Airport Road",
        location: "Airport Road",
        latitude: 26.81,
        longitude: 80.91,
        status: "online",
        streamUrl: "/streams/airport.mp4",
      },
    ]);

    console.log("Police AI Data Seeded Successfully 🚔");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();
