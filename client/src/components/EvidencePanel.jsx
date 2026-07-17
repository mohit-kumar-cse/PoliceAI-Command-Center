// C:\PoliceAI-Command-Center\client\src\components\EvidencePanel.jsx
import { Video, FileText } from "lucide-react";

const EvidencePanel = ({ evidence = [] }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-red-500/10">
          <Video size={20} className="text-red-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Case Evidence
          </h2>

          <p className="text-sm text-slate-400">
            Digital and physical evidence collected
          </p>
        </div>
      </div>

      {/* Empty State */}
      {evidence.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg py-10 flex flex-col items-center">
          <FileText
            size={42}
            className="text-slate-600 mb-3"
          />

          <p className="text-slate-500 text-sm">
            No evidence has been added yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {evidence.map((item, index) => (
            <div
              key={index}
              className="
                bg-slate-800
                border
                border-slate-700
                rounded-lg
                p-4
                hover:border-blue-500/40
                transition
              "
            >
              <div className="flex items-start gap-4">
                {/* Number */}
                <div
                  className="
                    h-10
                    w-10
                    rounded-full
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-white
                    shrink-0
                  "
                >
                  {index + 1}
                </div>

                {/* Evidence */}
                <div className="flex-1">
                  <p className="text-white font-medium">
                    Evidence #{index + 1}
                  </p>

                  <p className="text-slate-300 mt-1 leading-6">
                    {item}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EvidencePanel;