// C:\PoliceAI-Command-Center\server\src\controllers\alertController.js
const Alert = require("../models/Alert");
const { sendAlert } = require("../services/websocketService");

exports.createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    sendAlert(alert); // pushes live to connected dashboards via socket.io
    res.status(201).json({ success: true, alert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: alerts.length, alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { status: "resolved" }, { new: true });
    if (!alert) return res.status(404).json({ success: false, message: "Alert not found" });
    res.status(200).json({ success: true, alert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) return res.status(404).json({ success: false, message: "Alert not found" });
    res.status(200).json({ success: true, message: "Alert deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};