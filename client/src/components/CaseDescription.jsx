// C:\PoliceAI-Command-Center\client\src\components\CaseDescription.jsx
import { FileText } from "lucide-react";

const CaseDescription = ({ description }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <FileText size={20} className="text-blue-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Case Description
          </h2>

          <p className="text-sm text-slate-400">
            Investigation summary and reported details
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
        {description ? (
          <p className="text-slate-300 leading-7 whitespace-pre-line">
            {description}
          </p>
        ) : (
          <div className="text-center py-8">
            <FileText
              size={42}
              className="mx-auto text-slate-600 mb-3"
            />

            <p className="text-slate-500">
              No description available for this case.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDescription;