
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ECGMonitor() {
  const navigate = useNavigate();

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
          localStorage.getItem("ecgMonitorTroubleshooting") ===
          "completed",

        assessment:
          localStorage.getItem("ecgMonitorAssessment") ===
          "completed",
      });
    };

    loadProgress();

    window.addEventListener("storage", loadProgress);
    window.addEventListener("focus", loadProgress);
    window.addEventListener("pageshow", loadProgress);

    return () => {
      window.removeEventListener("storage", loadProgress);
      window.removeEventListener("focus", loadProgress);
      window.removeEventListener("pageshow", loadProgress);
    };
  }, []);

  // Module unlock system
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
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      {/* Header */}
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

      {/* Training Modules */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <ModuleCard
          title="Learn"
          icon="📚"
          description="Learn the purpose, working principle, components, operation, and safety precautions of an ECG Monitor."
          unlocked={true}
          completed={progress.learn}
          onOpen={() => navigate("/ecg-monitor/learn")}
          allowReopen={true}
        />

        <ModuleCard
          title="Practice"
          icon="🖱️"
          description="Practice ECG electrode and lead placement using an interactive activity."
          unlocked={practiceUnlocked}
          completed={progress.practice}
          onOpen={() => navigate("/ecg-monitor/practice")}
          allowReopen={true}
        />

        <ModuleCard
          title="Internal Assembly"
          icon="🔧"
          description="Understand the internal signal-processing components and their connection sequence."
          unlocked={internalUnlocked}
          completed={progress.internal}
          onOpen={() => navigate("/ecg-monitor/internal")}
          allowReopen={true}
        />

        <ModuleCard
          title="Troubleshooting"
          icon="🛠️"
          description="Identify simulated ECG faults and select the correct component for repair."
          unlocked={troubleshootingUnlocked}
          completed={progress.troubleshooting}
          onOpen={() => navigate("/ecg-monitor/troubleshooting")}
          allowReopen={true}
        />

        <ModuleCard
          title="Assessment"
          icon="📝"
          description="Test your ECG Monitor knowledge with the interactive Sun, Cloud, Moon, and Stars assessment."
          unlocked={assessmentUnlocked}
          completed={progress.assessment}
          onOpen={() => navigate("/ecg-monitor/assessment")}
          allowReopen={true}
        />
      </div>
    </div>
  );
}

function ModuleCard({
  title,
  icon,
  description,
  unlocked,
  completed,
  onOpen,
  allowReopen = false,
}) {
  const reopenLabel = {
    Learn: "📚 Learn Again",
    Practice: "🔄 Practice Again",
    "Internal Assembly": "🔄 Assembly Again",
    Troubleshooting: "🔄 Troubleshooting Again",
    Assessment: "🔄 Assessment Again",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-7 flex flex-col justify-between">
      <div>
        <div className="text-5xl mb-4">{icon}</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6">
        {completed && allowReopen ? (
          <div>
            <div className="bg-green-100 text-green-700 font-bold text-center py-3 rounded-lg mb-3">
              ✓ Completed
            </div>

            <button
              type="button"
              onClick={onOpen}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-bold transition"
            >
              {reopenLabel[title] || `🔄 ${title} Again`}
            </button>
          </div>
        ) : completed ? (
          <div className="bg-green-100 text-green-700 font-bold text-center py-3 rounded-lg">
            ✓ Completed
          </div>
        ) : unlocked ? (
          <button
            type="button"
            onClick={onOpen}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-bold transition"
          >
            Start {title}
          </button>
        ) : (
          <div className="bg-gray-200 text-gray-500 font-bold text-center py-3 rounded-lg">
            🔒 Locked
          </div>
        )}
      </div>
    </div>
  );
}

export default ECGMonitor;
