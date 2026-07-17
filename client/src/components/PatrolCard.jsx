// C:\PoliceAI-Command-Center\client\src\components\PatrolCard.jsx
import { useMemo } from "react";
import {
  Car,
  User,
  Fuel,
  BatteryFull,
  MapPinned,
  Gauge,
  Wifi,
} from "lucide-react";

const STATUS = {
  available: {
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    text: "AVAILABLE",
  },
  busy: {
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    text: "ON PATROL",
  },
  offline: {
    color: "bg-slate-600/20 text-slate-400 border-slate-600/30",
    text: "OFFLINE",
  },
};

const PatrolCard = ({ vehicle }) => {
  // Demo values until backend provides these fields.
  // useMemo keeps them stable across re-renders (tied to vehicle._id + status)
  // instead of randomizing on every render, which caused flicker.
  const { fuel, battery, speed } = useMemo(() => {
    return {
      fuel: 55 + Math.floor(Math.random() * 40),
      battery: 70 + Math.floor(Math.random() * 30),
      speed:
        vehicle?.status === "busy"
          ? 25 + Math.floor(Math.random() * 40)
          : 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle?._id, vehicle?.status]);

  if (!vehicle) return null;

  const route = vehicle.assignedRoute || "Sector Patrol";
  const status = STATUS[vehicle.status] || STATUS.offline;

  return (
    <div
      className="
      bg-slate-900
      rounded-2xl
      border
      border-slate-800
      p-5
      hover:border-blue-500/40
      hover:shadow-xl
      hover:shadow-blue-900/20
      transition-all
      duration-300
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white text-lg font-bold">
            {vehicle.vehicleId}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Police Patrol Vehicle
          </p>
        </div>

        <div
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          border
          ${status.color}
          `}
        >
          {status.text}
        </div>
      </div>

      {/* Officer */}
      <div className="flex items-center gap-3 mt-6">
        <div className="p-2 rounded-lg bg-blue-500/20">
          <User className="text-blue-400" size={18} />
        </div>

        <div>
          <p className="text-slate-400 text-xs">Assigned Officer</p>
          <p className="text-white font-medium">
            {vehicle.driverName || "Unassigned"}
          </p>
        </div>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mt-4">
        <MapPinned size={18} className="text-cyan-400" />
        <div>
          <p className="text-slate-400 text-xs">Patrol Route</p>
          <p className="text-white text-sm">{route}</p>
        </div>
      </div>

      {/* Speed */}
      <div className="flex items-center gap-3 mt-4">
        <Gauge size={18} className="text-orange-400" />
        <div>
          <p className="text-slate-400 text-xs">Current Speed</p>
          <p className="text-white">{speed} km/h</p>
        </div>
      </div>

      {/* Fuel */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-1">
          <div className="flex items-center gap-2">
            <Fuel size={15} className="text-yellow-400" />
            <span className="text-slate-300">Fuel</span>
          </div>
          <span className="text-white">{fuel}%</span>
        </div>

        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all duration-700"
            style={{ width: `${fuel}%` }}
          />
        </div>
      </div>

      {/* Battery */}
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <div className="flex items-center gap-2">
            <BatteryFull size={15} className="text-green-400" />
            <span className="text-slate-300">Battery</span>
          </div>
          <span className="text-white">{battery}%</span>
        </div>

        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full transition-all duration-700"
            style={{ width: `${battery}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-green-400" />
          <span className="text-green-400 text-sm">GPS Active</span>
        </div>

        <div className="flex items-center gap-2">
          <Car size={16} className="text-blue-400" />
          <span className="text-slate-300 text-sm">Ready</span>
        </div>
      </div>
    </div>
  );
};

export default PatrolCard;