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

// ECG Main Dashboard ONLY
import ECGMonitor from "./pages/ECGMonitor";
import ECGMonitorLearn from "./pages/ECGMonitorLearn";
import ECGMonitorPractice from "./pages/ECGMonitorPractice";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/equipment" element={<Equipment />} />

        {/* Patient Monitor */}
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

        {/* ECG Monitor */}
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
        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;