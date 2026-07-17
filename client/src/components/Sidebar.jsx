// C:\PoliceAI-Command-Center\client\src\components\Sidebar.jsx
import {
  LayoutDashboard,
  Camera,
  Brain,
  Car,
  Search,
  ShieldCheck,
  Activity,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard, end: true },
    { name: "CCTV Monitoring", path: "/cctv", icon: Camera },
    { name: "Crime Prediction", path: "/crime", icon: Brain },
    { name: "Patrol Management", path: "/patrol", icon: Car },
    { name: "Investigation", path: "/investigation", icon: Search },
  ];

  return (
    <aside
      className="
      w-72
      h-screen
      sticky
      top-0
      overflow-y-auto
      bg-slate-950
      text-white
      border-r
      border-slate-800
      flex
      flex-col
      p-5
      shrink-0
      "
    >
      {/* BRAND */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 rounded-xl bg-blue-600/20">
          <ShieldCheck size={32} className="text-blue-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-wide">POLICE AI</h2>
          <p className="text-xs text-slate-400">Command Center</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="space-y-3 flex-1">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 shadow-lg shadow-blue-600/30"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={21} className="group-hover:scale-110 transition" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* SYSTEM CARD */}
      <div className="mt-auto bg-slate-900 rounded-xl p-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/20 p-2 rounded-lg">
            <Activity size={20} className="text-green-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">AI Monitoring</h3>
            <p className="text-xs text-green-400">All Systems Operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;