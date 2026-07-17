// C:\PoliceAI-Command-Center\client\src\pages\Investigation.jsx
import { useMemo, useState } from "react";
import { FileSearch } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import InvestigationStats from "../components/InvestigationStats";
import InvestigationForm from "../components/InvestigationForm";
import InvestigationFilters from "../components/InvestigationFilters";
import InvestigationList from "../components/InvestigationList";
import AIInvestigationPanel from "../components/AIInvestigationPanel";

import useFetch from "../hooks/useFetch";
import API from "../services/api";

const Investigation = () => {
  const { data, loading, error } = useFetch("/investigation");

  const [cases, setCases] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const investigations =
    cases.length > 0 ? cases : data?.cases || [];

  const filteredCases = useMemo(() => {
    return investigations.filter((item) => {
      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.caseNumber
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all"
          ? true
          : item.status?.toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [investigations, search, status]);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setSubmitting(true);

    try {
      const response = await API.post("/investigation", {
        title,
        description,
      });

      setCases([
        response.data.case,
        ...investigations,
      ]);

      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <h2 className="text-white text-xl">
          Loading Investigation Center...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <h2 className="text-red-400 text-xl">
          Unable to load investigations.
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

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Investigation Command Center
              </h1>

              <p className="text-slate-400 mt-1">
                AI Assisted Investigation & Case Management
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                bg-blue-500/10
                border
                border-blue-500/30
                px-4
                py-2
                rounded-full
              "
            >
              <FileSearch
                size={18}
                className="text-blue-400"
              />

              <span className="text-blue-400 text-sm">
                AI Investigation Engine Online
              </span>
            </div>
          </div>

          {/* Stats */}

          <InvestigationStats
            cases={investigations}
          />

          {/* Form + AI */}

          <div className="grid xl:grid-cols-3 gap-6">
            <div>
              <InvestigationForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                submitting={submitting}
                handleCreate={handleCreate}
              />
            </div>

            <div className="xl:col-span-2">
              <AIInvestigationPanel
                cases={investigations}
              />
            </div>
          </div>

          {/* Filters */}

          <InvestigationFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />

          {/* Cases */}

          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">
                Investigation Cases
              </h2>

              <span className="text-slate-400 text-sm">
                {filteredCases.length} Case
                {filteredCases.length !== 1 && "s"}
              </span>
            </div>

            <InvestigationList
              investigations={filteredCases}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Investigation;