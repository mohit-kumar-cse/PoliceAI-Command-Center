// C:\PoliceAI-Command-Center\client\src\pages\CaseDetails.jsx
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import CaseHeader from "../components/CaseHeader";
import CaseDescription from "../components/CaseDescription";
import EvidencePanel from "../components/EvidencePanel";
import AddEvidence from "../components/AddEvidence";
import InvestigationTimeline from "../components/InvestigationTimeline";
import UpdateCaseStatus from "../components/UpdateCaseStatus";

import API from "../services/api";

const CaseDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [evidence, setEvidence] = useState("");

  const [updating, setUpdating] = useState(false);

  const fetchCase = async () => {
    try {
      setLoading(true);

      const response = await API.get(`/investigation/${id}`);

      setCaseData(response.data.case);
    } catch (error) {
      console.log(error);
      setCaseData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      setUpdating(true);

      const response = await API.put(
        `/investigation/${id}`,
        {
          status,
        }
      );

      setCaseData(response.data.case);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const addEvidence = async () => {
    if (!evidence.trim()) return;

    try {
      const response = await API.put(
        `/investigation/${id}/evidence`,
        {
          evidence,
        }
      );

      setCaseData(response.data.case);

      setEvidence("");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-950 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto">
          <Navbar />

          <div className="flex items-center justify-center h-[80vh]">
            <p className="text-white text-lg font-semibold">
              Loading Case Details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex h-screen bg-slate-950 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto">
          <Navbar />

          <div className="flex items-center justify-center h-[80vh]">
            <p className="text-red-400 text-lg font-semibold">
              Case not found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* Back Button */}

          <button
            onClick={() => navigate("/investigation")}
            className="
              flex
              items-center
              gap-2
              text-slate-400
              hover:text-white
              transition
            "
          >
            <ArrowLeft size={18} />

            Back to Investigation
          </button>

          {/* Header */}

          <CaseHeader caseData={caseData} />

          {/* Main Content */}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Side */}

            <div className="lg:col-span-2 space-y-6">
              <CaseDescription
                description={caseData.description}
              />

              <EvidencePanel
                evidence={caseData.evidence}
              />

              <AddEvidence
                evidence={evidence}
                setEvidence={setEvidence}
                addEvidence={addEvidence}
              />
            </div>

            {/* Right Side */}

            <div className="space-y-6">
              <InvestigationTimeline
                caseData={caseData}
              />

              <UpdateCaseStatus
                currentStatus={caseData.status}
                updating={updating}
                updateStatus={updateStatus}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CaseDetails;