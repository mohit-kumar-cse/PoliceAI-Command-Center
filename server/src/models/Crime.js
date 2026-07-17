// C:\PoliceAI-Command-Center\server\src\models\Crime.js
const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema({
  crimeType: {
    type: String,

    required: true,
  },

  location: {
    type: String,

    required: true,
  },

  latitude: {
    type: Number,
  },

  longitude: {
    type: Number,
  },

  date: {
    type: Date,

    default: Date.now,
  },

  severity: {
    type: String,

    enum: ["low", "medium", "high", "critical"],

    default: "medium",
  },

  status: {
    type: String,

    default: "reported",
  },

  riskScore: {
    type: Number,

    default: 0,
  },
});

module.exports = mongoose.model("Crime", crimeSchema);
