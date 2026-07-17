// C:\PoliceAI-Command-Center\client\src\pages\PatrolManagement.jsx

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import useFetch from "../hooks/useFetch";

import FleetOverview from "../components/FleetOverview";
import RecommendationCard from "../components/RecommendationCard";
import PatrolCard from "../components/PatrolCard";

const PatrolManagement = () => {
  const { data, loading, error } = useFetch("/patrol");

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-950 items-center justify-center">
        <h2 className="text-white text-xl font-semibold">
          Loading Patrol Command Center...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-slate-950 items-center justify-center">
        <h2 className="text-red-500 text-xl font-semibold">
          Unable to load patrol data
        </h2>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white">
              Patrol Command Center
            </h1>

            <p className="text-slate-400 mt-1">
              AI Assisted Fleet Monitoring & Deployment System
            </p>
          </div>

          {/* Fleet Overview */}
          <FleetOverview vehicles={data?.vehicles || []} />

          {/* AI Recommendation */}
          <RecommendationCard data={data} />

          {/* Active Patrol Vehicles */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-semibold text-white">
                Active Patrol Units
              </h2>

              <span className="text-sm text-slate-400">
                {data?.vehicles?.length || 0} Vehicles
              </span>
            </div>

            {data?.vehicles?.length > 0 ? (
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-5">
                {data.vehicles.map((vehicle) => (
                  <PatrolCard
                    key={vehicle._id}
                    vehicle={vehicle}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
                <h3 className="text-xl font-semibold text-white">
                  No Patrol Vehicles Available
                </h3>

                <p className="text-slate-400 mt-2">
                  No patrol units are currently registered in the system.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default PatrolManagement;