// C:\PoliceAI-Command-Center\server\src\controllers\crimeController.js
const Crime = require("../models/Crime");

exports.createCrime = async (req, res) => {
  try {
    const crime = await Crime.create(req.body);
    res.status(201).json({ success: true, crime });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: crimes.length, crimes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCrimeById = async (req, res) => {
  try {
    const crime = await Crime.findById(req.params.id);
    if (!crime) return res.status(404).json({ success: false, message: "Crime not found" });
    res.status(200).json({ success: true, crime });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCrime = async (req, res) => {
  try {
    const crime = await Crime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!crime) return res.status(404).json({ success: false, message: "Crime not found" });
    res.status(200).json({ success: true, crime });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCrime = async (req, res) => {
  try {
    const crime = await Crime.findByIdAndDelete(req.params.id);
    if (!crime) return res.status(404).json({ success: false, message: "Crime not found" });
    res.status(200).json({ success: true, message: "Crime deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};