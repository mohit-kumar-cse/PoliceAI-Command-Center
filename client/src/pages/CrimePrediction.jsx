// C:\PoliceAI-Command-Center\client\src\pages\CrimePrediction.jsx
import { useState } from "react";
import {
  ShieldAlert, ShieldCheck, ShieldQuestion, Siren, Users, Cloud,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import {
  AREAS, DAYS, CRIME_TYPES, WEATHER_OPTIONS, RISK_COLORS,
} from "../utils/constants";
 
const getRecommendation = (riskLevel, riskScore) => {
  const lowConfidence = riskScore < 60;

  const base = {
    HIGH: {
      icon: Siren,
      title: "Immediate Patrol Deployment",
      actions: [
        "Dispatch nearest available patrol unit to the area",
        "Alert CCTV operators to prioritize this zone",
        "Notify shift supervisor of elevated risk",
      ],
    },
    MEDIUM: {
      icon: ShieldAlert,
      title: "Increase Patrol Frequency",
      actions: [
        "Add area to routine patrol rotation",
        "Monitor CCTV feed periodically",
        "Reassess if conditions change (weather, time)",
      ],
    },
    LOW: {
      icon: ShieldCheck,
      title: "Standard Monitoring",
      actions: [
        "No immediate action required",
        "Continue routine surveillance",
        "Log prediction for historical tracking",
      ],
    },
  }[riskLevel];

  if (lowConfidence) {
    return {
      ...base,
      icon: ShieldQuestion,
      note: `The model is only ${riskScore}% confident in this classification — treat this prediction as indicative rather than certain, and consider corroborating with recent field reports.`,
    };
  }

  return { ...base, note: null };
};

const CrimePrediction = () => {
  const [form, setForm] = useState({
    area: AREAS[0],
    day: DAYS[0],
    crime_type: CRIME_TYPES[0],
    weather: WEATHER_OPTIONS[0],
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await API.post("/ai/predict-crime", form);
      setResult(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.message || "Prediction failed. Is the AI engine running?");
    } finally {
      setLoading(false);
    }
  };

  const riskColor = result ? RISK_COLORS[result.risk_level] : "#94a3b8";
  const recommendation = result ? getRecommendation(result.risk_level, result.risk_score) : null;
  const RecIcon = recommendation?.icon;

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-6 max-w-6xl">
          <h1 className="text-3xl text-white font-bold mb-1">AI Crime Prediction Engine</h1>
          <p className="text-slate-400 text-sm mb-6">
            Model-based risk assessment using historical crime patterns, area demographics, and environmental context
          </p>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Input form */}
            <form
              onSubmit={handlePredict}
              className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 h-fit"
            >
              <h2 className="text-white font-semibold flex items-center gap-2 mb-2">
                <Users size={18} className="text-blue-400" /> Scenario Parameters
              </h2>

              <div>
                <label className="text-slate-400 text-sm">Area</label>
                <select name="area" value={form.area} onChange={handleChange}
                  className="w-full mt-1 p-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 outline-none">
                  {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-sm">Day</label>
                <select name="day" value={form.day} onChange={handleChange}
                  className="w-full mt-1 p-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 outline-none">
                  {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-sm">Crime Type</label>
                <select name="crime_type" value={form.crime_type} onChange={handleChange}
                  className="w-full mt-1 p-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 outline-none">
                  {CRIME_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-sm flex items-center gap-1">
                  <Cloud size={14} /> Weather
                </label>
                <select name="weather" value={form.weather} onChange={handleChange}
                  className="w-full mt-1 p-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 outline-none">
                  {WEATHER_OPTIONS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 transition-colors p-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Analyzing..." : "Predict Risk"}
              </button>

              {error && (
                <p className="text-red-400 text-sm bg-red-900/30 border border-red-800 rounded-lg p-3">
                  {error}
                </p>
              )}
            </form>

            {/* Result + recommendation */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 min-h-[220px] flex flex-col justify-center">
                {!result ? (
                  <p className="text-slate-400 text-center">
                    Submit the form to get an AI risk prediction
                  </p>
                ) : (
                  <div className="flex items-center gap-8">
                    <div className="text-center shrink-0">
                      <p className="text-slate-400 text-sm mb-1">Predicted Risk</p>
                      <p className="text-4xl font-bold" style={{ color: riskColor }}>
                        {result.risk_level}
                      </p>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Model Confidence</span>
                        <span className="text-white font-semibold">{result.risk_score}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${result.risk_score}%`, backgroundColor: riskColor }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-400">
                        <p>Hour: <span className="text-slate-200">{result.context_used?.hour}:00</span></p>
                        <p>Month: <span className="text-slate-200">{result.context_used?.month}</span></p>
                        <p>Area history: <span className="text-slate-200">{result.context_used?.previous_crimes} crimes</span></p>
                        <p>Density: <span className="text-slate-200">{result.context_used?.population_density}/km²</span></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {recommendation && (
                <div
                  className="bg-slate-900 p-6 rounded-2xl border-l-4"
                  style={{ borderLeftColor: riskColor }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${riskColor}22` }}>
                      <RecIcon size={20} style={{ color: riskColor }} />
                    </div>
                    <h3 className="text-white font-semibold">{recommendation.title}</h3>
                  </div>

                  <ul className="space-y-2 text-sm text-slate-300 mb-3">
                    {recommendation.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-500 shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>

                  {recommendation.note && (
                    <p className="text-xs text-amber-400/90 bg-amber-950/30 border border-amber-900/50 rounded-lg p-3 mt-3">
                      ⚠️ {recommendation.note}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimePrediction;