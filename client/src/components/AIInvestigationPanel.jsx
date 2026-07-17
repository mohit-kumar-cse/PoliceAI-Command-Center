// C:\PoliceAI-Command-Center\client\src\components\AIInvestigationPanel.jsx
import {
  Brain,
  ShieldCheck,
  Car,
  User,
  Clock3,
} from "lucide-react";

const AIInvestigationPanel = ({ cases = [] }) => {
  const active = cases.filter((c) => c.status === "open").length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-blue-600/20">
          <Brain size={24} className="text-blue-400" />
        </div>

        <div>
          <h2 className="text-white font-bold text-lg">
            AI Investigation Insights
          </h2>
          <p className="text-slate-400 text-sm">
            Live recommendation engine
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between">
          <span className="text-slate-400">Active Cases</span>
          <span className="text-white font-semibold">{active}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex gap-2 items-center text-slate-400">
            <ShieldCheck size={16} />
            Suggested Priority
          </span>
          <span className="text-red-400 font-semibold">High</span>
        </div>

        <div className="flex justify-between">
          <span className="flex gap-2 items-center text-slate-400">
            <Car size={16} />
            Nearest Patrol
          </span>
          <span className="text-white">Police-102</span>
        </div>

        <div className="flex justify-between">
          <span className="flex gap-2 items-center text-slate-400">
            <User size={16} />
            Suggested Officer
          </span>
          <span className="text-white">Officer Sharma</span>
        </div>

        <div className="flex justify-between">
          <span className="flex gap-2 items-center text-slate-400">
            <Clock3 size={16} />
            Resolution ETA
          </span>
          <span className="text-green-400">3 Days</span>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-blue-600/10 border border-blue-500/20">
        <p className="text-sm text-blue-300">AI Confidence</p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1 bg-slate-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-[94%]" />
          </div>
          <span className="text-white font-bold">94%</span>
        </div>
      </div>
    </div>
  );
};

export default AIInvestigationPanel;