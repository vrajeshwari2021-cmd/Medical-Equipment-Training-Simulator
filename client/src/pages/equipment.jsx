import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const equipments = [
  {
    id: 1,
    name: "Patient Monitor",
    icon: "🩺",
  },
  {
    id: 2,
    name: "ECG Monitor",
    icon: "❤️",
  },
  {
    id: 3,
    name: "Ventilator",
    icon: "🫁",
  },
  {
    id: 4,
    name: "Defibrillator",
    icon: "⚡",
  },
  {
    id: 5,
    name: "Infusion Pump",
    icon: "💉",
  },
  {
    id: 6,
    name: "Syringe Pump",
    icon: "🧪",
  },
];

function Equipment() {
  // =====================================
  // PATIENT MONITOR COMPLETION STATUS
  // =====================================

  const [patientMonitorCompleted, setPatientMonitorCompleted] =
    useState(
      localStorage.getItem("patientMonitorAssessment") ===
        "completed"
    );

  // =====================================
  // CHECK COMPLETION STATUS
  // =====================================

  useEffect(() => {
    const checkCompletion = () => {
      setPatientMonitorCompleted(
        localStorage.getItem("patientMonitorAssessment") ===
          "completed"
      );
    };

    // Check when page loads
    checkCompletion();

    // Check when localStorage changes
    window.addEventListener("storage", checkCompletion);

    return () => {
      window.removeEventListener(
        "storage",
        checkCompletion
      );
    };
  }, []);

  // =====================================
  // REFRESH STATUS WHEN PAGE BECOMES ACTIVE
  // =====================================

  useEffect(() => {
    const handleFocus = () => {
      setPatientMonitorCompleted(
        localStorage.getItem("patientMonitorAssessment") ===
          "completed"
      );
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 py-16">

      {/* ================================= */}
      {/* TITLE */}
      {/* ================================= */}

      <h1 className="text-5xl font-bold text-center text-blue-700 mb-12">
        Medical Equipment
      </h1>

      {/* ================================= */}
      {/* EQUIPMENT GRID */}
      {/* ================================= */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        {equipments.map((item) => (

          <div
            key={item.id}
            className={`
              bg-white
              rounded-2xl
              shadow-lg
              p-8
              text-center
              transition
              duration-300

              ${
                item.id === 2 && patientMonitorCompleted
                  ? "hover:scale-105 cursor-pointer"
                  : item.id === 1
                  ? "hover:scale-105 cursor-pointer"
                  : ""
              }
            `}
          >

            {/* ================================= */}
            {/* ICON */}
            {/* ================================= */}

            <div className="text-6xl mb-5">
              {item.icon}
            </div>

            {/* ================================= */}
            {/* NAME */}
            {/* ================================= */}

            <h2 className="text-2xl font-semibold mb-6">
              {item.name}
            </h2>

            {/* ================================= */}
            {/* PATIENT MONITOR */}
            {/* ================================= */}

            {item.id === 1 && (

              patientMonitorCompleted ? (

                <div className="flex flex-col items-center">

                  {/* COMPLETED BADGE */}

                  <span
                    className="
                      inline-block
                      bg-green-100
                      text-green-700
                      px-5
                      py-2
                      rounded-full
                      font-bold
                      mb-4
                    "
                  >
                    ✓ Completed
                  </span>

                  {/* OPEN BUTTON */}

                  <Link to="/patient-monitor">

                    <button
                      className="
                        bg-green-600
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-green-700
                        transition
                      "
                    >
                      View Training
                    </button>

                  </Link>

                </div>

              ) : (

                <Link to="/patient-monitor">

                  <button
                    className="
                      bg-blue-600
                      text-white
                      px-5
                      py-2
                      rounded-lg
                      hover:bg-blue-700
                    "
                  >
                    Open Simulator
                  </button>

                </Link>

              )

            )}

            {/* ================================= */}
            {/* ECG MONITOR */}
            {/* ================================= */}

            {item.id === 2 && (

              patientMonitorCompleted ? (

                <Link to="/ecg-monitor">

                  <button
                    className="
                      bg-blue-600
                      text-white
                      px-5
                      py-2
                      rounded-lg
                      hover:bg-blue-700
                      transition
                    "
                  >
                    Open Simulator →
                  </button>

                </Link>

              ) : (

                <button
                  disabled
                  className="
                    bg-gray-500
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    cursor-not-allowed
                  "
                >
                  🔒 Complete Patient Monitor First
                </button>

              )

            )}

            {/* ================================= */}
            {/* OTHER EQUIPMENT */}
            {/* ================================= */}

            {item.id > 2 && (

              <button
                disabled
                className="
                  bg-gray-500
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  cursor-not-allowed
                "
              >
                Coming Soon
              </button>

            )}

          </div>

        ))}

      </div>

      {/* ================================= */}
      {/* COMPLETION MESSAGE */}
      {/* ================================= */}

      {patientMonitorCompleted && (

        <div className="max-w-6xl mx-auto mt-10 px-6">

          <div
            className="
              bg-green-50
              border-2
              border-green-400
              rounded-2xl
              p-6
              text-center
            "
          >

            <h2 className="text-2xl font-bold text-green-700">
              🎉 Patient Monitor Training Completed!
            </h2>

            <p className="text-gray-700 mt-2">
              You can now continue your training with the
              ECG Monitor.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Equipment;