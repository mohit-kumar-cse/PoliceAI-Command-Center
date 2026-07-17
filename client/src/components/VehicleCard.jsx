// C:\PoliceAI-Command-Center\client\src\components\VehicleCard.jsx
import {
  Car,
  MapPin,
  User,
  Navigation
} from "lucide-react";

const STATUS = {
  available: {
    label: "Available",
    color: "text-green-400",
    bg: "bg-green-500/10"
  },
  busy: {
    label: "On Patrol",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10"
  },
  offline: {
    label: "Offline",
    color: "text-slate-400",
    bg: "bg-slate-700"
  }
};

const VehicleCard = ({ vehicle }) => {
  if (!vehicle) return null;

  const status = STATUS[vehicle.status] || STATUS.offline;

  const hasValidLocation =
    typeof vehicle.currentLocation?.latitude === "number" &&
    typeof vehicle.currentLocation?.longitude === "number";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/40 transition">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="bg-blue-500/10 p-3 rounded-lg">
            <Car className="text-blue-400" />
          </div>

          <div>
            <h3 className="text-white font-bold text-lg">
              {vehicle.vehicleId}
            </h3>
            <p className="text-slate-400 text-sm">Police Patrol Unit</p>
          </div>
        </div>

        <span
          className={`${status.bg} ${status.color} px-3 py-1 rounded-full text-xs font-bold`}
        >
          {status.label}
        </span>
      </div>

      {/* INFORMATION */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-slate-300">
          <User size={17} />
          Driver:
          <span className="text-white">
            {vehicle.driverName || "Unassigned"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <MapPin size={17} />
          Location:
          <span className="text-white">
            {hasValidLocation
              ? `${vehicle.currentLocation.latitude.toFixed(3)}, ${vehicle.currentLocation.longitude.toFixed(3)}`
              : "Unknown"}
          </span>
        </div>
      </div>

      {/* ACTION */}
      <button className="mt-5 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white text-sm transition">
        <Navigation size={16} />
        Track Vehicle
      </button>
    </div>
  );
};

export default VehicleCard;