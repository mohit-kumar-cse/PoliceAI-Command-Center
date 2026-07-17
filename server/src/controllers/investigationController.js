// C:\PoliceAI-Command-Center\server\src\controllers\investigationController.js
const Case = require("../models/Case");

exports.createCase = async (req, res) => {
  try {
    const caseNumber =
      req.body.caseNumber ||
      `CASE-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 100)}`;

    const newCase = await Case.create({ ...req.body, caseNumber });
    res.status(201).json({ success: true, case: newCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: cases.length, cases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const foundCase = await Case.findById(req.params.id);
    if (!foundCase) return res.status(404).json({ success: false, message: "Case not found" });
    res.status(200).json({ success: true, case: foundCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!updatedCase) return res.status(404).json({ success: false, message: "Case not found" });
    res.status(200).json({ success: true, case: updatedCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addEvidence = async (req, res) => {
  try {
    const { evidence } = req.body;
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { $push: { evidence } },
      { new: true }
    );
    if (!updatedCase) return res.status(404).json({ success: false, message: "Case not found" });
    res.status(200).json({ success: true, case: updatedCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) return res.status(404).json({ success: false, message: "Case not found" });
    res.status(200).json({ success: true, message: "Case deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};