// C:\PoliceAI-Command-Center\client\src\components\AddEvidence.jsx
import { Plus, Save } from "lucide-react";

const AddEvidence = ({
  evidence,
  setEvidence,
  addEvidence,
  loading = false,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Plus size={20} className="text-blue-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Add New Evidence
          </h2>

          <p className="text-sm text-slate-400">
            Attach observations, CCTV findings or forensic notes
          </p>
        </div>
      </div>

      <textarea
        rows={4}
        value={evidence}
        onChange={(e) => setEvidence(e.target.value)}
        placeholder="Enter evidence details..."
        className="
          w-full
          bg-slate-800
          border
          border-slate-700
          rounded-lg
          p-4
          text-white
          placeholder:text-slate-500
          resize-none
          outline-none
          focus:border-blue-500
        "
      />

      <button
        onClick={addEvidence}
        disabled={loading || !evidence.trim()}
        className="
          mt-5
          flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-slate-700
          disabled:cursor-not-allowed
          px-5
          py-3
          rounded-lg
          transition
          font-semibold
        "
      >
        <Save size={18} />

        {loading ? "Saving..." : "Save Evidence"}
      </button>
    </div>
  );
};

export default AddEvidence;