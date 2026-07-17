// C:\PoliceAI-Command-Center\server\src\routes\investigationRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createCase, getCases, getCaseById, updateCase, addEvidence, deleteCase,
} = require("../controllers/investigationController");

router.post("/", protect, createCase);
router.get("/", protect, getCases);
router.get("/:id", protect, getCaseById);
router.put("/:id", protect, updateCase);
router.put("/:id/evidence", protect, addEvidence);
router.delete("/:id", protect, deleteCase);

module.exports = router;