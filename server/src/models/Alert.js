// C:\PoliceAI-Command-Center\server\src\models\Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  type: {
    type: String,

    required: true,
  },

  location: {
    type: String,
  },

  latitude: Number,

  longitude: Number,

  confidence: {
    type: Number,

    default: 0,
  },

  source: {
    type: String,

    enum: ["CCTV", "AI", "Manual"],

    default: "AI",
  },

  status: {
    type: String,

    enum: ["active", "resolved"],

    default: "active",
  },

  createdAt: {
    type: Date,

    default: Date.now,
  },
});

module.exports = mongoose.model("Alert", alertSchema);
