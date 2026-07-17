// C:\PoliceAI-Command-Center\client\src\utils\constants.js
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const RISK_COLORS = {
  LOW: "#22c55e",
  MEDIUM: "#f59e0b",
  HIGH: "#ef4444",
};

export const SEVERITY_COLORS = {
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#f97316",
  critical: "#ef4444",
};

export const VEHICLE_STATUS_COLORS = {
  available: "#22c55e",
  busy: "#f59e0b",
  offline: "#6b7280",
};

// Must exactly match the labels your AI model's encoders were trained on
export const AREAS = [
  "AirportRoad", "IndustrialZone", "MarketArea",
  "RailwayStation", "Residential", "Sector15", "Sector20",
];

export const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

export const CRIME_TYPES = [
  "Assault", "Burglary", "Robbery", "Suspicious", "Theft", "Vehicle Theft",
];

export const WEATHER_OPTIONS = ["Clear", "Fog", "Rain"];