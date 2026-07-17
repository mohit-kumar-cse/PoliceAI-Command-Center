// C:\PoliceAI-Command-Center\server\src\models\Camera.js
const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema({
  cameraName: {
    type: String,

    required: true,
  },

  location: {
    type: String,
  },

  latitude: Number,

  longitude: Number,

  streamUrl: {
    type: String,
  },

  status: {
    type: String,

    enum: ["online", "offline"],

    default: "offline",
  },

  lastDetection: {
    type: String,
  },
});

module.exports = mongoose.model("Camera", cameraSchema);
