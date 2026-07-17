// C:\PoliceAI-Command-Center\server\src\controllers\cctvController.js
const Camera = require("../models/Camera");

exports.createCamera = async (req, res) => {
  try {
    const camera = await Camera.create(req.body);
    res.status(201).json({ success: true, camera });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCameras = async (req, res) => {
  try {
    const cameras = await Camera.find();
    res.status(200).json({ success: true, count: cameras.length, cameras });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCameraStatus = async (req, res) => {
  try {
    const { status, lastDetection } = req.body;
    const camera = await Camera.findByIdAndUpdate(
      req.params.id,
      { status, lastDetection },
      { new: true, runValidators: true }
    );
    if (!camera) return res.status(404).json({ success: false, message: "Camera not found" });
    res.status(200).json({ success: true, camera });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCamera = async (req, res) => {
  try {
    const camera = await Camera.findByIdAndDelete(req.params.id);
    if (!camera) return res.status(404).json({ success: false, message: "Camera not found" });
    res.status(200).json({ success: true, message: "Camera deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};