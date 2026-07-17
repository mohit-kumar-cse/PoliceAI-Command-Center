// C:\PoliceAI-Command-Center\server\src\models\Prediction.js
const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },

  day: {
    type: String,
  },

  crime_type: {
    type: String,
  },

  risk_level: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
  },

  risk_score: {
    type: Number,
  },

  status: {
    type: String,
    default: "ACTIVE",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prediction", predictionSchema);
