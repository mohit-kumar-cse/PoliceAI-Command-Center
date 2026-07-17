// src/pages/Dashboard.jsx

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import DashboardStats from "../components/DashboardStats";
import CrimeChart from "../components/CrimeChart";
import MapView from "../components/MapView";
import LiveAlert from "../components/LiveAlert";
import DashboardAlertPanel from "../components/DashboardAlertPanel";
import DashboardVehiclePanel from "../components/DashboardVehiclePanel";
import AIStatusPanel from "../components/AIStatusPanel";

import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const { data, loading, error } = useFetch("/dashboard");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <h2 className="text-xl text-white animate-pulse">
          Loading AI Command Center...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <h2 className="text-xl text-red-500">
          Unable to connect to server
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
              AI Police Command Center
            </h1>

            <p className="text-slate-400 mt-1">
              Real-time monitoring and intelligent decision support
            </p>
          </div>

          {/* Stats */}
          <DashboardStats data={data} />

          {/* Map + AI */}
          <div className="grid xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <MapView locations={data?.locations} />
            </div>

            <AIStatusPanel />
          </div>

          {/* Analytics */}
          <div className="grid xl:grid-cols-2 gap-6">
            <CrimeChart data={data?.crimeGraph} />

            <LiveAlert />
          </div>

          {/* Alerts & Vehicles */}
          <div className="grid xl:grid-cols-2 gap-6">
            <DashboardAlertPanel data={data} />

            <DashboardVehiclePanel data={data} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;