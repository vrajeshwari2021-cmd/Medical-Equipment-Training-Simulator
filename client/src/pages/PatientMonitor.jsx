import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import patientMonitor from "../assets/images/patient-monitor.png";

function PatientMonitor() {
  const [heartRate, setHeartRate] = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [bp, setBp] = useState("120/80");
  const [temp, setTemp] = useState(36.8);
  const [resp, setResp] = useState(16);

  const [running, setRunning] = useState(false);
  const [alarm, setAlarm] = useState("");
  const [condition, setCondition] = useState("Normal");

  function changeCondition(value) {
    setCondition(value);
  }

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {

      switch (condition) {

        case "Normal":
          setHeartRate(Math.floor(Math.random() * 10) + 70);
          setSpo2(Math.floor(Math.random() * 2) + 98);
          setBp("120/80");
          setTemp((36.5 + Math.random() * 0.4).toFixed(1));
          setResp(Math.floor(Math.random() * 3) + 15);
          setAlarm("");
          break;

        case "Tachycardia":
          setHeartRate(Math.floor(Math.random() * 8) + 120);
          setSpo2(98);
          setBp("140/90");
          setTemp(37.2);
          setResp(22);
          setAlarm("⚠ High Heart Rate Detected");
          break;

        case "Bradycardia":
          setHeartRate(Math.floor(Math.random() * 6) + 40);
          setSpo2(97);
          setBp("100/60");
          setTemp(36.5);
          setResp(12);
          setAlarm("⚠ Low Heart Rate Detected");
          break;

        case "Hypoxia":
          setHeartRate(Math.floor(Math.random() * 8) + 105);
          setSpo2(Math.floor(Math.random() * 3) + 86);
          setBp("118/78");
          setTemp(37.0);
          setResp(28);
          setAlarm("⚠ Low Oxygen Saturation");
          break;

        default:
          break;
      }

    }, 1000);

    return () => clearInterval(interval);

  }, [running, condition]);
   return (
    <div className="min-h-screen bg-slate-100 p-8">

      <Link
        to="/equipment"
        className="text-blue-600 font-semibold hover:underline"
      >
        ← Back to Equipment
      </Link>

      <h1 className="text-5xl font-bold text-center text-blue-700 mt-6 mb-10">
        Patient Monitor Simulator
      </h1>

      {/* Equipment Details */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">

        <div className="flex justify-center">
          <img
            src={patientMonitor}
            alt="Patient Monitor"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Philips IntelliVue MX550
          </h2>

          <p className="text-gray-700 leading-7">
            The Patient Monitor continuously measures a patient's
            Heart Rate, SpO₂, Blood Pressure, Temperature and
            Respiration Rate in real time.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Monitored Parameters
          </h3>

          <ul className="list-disc ml-6 space-y-2">
            <li>Heart Rate (HR)</li>
            <li>SpO₂</li>
            <li>Blood Pressure</li>
            <li>Temperature</li>
            <li>Respiration Rate</li>
          </ul>
        </div>

      </div>

      {/* Simulator */}
      <div className="max-w-5xl mx-auto bg-black rounded-2xl shadow-2xl p-8 mt-10">

        <h2 className="text-center text-3xl font-bold text-green-400 mb-8">
          Live Patient Monitor
        </h2>

        <div className="grid grid-cols-2 gap-6 text-3xl text-green-400">

          <div>❤️ Heart Rate</div>
          <div>{heartRate} BPM</div>

          <div>💙 SpO₂</div>
          <div>{spo2}%</div>

          <div>🩸 Blood Pressure</div>
          <div>{bp}</div>

          <div>🌡 Temperature</div>
          <div>{temp} °C</div>

          <div>🫁 Respiration</div>
          <div>{resp} bpm</div>

        </div>

        {/* Patient Condition */}
        <div className="flex justify-center mt-8">
          <select
            value={condition}
            onChange={(e) => changeCondition(e.target.value)}
            className="bg-white text-black border rounded-lg px-4 py-3"
          >
            <option value="Normal">Normal</option>
            <option value="Tachycardia">Tachycardia</option>
            <option value="Bradycardia">Bradycardia</option>
            <option value="Hypoxia">Hypoxia</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-5 mt-8">

          <button
            onClick={() => setRunning(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Start Monitoring
          </button>

          <button
            onClick={() => setRunning(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Stop Monitoring
          </button>

        </div>

        {/* Alarm */}
        {alarm && (
          <div className="mt-8 bg-red-600 text-white text-center p-4 rounded-xl text-xl font-bold">
            {alarm}
          </div>
        )}

      </div>

    </div>
  );
}

export default PatientMonitor;
  