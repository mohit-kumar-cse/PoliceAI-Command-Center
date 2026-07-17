// C:\PoliceAI-Command-Center\server\src\routes\alertRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createAlert, getAlerts, resolveAlert, deleteAlert,
} = require("../controllers/alertController");

router.post("/", protect, createAlert);
router.get("/", protect, getAlerts);
router.put("/:id/resolve", protect, resolveAlert);
router.delete("/:id", protect, deleteAlert);

module.exports = router;