// C:\PoliceAI-Command-Center\client\src\App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CCTVMonitoring from "./pages/CCTVMonitoring";
import CrimePrediction from "./pages/CrimePrediction";
import PatrolManagement from "./pages/PatrolManagement";
import Investigation from "./pages/Investigation";
import CaseDetails from "./pages/CaseDetails";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cctv"
            element={
              <ProtectedRoute>
                <CCTVMonitoring />
              </ProtectedRoute>
            }
          />

          <Route
            path="/crime"
            element={
              <ProtectedRoute>
                <CrimePrediction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patrol"
            element={
              <ProtectedRoute>
                <PatrolManagement />
              </ProtectedRoute>
            }
          />

          {/* Investigation List */}
          <Route
            path="/investigation"
            element={
              <ProtectedRoute>
                <Investigation />
              </ProtectedRoute>
            }
          />

          {/* Single Case Details */}
          <Route
            path="/investigation/:id"
            element={
              <ProtectedRoute>
                <CaseDetails />
              </ProtectedRoute>
            }
          />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;