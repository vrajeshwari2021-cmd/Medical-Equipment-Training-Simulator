import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Equipment from "./pages/Equipment";

// Patient Monitor Pages
import PatientMonitor from "./pages/PatientMonitor";
import PatientMonitorLearn from "./pages/PatientMonitorLearn";
import PatientMonitorPractice from "./pages/PatientMonitorPractice";
import PatientMonitorInternal from "./pages/PatientMonitorInternal";
import PatientMonitorTroubleshooting from "./pages/PatientMonitorTroubleshooting";
import Assessment from "./pages/Assessment";

// ECG Monitor Pages
import ECGMonitor from "./pages/ECGMonitor";
import ECGMonitorLearn from "./pages/ECGMonitorLearn";
import ECGMonitorPractice from "./pages/ECGMonitorPractice";
import ECGMonitorInternal from "./pages/ECGMonitorInternal";
import ECGMonitorTroubleshooting from "./pages/ECGMonitorTroubleshooting";
import ECGMonitorAssessment from "./pages/ECGMonitorAssessment";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= MAIN PAGES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/equipment"
          element={<Equipment />}
        />

        {/* ================= PATIENT MONITOR ================= */}

        <Route
          path="/patient-monitor"
          element={<PatientMonitor />}
        />

        <Route
          path="/patient-monitor/learn"
          element={<PatientMonitorLearn />}
        />

        <Route
          path="/patient-monitor/practice"
          element={<PatientMonitorPractice />}
        />

        <Route
          path="/patient-monitor/internal"
          element={<PatientMonitorInternal />}
        />

        <Route
          path="/patient-monitor/troubleshooting"
          element={<PatientMonitorTroubleshooting />}
        />

        <Route
          path="/patient-monitor/assessment"
          element={<Assessment />}
        />

        <Route
          path="/assessment"
          element={<Assessment />}
        />

        {/* ================= ECG MONITOR ================= */}

        <Route
          path="/ecg-monitor"
          element={<ECGMonitor />}
        />

        <Route
          path="/ecg-monitor/learn"
          element={<ECGMonitorLearn />}
        />

        <Route
          path="/ecg-monitor/practice"
          element={<ECGMonitorPractice />}
        />

        <Route
          path="/ecg-monitor/internal"
          element={<ECGMonitorInternal />}
        />
<Route
  path="/ecg-monitor/troubleshooting"
  element={<ECGMonitorTroubleshooting />}
/>
        
        <Route
  path="/ecg-monitor/assessment"
  element={<ECGMonitorAssessment />}
/>
        

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;