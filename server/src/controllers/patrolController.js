// C:\PoliceAI-Command-Center\server\src\controllers\patrolController.js
const Vehicle = require("../models/Vehicle");

exports.assignPatrol = async (req, res) => {
  try {
    const { assignedRoute } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { assignedRoute, status: "busy" },
      { new: true, runValidators: true }
    );
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.status(200).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getActivePatrols = async (req, res) => {
  try {
    const patrols = await Vehicle.find({ status: "busy" });
    res.status(200).json({ success: true, count: patrols.length, patrols });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.endPatrol = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { assignedRoute: null, status: "available" },
      { new: true }
    );
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.status(200).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllVehiclesStatus = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    const available = vehicles.filter((v) => v.status === "available").length;
    const busy = vehicles.filter((v) => v.status === "busy").length;

    let recommendation = "Patrol coverage is balanced across available units.";
    if (available === 0) {
      recommendation = "No available units — consider reallocating from low-priority zones.";
    } else if (busy === 0) {
      recommendation = "All units are idle — assign patrols to high-risk predicted areas.";
    }

    res.status(200).json({ success: true, vehicles, available, busy, recommendation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};