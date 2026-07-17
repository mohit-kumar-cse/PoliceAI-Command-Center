// C:\PoliceAI-Command-Center\client\src\components\CaseHeader.jsx
import React from "react";

const CaseHeader = ({ caseData }) => {
  const getStatusStyle = () => {
    switch (caseData.status) {
      case "closed":
        return "bg-green-500/10 text-green-400";

      case "investigation":
        return "bg-yellow-500/10 text-yellow-400";

      default:
        return "bg-blue-500/10 text-blue-400";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-blue-400 text-sm font-medium">
            {caseData.caseNumber}
          </p>

          <h1 className="text-3xl font-bold text-white mt-2">
            {caseData.title}
          </h1>

          <p className="text-slate-400 mt-2">
            Created on{" "}
            {new Date(caseData.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm capitalize ${getStatusStyle()}`}
        >
          {caseData.status}
        </span>
      </div>
    </div>
  );
};

export default CaseHeader;