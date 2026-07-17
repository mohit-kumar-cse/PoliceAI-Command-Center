// C:\PoliceAI-Command-Center\server\src\models\Vehicle.js
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleId: {
    type: String,

    required: true,

    unique: true,
  },

  driverName: {
    type: String,
  },

  status: {
    type: String,

    enum: ["available", "busy", "offline"],

    default: "available",
  },

  currentLocation: {
    latitude: Number,

    longitude: Number,
  },

  assignedRoute: {
    type: String,
  },

  lastUpdated: {
    type: Date,

    default: Date.now,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
