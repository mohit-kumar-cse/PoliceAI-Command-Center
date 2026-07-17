// C:\PoliceAI-Command-Center\client\src\components\InvestigationCard.jsx
import {
  Clock3,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const InvestigationCard = ({ investigation }) => {
  const navigate = useNavigate();

  const status = investigation.status?.toLowerCase();

  const statusColor =
    status === "closed"
      ? "bg-green-500/20 text-green-400"
      : "bg-yellow-500/20 text-yellow-400";

  return (
    <div
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
      <div className="flex justify-between items-start">
        <div>
          <p className="text-blue-400 text-xs">
            {investigation.caseNumber}
          </p>

          <h2 className="text-xl font-bold text-white mt-1">
            {investigation.title}
          </h2>
        </div>

        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          ${statusColor}
          `}
        >
          {status?.toUpperCase()}
        </span>
      </div>

      <p className="text-slate-400 mt-4 text-sm line-clamp-3">
        {investigation.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
        <div className="flex items-center gap-2 text-slate-300">
          <FolderOpen size={16} />
          {investigation.caseNumber}
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          {status === "closed" ? (
            <CheckCircle2 size={16} />
          ) : (
            <Clock3 size={16} />
          )}
          {status}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          ${statusColor}
          `}
        >
          {status}
        </span>

        <button
          onClick={() =>
            navigate(`/investigation/${investigation._id}`)
          }
          className="
          flex
          items-center
          gap-2
          text-blue-400
          hover:text-blue-300
          "
        >
          View Case
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default InvestigationCard;