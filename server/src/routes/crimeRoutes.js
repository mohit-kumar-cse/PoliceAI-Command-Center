// C:\PoliceAI-Command-Center\server\src\routes\crimeRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createCrime, getCrimes, getCrimeById, updateCrime, deleteCrime,
} = require("../controllers/crimeController");

router.post("/", protect, createCrime);
router.get("/", protect, getCrimes);
router.get("/:id", protect, getCrimeById);
router.put("/:id", protect, updateCrime);
router.delete("/:id", protect, deleteCrime);

module.exports = router;