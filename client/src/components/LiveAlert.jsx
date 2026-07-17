// C:\PoliceAI-Command-Center\client\src\components\LiveAlert.jsx

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  MapPin,
  ShieldAlert,
  Activity,
  Clock
} from "lucide-react";

import socket from "../services/socket";

const LiveAlert = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const handleAlert = (data) => {
      console.log("New Crime Alert:", data);

      setAlert({
        ...data,
        time: new Date(),
      });
    };

    socket.on("crime_alert", handleAlert);

    return () => {
      socket.off("crime_alert", handleAlert);
    };
  }, []);

  if (!alert) {
    return (
      <div
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-xl
        p-6
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
            bg-green-500/10
            p-3
            rounded-lg
            "
          >
            <Activity className="text-green-400" />
          </div>

          <div>
            <h2 className="text-white font-bold text-xl">
              Live AI Monitoring
            </h2>

            <p className="text-slate-400 text-sm">
              Waiting for security alerts...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      bg-red-950/40
      border
      border-red-500/50
      rounded-xl
      p-6
      shadow-lg
      "
    >
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className="
            bg-red-500
            p-3
            rounded-full
            animate-pulse
            "
          >
            <AlertTriangle className="text-white" />
          </div>

          <div>
            <h2
              className="
            text-xl
            font-bold
            text-red-400
            "
            >
              LIVE SECURITY ALERT
            </h2>

            <p
              className="
            text-slate-400
            text-sm
            "
            >
              AI Threat Detection System
            </p>
          </div>
        </div>

        <span
          className="
        bg-red-500/20
        text-red-400
        px-3
        py-1
        rounded-full
        text-xs
        font-bold
        "
        >
          HIGH RISK
        </span>
      </div>

      {/* DETAILS */}

      <div
        className="
      grid
      md:grid-cols-2
      gap-4
      mt-6
      "
      >
        <div
          className="
        bg-slate-900/70
        rounded-lg
        p-4
        "
        >
          <div className="flex gap-2 items-center text-slate-400">
            <MapPin size={16} />
            Location
          </div>

          <p className="text-white font-bold mt-2">
            {alert.area || "Unknown"}
          </p>
        </div>

        <div
          className="
        bg-slate-900/70
        rounded-lg
        p-4
        "
        >
          <div className="flex gap-2 items-center text-slate-400">
            <ShieldAlert size={16} />
            Crime Type
          </div>

          <p className="text-white font-bold mt-2">
            {alert.crime_type || "Unknown"}
          </p>
        </div>
      </div>

      {/* AI SCORE */}

      <div
        className="
      mt-5
      bg-slate-900/70
      rounded-lg
      p-4
      "
      >
        <div className="flex justify-between mb-2">
          <span className="text-slate-400">AI Confidence</span>

          <span className="text-red-400 font-bold">
            {alert.risk_score || 0}%
          </span>
        </div>

        <div
          className="
        h-3
        bg-slate-700
        rounded-full
        overflow-hidden
        "
        >
          <div
            className="
          h-full
          bg-red-500
          "
            style={{
              width: `${alert.risk_score || 0}%`,
            }}
          />
        </div>
      </div>

      {/* MESSAGE */}

      <div
        className="
      mt-5
      flex
      gap-3
      items-center
      text-yellow-300
      bg-yellow-500/10
      p-4
      rounded-lg
      "
      >
        <AlertTriangle size={18} />

        <p>{alert.message || "Suspicious activity detected"}</p>
      </div>

      {/* TIME */}

      <div
        className="
      mt-4
      flex
      items-center
      gap-2
      text-slate-400
      text-sm
      "
      >
        <Clock size={15} />

        {alert.time?.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default LiveAlert;