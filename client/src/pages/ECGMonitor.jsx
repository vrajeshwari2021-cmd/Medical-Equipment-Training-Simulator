import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ECGMonitor() {
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
        learn:
          localStorage.getItem("ecgMonitorLearn") === "completed",

        practice:
          localStorage.getItem("ecgMonitorPractice") === "completed",

        internal:
          localStorage.getItem("ecgMonitorInternal") === "completed",

        troubleshooting:
          localStorage.getItem("ecgMonitorTroubleshooting") === "completed",

        assessment:
          localStorage.getItem("ecgMonitorAssessment") === "completed",
      });
    };

    loadProgress();

    window.addEventListener("storage", loadProgress);

    return () => {
      window.removeEventListener("storage", loadProgress);
    };
  }, []);

  // Practice unlocks after Learn
  const practiceUnlocked = progress.learn;

  // Internal Assembly unlocks after Practice
  const internalUnlocked =
    progress.learn &&
    progress.practice;

  // Troubleshooting unlocks after Internal Assembly
  const troubleshootingUnlocked =
    progress.learn &&
    progress.practice &&
    progress.internal;

  // Assessment unlocks after Troubleshooting
  const assessmentUnlocked =
    progress.learn &&
    progress.practice &&
    progress.internal &&
    progress.troubleshooting;

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-10">

        <Link
          to="/equipment"
          className="inline-block mb-6 text-blue-600 font-semibold hover:underline"
        >
          ← Back to Equipment
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-700 mb-3">
            ECG Monitor Training
          </h1>

          <p className="text-gray-600 text-lg">
            Learn, practice, understand internal components,
            troubleshoot faults, and complete the assessment.
          </p>

        </div>
      </div>


      {/* ================= TRAINING MODULES ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-7">

        {/* ================= LEARN ================= */}
        <ModuleCard
          title="Learn"
          icon="📚"
          description="Learn the purpose, working principle, components, operation, and safety precautions of an ECG Monitor."
          unlocked={true}
          completed={progress.learn}
          link="/ecg-monitor/learn"
          allowReopen={true}
        />


        {/* ================= PRACTICE ================= */}
        <ModuleCard
          title="Practice"
          icon="🖱️"
          description="Practice ECG electrode and lead placement using an interactive activity."
          unlocked={practiceUnlocked}
          completed={progress.practice}
          link="/ecg-monitor/practice"
          allowReopen={true}
        />


        {/* ================= INTERNAL ASSEMBLY ================= */}
        <ModuleCard
          title="Internal Assembly"
          icon="🔧"
          description="Understand the internal signal-processing components and their connection sequence."
          unlocked={internalUnlocked}
          completed={progress.internal}
          link="/ecg-monitor/internal"
        />


        {/* ================= TROUBLESHOOTING ================= */}
        <ModuleCard
          title="Troubleshooting"
          icon="🛠️"
          description="Identify simulated ECG faults and select the correct component for repair."
          unlocked={troubleshootingUnlocked}
          completed={progress.troubleshooting}
          link="/ecg-monitor/troubleshooting"
        />


        {/* ================= ASSESSMENT ================= */}
        <ModuleCard
          title="Assessment"
          icon="📝"
          description="Test your knowledge of ECG Monitor operation, components, and troubleshooting."
          unlocked={assessmentUnlocked}
          completed={progress.assessment}
          link="/ecg-monitor/assessment"
        />

      </div>

    </div>
  );
}


/* =====================================================
   MODULE CARD COMPONENT
===================================================== */

function ModuleCard({
  title,
  icon,
  description,
  unlocked,
  completed,
  link,
  allowReopen = false,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-7 flex flex-col justify-between">

      {/* Module Information */}
      <div>

        <div className="text-5xl mb-4">
          {icon}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>

      </div>


      {/* Module Button */}
      <div className="mt-6">

        {/* =================
            COMPLETED + REOPEN
        ================= */}
        {completed && allowReopen ? (

          <div>

            <div className="bg-green-100 text-green-700 font-bold text-center py-3 rounded-lg mb-3">
              ✓ Completed
            </div>

            <Link to={link}>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
              >
                {title === "Practice"
                  ? "🔄 Practice Again"
                  : "🔄 Learn Again"}
              </button>
            </Link>

          </div>

        ) : completed ? (

          /* =================
             NORMAL COMPLETED
          ================= */
          <div className="bg-green-100 text-green-700 font-bold text-center py-3 rounded-lg">
            ✓ Completed
          </div>

        ) : unlocked ? (

          /* =================
             UNLOCKED
          ================= */
          <Link to={link}>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
            >
              Start {title}
            </button>
          </Link>

        ) : (

          /* =================
             LOCKED
          ================= */
          <div className="bg-gray-200 text-gray-500 font-bold text-center py-3 rounded-lg">
            🔒 Locked
          </div>

        )}

      </div>

    </div>
  );
}

export default ECGMonitor;