// C:\PoliceAI-Command-Center\server\src\controllers\vehicleController.js
const Vehicle = require("../models/Vehicle");

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ success: true, count: vehicles.length, vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true, runValidators: true }
    );
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.status(200).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { currentLocation: { latitude, longitude }, lastUpdated: Date.now() },
      { new: true }
    );
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.status(200).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.status(200).json({ success: true, message: "Vehicle deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};