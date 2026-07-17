// C:\PoliceAI-Command-Center\server\src\models\Case.js
const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,

    required: true,

    unique: true,
  },

  title: {
    type: String,
  },

  description: {
    type: String,
  },

  evidence: [
    {
      type: String,
    },
  ],

  status: {
    type: String,

    enum: ["open", "investigation", "closed"],

    default: "open",
  },

  createdAt: {
    type: Date,

    default: Date.now,
  },
});

module.exports = mongoose.model("Case", caseSchema);
