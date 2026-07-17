// C:\PoliceAI-Command-Center\server\src\routes\aiRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { predictCrimeRisk } = require("../controllers/aiController");

router.post("/predict-crime", protect, predictCrimeRisk);

module.exports = router;