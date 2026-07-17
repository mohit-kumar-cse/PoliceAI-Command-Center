// C:\PoliceAI-Command-Center\server\src\routes\vehicleRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createVehicle, getVehicles, updateVehicle, updateLocation, deleteVehicle,
} = require("../controllers/vehicleController");

router.post("/", protect, createVehicle);
router.get("/", protect, getVehicles);
router.put("/:id", protect, updateVehicle);
router.put("/:id/location", protect, updateLocation);
router.delete("/:id", protect, deleteVehicle);

module.exports = router;