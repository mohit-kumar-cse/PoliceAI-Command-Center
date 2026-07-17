// C:\PoliceAI-Command-Center\client\src\components\InvestigationStats.jsx
import {
  FolderOpen,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const InvestigationStats = ({ cases = [] }) => {
  const totalCases = cases.length;

  const openCases = cases.filter(
    (c) => c.status?.toLowerCase() === "open"
  ).length;

  const solvedCases = cases.filter(
    (c) => c.status?.toLowerCase() === "closed"
  ).length;

  const stats = [
    {
      title: "Total Cases",
      value: totalCases,
      icon: FolderOpen,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Open Cases",
      value: openCases,
      icon: Clock3,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Solved",
      value: solvedCases,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
              hover:border-blue-500/40
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">{item.title}</p>
                <h2 className="text-4xl font-bold text-white mt-3">
                  {item.value}
                </h2>
              </div>

              <div className={`${item.bg} p-4 rounded-xl`}>
                <Icon size={26} className={item.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvestigationStats;