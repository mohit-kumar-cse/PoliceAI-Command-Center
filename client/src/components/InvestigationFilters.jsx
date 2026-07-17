// C:\PoliceAI-Command-Center\client\src\components\InvestigationFilters.jsx
import { Search, Filter } from "lucide-react";

const InvestigationFilters = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-5
        flex
        flex-col
        lg:flex-row
        gap-4
        items-center
        justify-between
      "
    >
      {/* Search */}

      <div className="relative w-full lg:w-96">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          type="text"
          placeholder="Search by title or case number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            pl-11
            pr-4
            py-3
            text-white
            outline-none
            focus:border-blue-500
          "
        />
      </div>

      {/* Status */}

      <div className="flex items-center gap-3 w-full lg:w-auto">
        <Filter size={18} className="text-blue-400" />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
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
        >
          <option value="all">All Cases</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>
  );
};

export default InvestigationFilters;