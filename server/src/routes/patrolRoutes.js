// C:\PoliceAI-Command-Center\server\src\routes\patrolRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  assignPatrol, getActivePatrols, endPatrol, getAllVehiclesStatus,
} = require("../controllers/patrolController");

router.get("/", protect, getAllVehiclesStatus);
router.get("/active", protect, getActivePatrols);
router.put("/:id/assign", protect, assignPatrol);
router.put("/:id/end", protect, endPatrol);

module.exports = router;