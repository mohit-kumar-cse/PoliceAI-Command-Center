// C:\PoliceAI-Command-Center\client\src\components\AlertCard.jsx
import {
  AlertTriangle,
  MapPin,
  ShieldCheck,
  Radio
} from "lucide-react";

const AlertCard = ({ alert }) => {
  if (!alert) return null;

  const severity =
    alert.type?.toLowerCase().includes("weapon") ? "critical" : "high";

  const severityStyle = {
    critical: {
      bg: "bg-red-950/40",
      border: "border-red-500/40",
      text: "text-red-400",
    },
    high: {
      bg: "bg-orange-950/40",
      border: "border-orange-500/40",
      text: "text-orange-400",
    },
  };

  const style = severityStyle[severity];

  return (
    <div
      className={`
      ${style.bg}
      ${style.border}
      border
      rounded-xl
      p-5
      hover:scale-[1.02]
      transition
      duration-300
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="bg-red-500/10 p-3 rounded-lg">
            <AlertTriangle className={style.text} />
          </div>

          <div>
            <h3 className="text-white font-bold text-lg">{alert.type}</h3>
            <p className="text-slate-400 text-sm">AI Security Alert</p>
          </div>
        </div>

        <span
          className={`
          ${style.text}
          bg-black/20
          px-3
          py-1
          rounded-full
          text-xs
          uppercase
          font-bold
          `}
        >
          {severity}
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <MapPin size={16} />
          Location:
          <span className="text-white">{alert.location || "Unknown"}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <Radio size={16} />
          Source:
          <span className="text-white">{alert.source || "CCTV"}</span>
        </div>
      </div>

      {/* CONFIDENCE */}
      <div className="mt-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">AI Confidence</span>
          <span className="text-white font-bold">
            {alert.confidence || 0}%
          </span>
        </div>

        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500"
            style={{ width: `${alert.confidence || 0}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertCard;