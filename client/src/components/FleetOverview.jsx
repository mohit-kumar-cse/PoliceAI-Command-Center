// C:\PoliceAI-Command-Center\client\src\components\FleetOverview.jsx
import {
  Car,
  CheckCircle2,
  AlertTriangle,
  Wrench,
} from "lucide-react";

const FleetOverview = ({ vehicles = [] }) => {
  const total = vehicles.length;

  const available = vehicles.filter(
    (v) => v.status === "available"
  ).length;

  const busy = vehicles.filter(
    (v) => v.status === "busy"
  ).length;

  const maintenance = vehicles.filter(
    (v) => v.status === "maintenance"
  ).length;

  const offline = vehicles.filter(
    (v) => v.status === "offline"
  ).length;

  const cards = [
    {
      title: "Total Fleet",
      value: total,
      icon: Car,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Available",
      value: available,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Busy",
      value: busy,
      icon: AlertTriangle,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Maintenance",
      value: maintenance + offline,
      icon: Wrench,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500 transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`p-3 rounded-xl ${item.bg}`}
              >
                <Icon
                  size={28}
                  className={item.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FleetOverview;