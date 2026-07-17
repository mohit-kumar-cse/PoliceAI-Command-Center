// C:\PoliceAI-Command-Center\client\src\components\AIStatusPanel.jsx

import {
  Brain,
  UserRound,
  Car,
  ShieldAlert,
  Database,
  Server,
  Camera,
  CheckCircle2,
} from "lucide-react";

const AIStatusPanel = () => {
  const systems = [
    {
      name: "Person Detection",
      icon: UserRound,
      status: "Active",
      value: "99.2%",
    },
    {
      name: "Vehicle Tracking",
      icon: Car,
      status: "Active",
      value: "98.5%",
    },
    {
      name: "Weapon Detection",
      icon: ShieldAlert,
      status: "Active",
      value: "97.8%",
    },
    {
      name: "AI Analysis Engine",
      icon: Brain,
      status: "Running",
      value: "Online",
    },
    {
      name: "CCTV Network",
      icon: Camera,
      status: "Connected",
      value: "16 Cameras",
    },
    {
      name: "Database",
      icon: Database,
      status: "Healthy",
      value: "MongoDB",
    },
    {
      name: "API Server",
      icon: Server,
      status: "Online",
      value: "REST API",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            AI System Health
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Real-time surveillance services
          </p>
        </div>

        <CheckCircle2
          size={28}
          className="text-green-400"
        />
      </div>

      {/* Overall Status */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">
            Overall System Health
          </span>

          <span className="text-green-400 font-semibold">
            99.8%
          </span>
        </div>

        <div className="w-full h-2 bg-slate-700 rounded-full mt-3 overflow-hidden">
          <div className="w-[99.8%] h-full bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Services */}
      <div className="space-y-4">
        {systems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="flex items-center justify-between bg-slate-800 rounded-xl p-3 hover:bg-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Icon
                    size={18}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <p className="text-white text-sm font-medium">
                    {item.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {item.value}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>

                <span className="text-green-400 text-xs font-semibold">
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIStatusPanel;