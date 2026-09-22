import { Link } from "react-router-dom";

function Dashboard() {

  // ========================================
  // CHECK TRAINING COMPLETION
  // ========================================

  const learnCompleted =
    localStorage.getItem("learnCompleted") === "true";

  const practiceCompleted =
    localStorage.getItem("patientMonitorPracticeCompleted") === "true";

  const internalCompleted =
    localStorage.getItem("patientMonitorInternalCompleted") === "true";

  const troubleshootingCompleted =
    localStorage.getItem("patientMonitorTroubleshootingCompleted") === "true";


  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HEADER ================= */}

      <header className="bg-blue-700 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Medical Equipment Training Simulator
            </h1>

            <p className="text-blue-100 mt-1">
              Biomedical Engineering Student Dashboard
            </p>

          </div>

          <Link
            to="/login"
            className="bg-white text-blue-700 px-5 py-2 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Logout
          </Link>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-6 py-10">


        {/* ================= WELCOME ================= */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to the Training Dashboard 👋
          </h2>

          <p className="text-gray-600 mt-3 text-lg">
            Learn medical equipment operation, practice component
            connections, troubleshoot faults and complete your assessment.
          </p>

        </div>


        {/* ================= PROGRESS ================= */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">


          {/* TRAINING MODULE */}

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">

            <p className="text-gray-500 font-semibold">
              Training Modules
            </p>

            <h3 className="text-3xl font-bold text-blue-700 mt-2">
              1
            </h3>

            <p className="text-gray-500 mt-1">
              Patient Monitor
            </p>

          </div>


          {/* PRACTICE STATUS */}

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">

            <p className="text-gray-500 font-semibold">
              Practice Status
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">

              {practiceCompleted ? "Completed" : "Locked"}

            </h3>

            <p className="text-gray-500 mt-1">
              Practice and Assembly
            </p>

          </div>


          {/* ASSESSMENT */}

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-purple-500">

            <p className="text-gray-500 font-semibold">
              Assessment
            </p>

            <h3 className="text-3xl font-bold text-purple-600 mt-2">

              {troubleshootingCompleted
                ? "Ready"
                : "Pending"}

            </h3>

            <p className="text-gray-500 mt-1">
              Complete the training flow
            </p>

          </div>

        </div>


        {/* ================= MODULES ================= */}

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Training Modules
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">


          {/* ======================================== */}
          {/* PATIENT MONITOR */}
          {/* ======================================== */}

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">

            <div className="bg-blue-600 p-6 text-white">

              <div className="text-5xl mb-3">
                🏥
              </div>

              <h3 className="text-2xl font-bold">
                Patient Monitor
              </h3>

              <p className="text-blue-100 mt-1">
                Medical equipment training
              </p>

            </div>


            <div className="p-6">

              <p className="text-gray-600 mb-5">
                Learn the basic operation and components of a patient
                monitoring system.
              </p>


              {/* PATIENT MONITOR ALWAYS OPEN */}

              <Link
                to="/patient-monitor"
                className="block text-center bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                {learnCompleted
                  ? "✓ Learning Completed"
                  : "Start Training"}
              </Link>

            </div>

          </div>


          {/* ======================================== */}
          {/* PRACTICE */}
          {/* ======================================== */}

          <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition ${
              !learnCompleted
                ? "opacity-60"
                : "hover:shadow-xl"
            }`}
          >

            <div className="bg-green-600 p-6 text-white">

              <div className="text-5xl mb-3">
                🧪
              </div>

              <h3 className="text-2xl font-bold">
                Equipment Practice
              </h3>

              <p className="text-green-100 mt-1">
                Hands-on virtual practice
              </p>

            </div>


            <div className="p-6">

              <p className="text-gray-600 mb-5">
                Practice placing ECG leads, SpO₂ probe, BP cuff and
                temperature probe correctly.
              </p>


              {/* PRACTICE UNLOCK */}

              {learnCompleted ? (

                <Link
                  to="/patient-monitor/practice"
                  className="block text-center bg-green-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  {practiceCompleted
                    ? "✓ Practice Completed"
                    : "Start Practice"}
                </Link>

              ) : (

                <button
                  disabled
                  className="block w-full text-center bg-gray-400 text-white px-5 py-3 rounded-lg font-bold cursor-not-allowed"
                >
                  🔒 Complete Learning First
                </button>

              )}

            </div>

          </div>


          {/* ======================================== */}
          {/* INTERNAL ASSEMBLY */}
          {/* ======================================== */}

          <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition ${
              !practiceCompleted
                ? "opacity-60"
                : "hover:shadow-xl"
            }`}
          >

            <div className="bg-purple-600 p-6 text-white">

              <div className="text-5xl mb-3">
                ⚙️
              </div>

              <h3 className="text-2xl font-bold">
                Internal Assembly
              </h3>

              <p className="text-purple-100 mt-1">
                Component connection practice
              </p>

            </div>


            <div className="p-6">

              <p className="text-gray-600 mb-5">
                Connect ECG electrodes, amplifier, filter, ADC,
                controller and display in the correct order.
              </p>


              {/* INTERNAL ASSEMBLY UNLOCK */}

              {practiceCompleted ? (

                <Link
                  to="/patient-monitor/internal"
                  className="block text-center bg-purple-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
                >
                  {internalCompleted
                    ? "✓ Assembly Completed"
                    : "Start Assembly"}
                </Link>

              ) : (

                <button
                  disabled
                  className="block w-full text-center bg-gray-400 text-white px-5 py-3 rounded-lg font-bold cursor-not-allowed"
                >
                  🔒 Complete Practice First
                </button>

              )}

            </div>

          </div>


          {/* ======================================== */}
          {/* TROUBLESHOOTING */}
          {/* ======================================== */}

          <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition ${
              !internalCompleted
                ? "opacity-60"
                : "hover:shadow-xl"
            }`}
          >

            <div className="bg-red-600 p-6 text-white">

              <div className="text-5xl mb-3">
                🔧
              </div>

              <h3 className="text-2xl font-bold">
                Troubleshooting
              </h3>

              <p className="text-red-100 mt-1">
                Fault identification and repair
              </p>

            </div>


            <div className="p-6">

              <p className="text-gray-600 mb-5">
                Identify faulty components and perform the required
                troubleshooting procedure.
              </p>


              {/* TROUBLESHOOTING UNLOCK */}

              {internalCompleted ? (

                <Link
                  to="/patient-monitor/troubleshooting"
                  className="block text-center bg-red-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-red-700 transition"
                >
                  {troubleshootingCompleted
                    ? "✓ Troubleshooting Completed"
                    : "Start Troubleshooting"}
                </Link>

              ) : (

                <button
                  disabled
                  className="block w-full text-center bg-gray-400 text-white px-5 py-3 rounded-lg font-bold cursor-not-allowed"
                >
                  🔒 Complete Assembly First
                </button>

              )}

            </div>

          </div>


          {/* ======================================== */}
          {/* ASSESSMENT */}
          {/* ======================================== */}

          <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition ${
              !troubleshootingCompleted
                ? "opacity-60"
                : "hover:shadow-xl"
            }`}
          >

            <div className="bg-orange-500 p-6 text-white">

              <div className="text-5xl mb-3">
                📝
              </div>

              <h3 className="text-2xl font-bold">
                Assessment
              </h3>

              <p className="text-orange-100 mt-1">
                Test your knowledge
              </p>

            </div>


            <div className="p-6">

              <p className="text-gray-600 mb-5">
                Answer multiple-choice questions based on the
                medical equipment training modules.
              </p>


              {/* ASSESSMENT UNLOCK */}

              {troubleshootingCompleted ? (

                <Link
                  to="/assessment"
                  className="block text-center bg-orange-500 text-white px-5 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
                >
                  Start Assessment
                </Link>

              ) : (

                <button
                  disabled
                  className="block w-full text-center bg-gray-400 text-white px-5 py-3 rounded-lg font-bold cursor-not-allowed"
                >
                  🔒 Complete Previous Steps
                </button>

              )}

            </div>

          </div>


          {/* ======================================== */}
          {/* PROJECT INFORMATION */}
          {/* ======================================== */}

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">

            <div className="bg-slate-700 p-6 text-white">

              <div className="text-5xl mb-3">
                📚
              </div>

              <h3 className="text-2xl font-bold">
                Learning Information
              </h3>

              <p className="text-slate-200 mt-1">
                Biomedical equipment knowledge
              </p>

            </div>


            <div className="p-6">

              <p className="text-gray-600 mb-5">
                Understand the function of medical equipment components
                and their role in patient monitoring.
              </p>

              <Link
                to="/patient-monitor"
                className="block text-center bg-slate-700 text-white px-5 py-3 rounded-lg font-bold hover:bg-slate-800 transition"
              >
                Learn More
              </Link>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM INFO ================= */}

        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-blue-800">
            Recommended Learning Flow
          </h2>


          <div className="flex flex-wrap items-center gap-3 mt-5 text-sm md:text-base">

            <span
              className={`px-4 py-2 rounded-lg shadow ${
                learnCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-white"
              }`}
            >
              {learnCompleted ? "✓" : "1️⃣"} Training
            </span>


            <span className="text-blue-600 font-bold">
              →
            </span>


            <span
              className={`px-4 py-2 rounded-lg shadow ${
                practiceCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-white"
              }`}
            >
              {practiceCompleted ? "✓" : "2️⃣"} Practice
            </span>


            <span className="text-blue-600 font-bold">
              →
            </span>


            <span
              className={`px-4 py-2 rounded-lg shadow ${
                internalCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-white"
              }`}
            >
              {internalCompleted ? "✓" : "3️⃣"} Assembly
            </span>


            <span className="text-blue-600 font-bold">
              →
            </span>


            <span
              className={`px-4 py-2 rounded-lg shadow ${
                troubleshootingCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-white"
              }`}
            >
              {troubleshootingCompleted ? "✓" : "4️⃣"} Troubleshooting
            </span>


            <span className="text-blue-600 font-bold">
              →
            </span>


            <span className="bg-white px-4 py-2 rounded-lg shadow">
              5️⃣ Assessment
            </span>

          </div>

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="bg-slate-800 text-white text-center py-5 mt-10">

        <p>
          Interactive Web-Based Medical Equipment Training and
          Troubleshooting Simulator
        </p>

        <p className="text-slate-400 text-sm mt-1">
          Biomedical Engineering Training Platform
        </p>

      </footer>

    </div>
  );
}

export default Dashboard;