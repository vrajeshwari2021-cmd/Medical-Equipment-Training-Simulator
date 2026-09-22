import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function PatientMonitor() {
  const [progress, setProgress] = useState({
    learn: false,
    practice: false,
    internal: false,
    troubleshooting: false,
    assessment: false,
  });

  useEffect(() => {
    const loadProgress = () => {
      setProgress({
        learn: localStorage.getItem("patientMonitorLearn") === "completed",
        practice: localStorage.getItem("patientMonitorPractice") === "completed",
        internal: localStorage.getItem("patientMonitorInternal") === "completed",
        troubleshooting:
          localStorage.getItem("patientMonitorTroubleshooting") === "completed",
        assessment:
          localStorage.getItem("patientMonitorAssessment") === "completed",
      });
    };

    loadProgress();

    window.addEventListener("storage", loadProgress);

    return () => {
      window.removeEventListener("storage", loadProgress);
    };
  }, []);

  const practiceUnlocked = progress.learn;

  const internalUnlocked =
    progress.learn && progress.practice;

  const troubleshootingUnlocked =
    progress.learn &&
    progress.practice &&
    progress.internal;

  const assessmentUnlocked =
    progress.learn &&
    progress.practice &&
    progress.internal &&
    progress.troubleshooting;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/equipment"
          className="text-blue-700 font-bold hover:underline"
        >
          ← Back to Equipment
        </Link>

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6 text-center">
          <div className="text-6xl mb-4">🖥️</div>

          <h1 className="text-4xl font-bold text-blue-700">
            Patient Monitor Training
          </h1>

          <p className="text-gray-600 text-lg mt-3">
            Complete each training module to unlock the next activity.
          </p>
        </div>

        {/* MODULES */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Patient Monitor Learning Modes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* ================= LEARN ================= */}
            <Link
              to="/patient-monitor/learn"
              className="bg-white rounded-2xl shadow-lg p-7
              hover:shadow-2xl transition-all border-2 border-transparent
              hover:border-blue-500"
            >
              <div className="flex justify-between">
                <div className="text-5xl">📖</div>

                {progress.learn && (
                  <span className="bg-green-100 text-green-700
                  px-3 py-1 rounded-full text-sm font-bold">
                    ✓ Completed
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-blue-700 mt-5">
                Learn
              </h3>

              <p className="text-gray-600 mt-3">
                Learn about the patient monitor, its components,
                functions and basic working principle.
              </p>

              <div className="mt-5">
                <span className="inline-block bg-blue-600 text-white
                px-5 py-2 rounded-lg font-bold">
                  {progress.learn
                    ? "✓ Learning Completed"
                    : "Start Learning →"}
                </span>
              </div>
            </Link>

            {/* ================= PRACTICE ================= */}
            {practiceUnlocked ? (
              <Link
                to="/patient-monitor/practice"
                className="bg-white rounded-2xl shadow-lg p-7
                hover:shadow-2xl transition-all border-2
                border-transparent hover:border-green-500"
              >
                <div className="flex justify-between">
                  <div className="text-5xl">🧪</div>

                  {progress.practice && (
                    <span className="bg-green-100 text-green-700
                    px-3 py-1 rounded-full text-sm font-bold">
                      ✓ Completed
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-green-700 mt-5">
                  Practice
                </h3>

                <p className="text-gray-600 mt-3">
                  Practice placing ECG leads, SpO₂ probe,
                  BP cuff and temperature probe.
                </p>

                <div className="mt-5">
                  <span className="inline-block bg-green-600
                  text-white px-5 py-2 rounded-lg font-bold">
                    {progress.practice
                      ? "✓ Practice Completed"
                      : "Start Practice →"}
                  </span>
                </div>
              </Link>
            ) : (
              <LockedCard
                icon="🔒"
                title="Practice"
                text="Complete the Learn module to unlock the practical training activity."
                button="🔒 Complete Learn First"
              />
            )}

            {/* ================= INTERNAL ================= */}
            {internalUnlocked ? (
              <Link
                to="/patient-monitor/internal"
                className="bg-white rounded-2xl shadow-lg p-7
                hover:shadow-2xl transition-all border-2
                border-transparent hover:border-purple-500"
              >
                <div className="flex justify-between">
                  <div className="text-5xl">🔧</div>

                  {progress.internal && (
                    <span className="bg-green-100 text-green-700
                    px-3 py-1 rounded-full text-sm font-bold">
                      ✓ Completed
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-purple-700 mt-5">
                  Internal Assembly
                </h3>

                <p className="text-gray-600 mt-3">
                  Connect internal ECG components in the correct
                  signal-processing sequence.
                </p>

                <div className="mt-5">
                  <span className="inline-block bg-purple-600
                  text-white px-5 py-2 rounded-lg font-bold">
                    {progress.internal
                      ? "✓ Assembly Completed"
                      : "Start Assembly →"}
                  </span>
                </div>
              </Link>
            ) : (
              <LockedCard
                icon="🔒"
                title="Internal Assembly"
                text="Complete the Practice module to unlock internal component assembly."
                button="🔒 Complete Practice First"
              />
            )}

            {/* ================= TROUBLESHOOTING ================= */}
            {troubleshootingUnlocked ? (
              <Link
                to="/patient-monitor/troubleshooting"
                className="bg-white rounded-2xl shadow-lg p-7
                hover:shadow-2xl transition-all border-2
                border-transparent hover:border-red-500"
              >
                <div className="flex justify-between">
                  <div className="text-5xl">🛠️</div>

                  {progress.troubleshooting && (
                    <span className="bg-green-100 text-green-700
                    px-3 py-1 rounded-full text-sm font-bold">
                      ✓ Completed
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-red-700 mt-5">
                  Troubleshooting
                </h3>

                <p className="text-gray-600 mt-3">
                  Identify common patient monitor faults and
                  perform troubleshooting activities.
                </p>

                <div className="mt-5">
                  <span className="inline-block bg-red-600
                  text-white px-5 py-2 rounded-lg font-bold">
                    {progress.troubleshooting
                      ? "✓ Troubleshooting Completed"
                      : "Start Troubleshooting →"}
                  </span>
                </div>
              </Link>
            ) : (
              <LockedCard
                icon="🔒"
                title="Troubleshooting"
                text="Complete Internal Assembly to unlock troubleshooting practice."
                button="🔒 Complete Assembly First"
              />
            )}

            {/* ================= ASSESSMENT ================= */}
            {assessmentUnlocked ? (
              <Link
                to="/patient-monitor/assessment"
                className="bg-white rounded-2xl shadow-lg p-7
                hover:shadow-2xl transition-all border-2
                border-transparent hover:border-orange-500"
              >
                <div className="flex justify-between">
                  <div className="text-5xl">📝</div>

                  {progress.assessment && (
                    <span className="bg-green-100 text-green-700
                    px-3 py-1 rounded-full text-sm font-bold">
                      ✓ Completed
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-orange-600 mt-5">
                  Assessment
                </h3>

                <p className="text-gray-600 mt-3">
                  Test your knowledge through multiple-choice questions
                  and view your final score.
                </p>

                <div className="mt-5">
                  <span className="inline-block bg-orange-500
                  text-white px-5 py-2 rounded-lg font-bold">
                    {progress.assessment
                      ? "✓ Assessment Completed"
                      : "Start Assessment →"}
                  </span>
                </div>
              </Link>
            ) : (
              <LockedCard
                icon="🔒"
                title="Assessment"
                text="Complete all previous training modules to unlock the final assessment."
                button="🔒 Complete Previous Steps"
              />
            )}

          </div>
        </div>

        {/* SEQUENCE */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Recommended Learning Sequence
          </h2>

          <p className="text-gray-600 mt-2">
            Complete each module in order to progress through
            the Patient Monitor training.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-7">

            <Step number="1" name="Learn" completed={progress.learn} />

            <span className="text-2xl text-gray-400">→</span>

            <Step
              number="2"
              name="Practice"
              completed={progress.practice}
              unlocked={practiceUnlocked}
            />

            <span className="text-2xl text-gray-400">→</span>

            <Step
              number="3"
              name="Assembly"
              completed={progress.internal}
              unlocked={internalUnlocked}
            />

            <span className="text-2xl text-gray-400">→</span>

            <Step
              number="4"
              name="Troubleshooting"
              completed={progress.troubleshooting}
              unlocked={troubleshootingUnlocked}
            />

            <span className="text-2xl text-gray-400">→</span>

            <Step
              number="5"
              name="Assessment"
              completed={progress.assessment}
              unlocked={assessmentUnlocked}
            />

          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= LOCKED CARD ================= */

function LockedCard({ icon, title, text, button }) {
  return (
    <div className="bg-gray-200 rounded-2xl shadow
    p-7 border-2 border-gray-300 opacity-70">

      <div className="text-5xl">{icon}</div>

      <h3 className="text-2xl font-bold text-gray-500 mt-5">
        {title}
      </h3>

      <p className="text-gray-500 mt-3">
        {text}
      </p>

      <div className="mt-5">
        <span className="inline-block bg-gray-400 text-white
        px-5 py-2 rounded-lg font-bold">
          {button}
        </span>
      </div>
    </div>
  );
}

/* ================= STEP ================= */

function Step({ number, name, completed, unlocked = false }) {
  return (
    <span
      className={`px-5 py-3 rounded-xl font-bold ${
        completed
          ? "bg-green-100 text-green-700"
          : unlocked
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-200 text-gray-500"
      }`}
    >
      {completed ? "✓" : unlocked ? "🔓" : "🔒"} {number}. {name}
    </span>
  );
}

export default PatientMonitor;