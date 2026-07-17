// C:\PoliceAI-Command-Center\server\src\services\aiService.js
const axios = require("axios");

const AI_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

const normalize = (str) => (typeof str === "string" ? str.replace(/\s+/g, "") : str);

const predictCrimeRisk = async (data) => {
  try {
    const payload = {
      ...data,
      area: normalize(data.area),
    };

    const response = await axios.post(`${AI_URL}/predict-crime-risk`, payload);
    return response.data;
  } catch (error) {
    console.log("AI Service Error:", error.message);
    throw error;
  }
};

module.exports = {
  predictCrimeRisk,
};