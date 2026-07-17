// C:\PoliceAI-Command-Center\client\src\components\DashboardStats.jsx
import {
  ShieldAlert,
  BellRing,
  Car,
  Camera
} from "lucide-react";

const getCrimeRiskLevel = (alertCount) => {
  if (alertCount >= 5) return "HIGH";
  if (alertCount >= 2) return "MEDIUM";
  return "LOW";
};

const DashboardStats = ({ data }) => {
  const alertCount = data?.alerts?.length || 0;

  const stats = [
    {
      title: "Crime Risk",
      value: getCrimeRiskLevel(alertCount),
      icon: ShieldAlert,
      color: "text-red-400",
    },
    {
      title: "Active Alerts",
      value: alertCount,
      icon: BellRing,
      color: "text-yellow-400",
    },
    {
      title: "Patrol Units",
      value: data?.vehicles?.length || 0,
      icon: Car,
      color: "text-green-400",
    },
    {
      title: "Online Cameras",
      value:
        data?.cameras?.filter((c) => c.status === "online").length || 0,
      icon: Camera,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">{item.title}</p>
              <Icon size={24} className={item.color} />
            </div>

            <h2 className="text-3xl font-bold text-white mt-5">
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;