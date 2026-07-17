// C:\PoliceAI-Command-Center\client\src\components\InvestigationForm.jsx
import { PlusCircle } from "lucide-react";

const InvestigationForm = ({
  title,
  setTitle,
  description,
  setDescription,
  submitting,
  handleCreate,
}) => {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <PlusCircle
          size={24}
          className="text-blue-400"
        />

        <h2 className="text-xl font-bold text-white">
          Open New Investigation
        </h2>
      </div>

      <form
        onSubmit={handleCreate}
        className="space-y-5"
      >
        <div>
          <label className="text-sm text-slate-400">
            Case Title
          </label>

          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter case title..."
            className="
              w-full
              mt-2
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-blue-500
            "
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Investigation details..."
            className="
              w-full
              mt-2
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-blue-500
            "
          />
        </div>

        <button
          disabled={submitting}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-500
            transition
            rounded-xl
            py-3
            font-semibold
            disabled:opacity-60
          "
        >
          {submitting
            ? "Creating Investigation..."
            : "Create Investigation"}
        </button>
      </form>
    </div>
  );
};

export default InvestigationForm;