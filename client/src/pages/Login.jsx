// C:\PoliceAI-Command-Center\client\src\pages\Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl text-white w-96"
      >
        <h1 className="text-2xl font-bold mb-6">Police AI Login</h1>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-3 bg-slate-800 rounded outline-none focus:ring-2 focus:ring-blue-600"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-5 bg-slate-800 rounded outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 p-3 rounded disabled:opacity-50"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;