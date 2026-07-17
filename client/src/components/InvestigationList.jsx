// C:\PoliceAI-Command-Center\client\src\components\InvestigationList.jsx
import InvestigationCard from "./InvestigationCard";

const InvestigationList = ({ investigations = [] }) => {
  if (investigations.length === 0) {
    return (
      <div
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-12
        text-center
        "
      >
        <h2 className="text-white text-xl font-semibold">
          No Investigation Found
        </h2>

        <p className="text-slate-400 mt-2">
          Try changing the search or filter.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      grid
      md:grid-cols-2
      xl:grid-cols-3
      gap-5
      "
    >
      {investigations.map((item) => (
        <InvestigationCard key={item._id} investigation={item} />
      ))}
    </div>
  );
};

export default InvestigationList;