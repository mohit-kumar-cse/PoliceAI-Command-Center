// C:\PoliceAI-Command-Center\server\src\routes\cctvRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createCamera, getCameras, updateCameraStatus, deleteCamera,
} = require("../controllers/cctvController");

router.post("/", protect, createCamera);
router.get("/", protect, getCameras);
router.put("/:id/status", protect, updateCameraStatus);
router.delete("/:id", protect, deleteCamera);

module.exports = router;