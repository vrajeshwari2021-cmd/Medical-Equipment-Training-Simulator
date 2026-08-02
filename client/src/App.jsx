import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Equipment from "./pages/Equipment";
import PatientMonitor from "./pages/PatientMonitor";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/patient-monitor" element={<PatientMonitor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
