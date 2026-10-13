import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ========================================
// TROUBLESHOOTING CASES
// ========================================

const troubleshootingCases = [
  {
    id: 1,
    title: "ECG Signal Lost",
    complaint:
      "The patient monitor is unable to detect the patient's ECG signal.",
    alarm: "ECG SIGNAL LOST",

    tools: {
      electrodes: {
        title: "Electrode Inspection",
        content: [
          "RA Electrode: Normal",
          "LA Electrode: Poor Contact",
          "RL Electrode: Normal",
          "LL Electrode: Normal",
        ],
        result: "LA electrode has poor skin contact.",
      },

      cable: {
        title: "Cable Connection",
        content: [
          "ECG Cable: Connected",
          "Cable Continuity: Normal",
          "Connector Status: Normal",
        ],
        result: "ECG cable connection is normal.",
      },

      signal: {
        title: "Signal Quality",
        content: [
          "ECG Input Signal: Very Low",
          "Signal Level: 0.08 mV",
          "Expected Level: 0.5 – 5 mV",
        ],
        result: "Input signal is too low.",
      },

      selftest: {
        title: "System Self-Test",
        content: [
          "Amplifier: PASS",
          "Filter: PASS",
          "ADC: PASS",
          "Controller: PASS",
          "Display: PASS",
        ],
        result: "Internal ECG processing modules are normal.",
      },
    },

    diagnosis: "ELECTRODE",
    repairText:
      "Reconnect the LA electrode and ensure proper skin contact.",
    verifyText:
      "ECG signal has been restored successfully.",
  },

  {
    id: 2,
    title: "Weak ECG Signal",
    complaint:
      "The ECG waveform is visible, but its amplitude is much lower than expected.",
    alarm: "LOW ECG AMPLITUDE",

    tools: {
      electrodes: {
        title: "Electrode Inspection",
        content: [
          "RA Electrode: Normal",
          "LA Electrode: Normal",
          "RL Electrode: Normal",
          "LL Electrode: Normal",
        ],
        result: "All electrodes have good contact.",
      },

      cable: {
        title: "Cable Connection",
        content: [
          "ECG Cable: Connected",
          "Cable Continuity: Normal",
          "Connector Status: Normal",
        ],
        result: "Cable connection is normal.",
      },

      signal: {
        title: "Signal Quality",
        content: [
          "Input Signal: Normal",
          "Amplified Signal: Very Low",
          "Gain: Abnormal",
        ],
        result: "Signal amplification is insufficient.",
      },

      selftest: {
        title: "System Self-Test",
        content: [
          "Electrodes: PASS",
          "Amplifier: WARNING",
          "Filter: PASS",
          "ADC: PASS",
          "Controller: PASS",
        ],
        result: "Amplifier requires inspection.",
      },
    },

    diagnosis: "AMPLIFIER",
    repairText:
      "Check the ECG amplifier gain stage and restore proper amplification.",
    verifyText:
      "ECG waveform amplitude has returned to the expected range.",
  },

  {
    id: 3,
    title: "Noisy ECG Waveform",
    complaint:
      "The ECG waveform is visible but contains excessive noise and interference.",
    alarm: "SIGNAL QUALITY LOW",

    tools: {
      electrodes: {
        title: "Electrode Inspection",
        content: [
          "RA Electrode: Normal",
          "LA Electrode: Normal",
          "RL Electrode: Normal",
          "LL Electrode: Normal",
        ],
        result: "Electrode contact is acceptable.",
      },

      cable: {
        title: "Cable Connection",
        content: [
          "Cable Connection: Normal",
          "Connector: Normal",
          "Continuity: Normal",
        ],
        result: "Cable is functioning normally.",
      },

      signal: {
        title: "Signal Quality",
        content: [
          "Baseline Noise: HIGH",
          "50/60 Hz Interference: Detected",
          "Signal-to-Noise Ratio: LOW",
        ],
        result: "Significant noise is present in the signal.",
      },

      selftest: {
        title: "System Self-Test",
        content: [
          "Amplifier: PASS",
          "Filter: WARNING",
          "ADC: PASS",
          "Controller: PASS",
          "Display: PASS",
        ],
        result: "Signal filter performance is abnormal.",
      },
    },

    diagnosis: "FILTER",
    repairText:
      "Inspect the signal filtering stage and restore proper noise filtering.",
    verifyText:
      "ECG waveform is now clean and stable.",
  },

  {
    id: 4,
    title: "Digital ECG Signal Missing",
    complaint:
      "The analog ECG signal is present, but the monitor is unable to process it digitally.",
    alarm: "ADC CONVERSION ERROR",

    tools: {
      electrodes: {
        title: "Electrode Inspection",
        content: [
          "RA Electrode: Normal",
          "LA Electrode: Normal",
          "RL Electrode: Normal",
          "LL Electrode: Normal",
        ],
        result: "Electrode connections are normal.",
      },

      cable: {
        title: "Cable Connection",
        content: [
          "ECG Cable: Normal",
          "Connector: Normal",
          "Continuity: Normal",
        ],
        result: "Cable connection is normal.",
      },

      signal: {
        title: "Signal Quality",
        content: [
          "Analog ECG Input: Normal",
          "Filtered Signal: Normal",
          "Digital Output: NOT DETECTED",
        ],
        result: "Analog signal is present but digital conversion failed.",
      },

      selftest: {
        title: "System Self-Test",
        content: [
          "Amplifier: PASS",
          "Filter: PASS",
          "ADC: FAIL",
          "Controller: PASS",
          "Display: PASS",
        ],
        result: "ADC conversion stage has failed.",
      },
    },

    diagnosis: "ADC",
    repairText:
      "Inspect the analog-to-digital converter and restore signal conversion.",
    verifyText:
      "Analog ECG signal is now converted into a digital signal.",
  },

  {
    id: 5,
    title: "Unstable ECG Processing",
    complaint:
      "The ECG signal is available, but the processed heart-rate information is unstable.",
    alarm: "PROCESSING ERROR",

    tools: {
      electrodes: {
        title: "Electrode Inspection",
        content: [
          "RA Electrode: Normal",
          "LA Electrode: Normal",
          "RL Electrode: Normal",
          "LL Electrode: Normal",
        ],
        result: "Electrode connections are normal.",
      },

      cable: {
        title: "Cable Connection",
        content: [
          "ECG Cable: Normal",
          "Connector: Normal",
          "Continuity: Normal",
        ],
        result: "Cable connection is normal.",
      },

      signal: {
        title: "Signal Quality",
        content: [
          "Analog Signal: Normal",
          "Digital Signal: Normal",
          "Sampling: Normal",
        ],
        result: "Input signal is stable.",
      },

      selftest: {
        title: "System Self-Test",
        content: [
          "Amplifier: PASS",
          "Filter: PASS",
          "ADC: PASS",
          "Controller: FAIL",
          "Display: PASS",
        ],
        result: "Main controller processing error detected.",
      },
    },

    diagnosis: "CONTROLLER",
    repairText:
      "Inspect the main controller processing stage and restore normal operation.",
    verifyText:
      "ECG processing and heart-rate calculation are stable.",
  },

  {
    id: 6,
    title: "ECG Waveform Not Visible",
    complaint:
      "The ECG signal is being generated internally, but no waveform is visible on the monitor display.",
    alarm: "DISPLAY OUTPUT ERROR",

    tools: {
      electrodes: {
        title: "Electrode Inspection",
        content: [
          "RA Electrode: Normal",
          "LA Electrode: Normal",
          "RL Electrode: Normal",
          "LL Electrode: Normal",
        ],
        result: "Electrode connections are normal.",
      },

      cable: {
        title: "Cable Connection",
        content: [
          "ECG Cable: Normal",
          "Internal Signal Path: Normal",
          "Connector: Normal",
        ],
        result: "Signal path is connected correctly.",
      },

      signal: {
        title: "Signal Quality",
        content: [
          "Analog Signal: Normal",
          "Digital Signal: Normal",
          "Processed ECG Data: Available",
        ],
        result: "ECG data is available for display.",
      },

      selftest: {
        title: "System Self-Test",
        content: [
          "Amplifier: PASS",
          "Filter: PASS",
          "ADC: PASS",
          "Controller: PASS",
          "Display: FAIL",
        ],
        result: "Display output stage has failed.",
      },
    },

    diagnosis: "DISPLAY",
    repairText:
      "Inspect the display interface and restore ECG waveform output.",
    verifyText:
      "ECG waveform is now displayed correctly.",
  },
];

// ========================================
// MAIN COMPONENT
// ========================================

function ECGMonitorTroubleshooting() {
  const [currentCase, setCurrentCase] = useState(0);

  const [selectedTool, setSelectedTool] = useState(null);

  const [diagnosed, setDiagnosed] = useState(false);

  const [repairCompleted, setRepairCompleted] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  const [completed, setCompleted] = useState(false);

  const fault = troubleshootingCases[currentCase];

  // ========================================
  // SAVE COMPLETION
  // ========================================

  useEffect(() => {
    if (completed) {
      localStorage.setItem(
        "ecgMonitorTroubleshooting",
        "completed"
      );
    }
  }, [completed]);

  // ========================================
  // DIAGNOSTIC TOOL
  // ========================================

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setMessage("");
    setMessageType("");
  };

  // ========================================
  // DIAGNOSIS
  // ========================================

  const handleDiagnosis = (component) => {
    if (component === fault.diagnosis) {
      setDiagnosed(true);

      setMessage(
        "✓ Correct diagnosis! Fault location identified."
      );

      setMessageType("success");
    } else {
      setMessage(
        "❌ Incorrect diagnosis. Investigate the system again."
      );

      setMessageType("error");
    }
  };

  // ========================================
  // REPAIR
  // ========================================

  const handleRepair = () => {
    setRepairCompleted(true);

    setMessage(
      "🔧 Repair completed successfully. Run verification."
    );

    setMessageType("success");
  };

  // ========================================
  // VERIFY
  // ========================================

  const handleVerify = () => {
    if (!repairCompleted) {
      return;
    }

    if (currentCase < troubleshootingCases.length - 1) {
      setMessage(
        "✓ Fault resolved. Moving to the next troubleshooting case..."
      );

      setMessageType("success");

      setTimeout(() => {
        setCurrentCase((previous) => previous + 1);

        setSelectedTool(null);
        setDiagnosed(false);
        setRepairCompleted(false);
        setMessage("");
        setMessageType("");
      }, 1500);
    } else {
      setCompleted(true);
    }
  };

  // ========================================
  // RESET
  // ========================================

  const handleReset = () => {
    setCurrentCase(0);
    setSelectedTool(null);
    setDiagnosed(false);
    setRepairCompleted(false);
    setMessage("");
    setMessageType("");
    setCompleted(false);

    localStorage.removeItem(
      "ecgMonitorTroubleshooting"
    );
  };

  // ========================================
  // COMPLETION SCREEN
  // ========================================

  if (completed) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

        <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-10 text-center">

          <div className="text-7xl mb-6">
            🎉
          </div>

          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Troubleshooting Completed!
          </h1>

          <p className="text-gray-600 text-lg mb-4">
            Excellent work! You successfully diagnosed and
            resolved all simulated ECG Monitor faults.
          </p>

          <div className="bg-green-100 border-2 border-green-500 rounded-xl p-5 mb-6">
            <p className="font-bold text-green-700 text-lg">
              ✓ All 6 Faults Resolved
            </p>

            <p className="text-green-600 mt-2">
              Technician troubleshooting procedure completed successfully.
            </p>
          </div>

          {/* ONLY BACK TO DASHBOARD */}

          <Link
            to="/ecg-monitor"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            ← Back to ECG Monitor Dashboard
          </Link>

        </div>
      </div>
    );
  }

  // ========================================
  // MAIN UI
  // ========================================

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">

      {/* BACK */}

      <Link
        to="/ecg-monitor"
        className="text-blue-700 font-bold text-lg hover:underline"
      >
        ← Back to ECG Monitor Dashboard
      </Link>

      {/* HEADER */}

      <div className="max-w-7xl mx-auto mt-6">

        <div className="bg-slate-900 rounded-3xl shadow-xl p-8 text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <p className="text-blue-400 font-bold tracking-widest">
                BIOMEDICAL TECHNICIAN CONSOLE
              </p>

              <h1 className="text-4xl font-bold mt-2">
                ECG Monitor Troubleshooting
              </h1>

              <p className="text-gray-400 mt-2">
                Diagnose, repair and verify simulated equipment faults.
              </p>
            </div>

            <div className="bg-red-600 px-6 py-4 rounded-xl text-center">
              <p className="text-sm">
                SYSTEM STATUS
              </p>

              <p className="font-bold text-xl">
                ⚠️ FAULT DETECTED
              </p>
            </div>

          </div>

        </div>

        {/* PATIENT MONITOR */}

        <div className="bg-white rounded-3xl shadow-lg mt-7 p-7">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                Patient Monitor
              </h2>

              <p className="text-gray-500">
                Simulated patient monitoring environment
              </p>
            </div>

            <div className="bg-red-100 text-red-700 px-5 py-3 rounded-xl font-bold">
              🚨 {fault.alarm}
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {/* HEART RATE */}

            <div className="bg-slate-900 rounded-xl p-5 text-center">

              <p className="text-gray-400">
                HEART RATE
              </p>

              <p className="text-red-400 text-4xl font-bold mt-2">
                -- BPM
              </p>

              <p className="text-red-400 mt-2">
                Abnormal
              </p>

            </div>

            {/* ECG */}

            <div className="bg-slate-900 rounded-xl p-5">

              <p className="text-gray-400 mb-3">
                ECG WAVEFORM
              </p>

              <div className="h-20 flex items-center justify-center overflow-hidden">

                <div className="text-red-400 text-3xl tracking-widest animate-pulse">
                  ──╱╲──╱╲────╱╲──
                </div>

              </div>

              <p className="text-red-400 text-center text-sm">
                Signal abnormal
              </p>

            </div>

            {/* POWER */}

            <div className="bg-slate-900 rounded-xl p-5 text-center">

              <p className="text-gray-400">
                SYSTEM POWER
              </p>

              <p className="text-green-400 text-3xl font-bold mt-4">
                ● NORMAL
              </p>

              <p className="text-gray-400 mt-2">
                Equipment powered
              </p>

            </div>

          </div>

        </div>

        {/* FAULT DESCRIPTION */}

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mt-7">

          <p className="text-yellow-700 font-bold text-sm uppercase">
            Service Complaint
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {fault.title}
          </h2>

          <p className="text-gray-700 mt-2 text-lg">
            "{fault.complaint}"
          </p>

        </div>

        {/* PROGRESS */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-7">

          <div className="flex justify-between items-center">

            <h2 className="font-bold text-xl">
              Troubleshooting Progress
            </h2>

            <p className="font-bold text-blue-700">
              Case {currentCase + 1} / {troubleshootingCases.length}
            </p>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">

            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${((currentCase + 1) / troubleshootingCases.length) * 100}%`,
              }}
            ></div>

          </div>

        </div>

        {/* DIAGNOSTIC TOOLS */}

        <div className="bg-white rounded-3xl shadow-lg p-7 mt-7">

          <h2 className="text-3xl font-bold mb-2">
            🔍 Diagnostic Tools
          </h2>

          <p className="text-gray-600 mb-6">
            Investigate the equipment before selecting a diagnosis.
          </p>

          <div className="grid md:grid-cols-4 gap-5">

            {/* ELECTRODES */}

            <button
              onClick={() => handleToolClick("electrodes")}
              className={`p-5 rounded-2xl border-2 text-left transition ${
                selectedTool === "electrodes"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div className="text-4xl mb-3">
                🔌
              </div>

              <h3 className="font-bold">
                Inspect Electrodes
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Check patient electrode contact.
              </p>
            </button>

            {/* CABLE */}

            <button
              onClick={() => handleToolClick("cable")}
              className={`p-5 rounded-2xl border-2 text-left transition ${
                selectedTool === "cable"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div className="text-4xl mb-3">
                🔗
              </div>

              <h3 className="font-bold">
                Check Cable
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Check cable and connector.
              </p>
            </button>

            {/* SIGNAL */}

            <button
              onClick={() => handleToolClick("signal")}
              className={`p-5 rounded-2xl border-2 text-left transition ${
                selectedTool === "signal"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div className="text-4xl mb-3">
                📊
              </div>

              <h3 className="font-bold">
                Check Signal
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Analyze ECG signal quality.
              </p>
            </button>

            {/* SELF TEST */}

            <button
              onClick={() => handleToolClick("selftest")}
              className={`p-5 rounded-2xl border-2 text-left transition ${
                selectedTool === "selftest"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div className="text-4xl mb-3">
                ⚙️
              </div>

              <h3 className="font-bold">
                Run Self-Test
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Test internal system modules.
              </p>
            </button>

          </div>

        </div>

        {/* DIAGNOSTIC RESULT */}

        {selectedTool && (
          <div className="bg-slate-900 text-white rounded-3xl shadow-xl p-7 mt-7">

            <p className="text-blue-400 font-bold">
              DIAGNOSTIC RESULT
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {fault.tools[selectedTool].title}
            </h2>

            <div className="mt-5 space-y-3">

              {fault.tools[selectedTool].content.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-lg p-4"
                  >
                    {item}
                  </div>
                )
              )}

            </div>

            <div className="mt-5 bg-blue-900/40 border border-blue-500 rounded-xl p-5">

              <p className="text-blue-300 font-bold">
                Technician Observation
              </p>

              <p className="mt-2 text-gray-200">
                {fault.tools[selectedTool].result}
              </p>

            </div>

          </div>
        )}

        {/* DIAGNOSIS */}

        {selectedTool && (
          <div className="bg-white rounded-3xl shadow-lg p-7 mt-7">

            <h2 className="text-3xl font-bold">
              🧠 Diagnose the Fault
            </h2>

            <p className="text-gray-600 mt-2 mb-6">
              Based on your investigation, select the suspected fault location.
            </p>

            <div className="grid md:grid-cols-3 gap-4">

              {[
                ["ELECTRODE", "🔌 Electrodes"],
                ["AMPLIFIER", "🎚️ Amplifier"],
                ["FILTER", "🧹 Signal Filter"],
                ["ADC", "🔄 ADC"],
                ["CONTROLLER", "🧠 Main Controller"],
                ["DISPLAY", "🖥️ Display"],
              ].map(([value, label]) => (

                <button
                  key={value}
                  disabled={diagnosed}
                  onClick={() => handleDiagnosis(value)}
                  className={`p-4 rounded-xl border-2 font-bold transition ${
                    diagnosed && value === fault.diagnosis
                      ? "bg-green-100 border-green-500 text-green-700"
                      : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  {label}
                </button>

              ))}

            </div>

          </div>
        )}

        {/* MESSAGE */}

        {message && (
          <div
            className={`mt-7 p-5 rounded-2xl border-2 text-center font-bold text-lg ${
              messageType === "success"
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-red-100 border-red-500 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* REPAIR */}

        {diagnosed && !repairCompleted && (
          <div className="bg-white rounded-3xl shadow-lg p-7 mt-7">

            <h2 className="text-3xl font-bold">
              🔧 Repair Procedure
            </h2>

            <p className="text-gray-600 mt-2">
              The suspected fault has been identified.
            </p>

            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mt-5">
              <p className="font-bold text-yellow-700">
                Recommended Repair
              </p>

              <p className="text-gray-700 mt-2">
                {fault.repairText}
              </p>
            </div>

            <button
              onClick={handleRepair}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
            >
              🔧 Perform Repair
            </button>

          </div>
        )}

        {/* VERIFY */}

        {repairCompleted && (
          <div className="bg-white rounded-3xl shadow-lg p-7 mt-7">

            <h2 className="text-3xl font-bold">
              📈 Verify System
            </h2>

            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-5 mt-5">

              <p className="font-bold text-green-700">
                Repair Completed
              </p>

              <p className="text-gray-700 mt-2">
                {fault.verifyText}
              </p>

            </div>

            <div className="bg-slate-900 rounded-xl p-6 mt-5">

              <p className="text-gray-400 mb-3">
                ECG WAVEFORM — POST REPAIR
              </p>

              <div className="text-green-400 text-3xl tracking-widest text-center">
                ──╱╲──╱╲──╱╲──╱╲──
              </div>

              <p className="text-green-400 text-center mt-3 font-bold">
                ✓ SIGNAL NORMAL
              </p>

            </div>

            <button
              onClick={handleVerify}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition"
            >
              ✓ Verify & Continue
            </button>

          </div>
        )}

        {/* RESET */}

        <div className="text-center mt-8 mb-5">

          <button
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            🔄 Restart Troubleshooting
          </button>

        </div>

      </div>
    </div>
  );
}

export default ECGMonitorTroubleshooting;