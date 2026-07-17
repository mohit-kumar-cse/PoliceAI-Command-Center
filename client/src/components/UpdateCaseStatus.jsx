// C:\PoliceAI-Command-Center\client\src\components\UpdateCaseStatus.jsx
import {
  PlayCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

const UpdateCaseStatus = ({
  currentStatus,
  updating,
  updateStatus,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-green-500/10">
          <ShieldCheck
            size={20}
            className="text-green-400"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Update Case Status
          </h2>

          <p className="text-sm text-slate-400">
            Change the current investigation stage
          </p>
        </div>
      </div>

      {/* Current Status */}
      <div className="mb-6">
        <p className="text-sm text-slate-400 mb-2">
          Current Status
        </p>

        <span
          className={`
            inline-flex
            items-center
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
            capitalize

            ${
              currentStatus === "closed"
                ? "bg-green-500/10 text-green-400"

                : currentStatus === "investigation"
                ? "bg-yellow-500/10 text-yellow-400"

                : "bg-blue-500/10 text-blue-400"
            }
          `}
        >
          {currentStatus}
        </span>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button
          disabled={
            updating ||
            currentStatus === "investigation" ||
            currentStatus === "closed"
          }
          onClick={() =>
            updateStatus("investigation")
          }
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-yellow-600
            hover:bg-yellow-700
            disabled:bg-slate-700
            disabled:cursor-not-allowed
            py-3
            rounded-lg
            transition
            font-semibold
          "
        >
          {updating ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <PlayCircle size={18} />
          )}

          Start Investigation
        </button>

        <button
          disabled={
            updating ||
            currentStatus === "closed"
          }
          onClick={() =>
            updateStatus("closed")
          }
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-green-600
            hover:bg-green-700
            disabled:bg-slate-700
            disabled:cursor-not-allowed
            py-3
            rounded-lg
            transition
            font-semibold
          "
        >
          {updating ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <CheckCircle2 size={18} />
          )}

          Close Case
        </button>
      </div>

      {/* Information */}
      <div className="mt-6 border-t border-slate-800 pt-4">
        <p className="text-xs text-slate-500 leading-6">
          Updating the case status will immediately synchronize
          the investigation dashboard and make the latest status
          available to all authorized officers.
        </p>
      </div>
    </div>
  );
};

export default UpdateCaseStatus;