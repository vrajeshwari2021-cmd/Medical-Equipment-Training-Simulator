import { useState } from "react";
import { Link } from "react-router-dom";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ========================================
// IMAGES
// ========================================

import patientMonitor from "../assets/images/patient-monitor.png";

import electrodes from "../assets/practice/ecg-electrodes.png";
import amplifier from "../assets/practice/ecg-amplifier.png";
import filter from "../assets/practice/signal-filter.png";
import adc from "../assets/practice/adc.png";
import controller from "../assets/practice/main-controller.png";
import display from "../assets/practice/display.png";

// ========================================
// TROUBLESHOOTING CASES
// ========================================

const faults = [
  {
    id: 1,
    symptom: "ECG waveform is not displayed.",
    description:
      "The patient monitor is switched ON, but the ECG waveform is not appearing on the display.",
    answer: "ELECTRODE",
    component: "ECG Electrodes",
    image: electrodes,
    reason:
      "The ECG electrodes may not be properly connected to the patient or monitor.",
  },

  {
    id: 2,
    symptom: "ECG signal contains excessive noise.",
    description:
      "The ECG waveform is visible, but the signal contains unwanted noise and interference.",
    answer: "FILTER",
    component: "Signal Filter",
    image: filter,
    reason:
      "The signal filter removes unwanted noise and interference from the ECG signal.",
  },

  {
    id: 3,
    symptom: "ECG signal is very weak.",
    description:
      "The ECG signal is detected, but its amplitude is too low for proper processing.",
    answer: "AMPLIFIER",
    component: "ECG Amplifier",
    image: amplifier,
    reason:
      "The amplifier increases the strength of the weak ECG signal.",
  },

  {
    id: 4,
    symptom: "Digital ECG signal is not available.",
    description:
      "The analog ECG signal is present, but the digital signal is not reaching the processing section.",
    answer: "ADC",
    component: "ADC",
    image: adc,
    reason:
      "The ADC converts the analog ECG signal into a digital signal for processing.",
  },

  {
    id: 5,
    symptom: "ECG signal is not processed.",
    description:
      "The ECG signal reaches the system, but the processed information is not generated.",
    answer: "CONTROLLER",
    component: "Main Controller",
    image: controller,
    reason:
      "The main controller processes the digital signal and controls the system operation.",
  },

  {
    id: 6,
    symptom: "Patient monitor screen is blank.",
    description:
      "The monitor is powered ON, but no information is visible on the display.",
    answer: "DISPLAY",
    component: "Display",
    image: display,
    reason:
      "A display fault can prevent patient information and waveforms from being shown.",
  },
];

// ========================================
// DRAGGABLE COMPONENT
// ========================================

function FaultComponent({ item }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "FAULT_COMPONENT",

      item: {
        type: item.type,
      },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item.type]
  );

  return (
    <div
      ref={drag}
      className={`
        bg-white
        border-2
        border-gray-300
        rounded-2xl
        p-4
        shadow-md
        cursor-grab
        hover:shadow-xl
        hover:scale-[1.02]
        transition-all
        ${isDragging ? "opacity-40 scale-95" : ""}
      `}
    >
      <div className="h-[120px] flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-[110px] max-w-[130px] object-contain pointer-events-none"
        />
      </div>

      <p className="text-center font-bold mt-3">
        {item.name}
      </p>
    </div>
  );
}

// ========================================
// DROP AREA
// ========================================

function FaultDropArea({ onDropComponent, disabled }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "FAULT_COMPONENT",

      canDrop: () => !disabled,

      drop: (item) => {
        if (!disabled) {
          onDropComponent(item.type);
        }
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [disabled]
  );

  return (
    <div
      ref={drop}
      className={`
        min-h-[180px]
        rounded-2xl
        border-4
        border-dashed
        flex
        items-center
        justify-center
        text-center
        p-6
        transition-all
        duration-200

        ${
          disabled
            ? "bg-green-50 border-green-500"
            : isOver
            ? "bg-yellow-100 border-yellow-500 scale-[1.02]"
            : "bg-slate-50 border-gray-400"
        }
      `}
    >
      {disabled ? (
        <div>
          <div className="text-green-600 text-5xl">
            ✓
          </div>

          <p className="text-green-700 font-bold text-xl mt-2">
            Fault Identified
          </p>
        </div>
      ) : (
        <div>
          <div className="text-blue-600 text-4xl">
            🔧
          </div>

          <p className="font-bold text-xl mt-2">
            Drop the suspected faulty component here
          </p>

          <p className="text-gray-500 mt-1">
            Drag a component from the left side
          </p>
        </div>
      )}
    </div>
  );
}

// ========================================
// MAIN PAGE
// ========================================

function PatientMonitorTroubleshooting() {
  const [currentFault, setCurrentFault] = useState(0);

  const [diagnosed, setDiagnosed] = useState(false);

  const [repaired, setRepaired] = useState(false);

  const [tested, setTested] = useState(false);

  const [message, setMessage] = useState("");

  const [score, setScore] = useState(0);

  const fault = faults[currentFault];

  // ========================================
  // COMPONENT LIST
  // ========================================

  const componentList = [
    {
      type: "ELECTRODE",
      name: "ECG Electrodes",
      image: electrodes,
    },

    {
      type: "AMPLIFIER",
      name: "ECG Amplifier",
      image: amplifier,
    },

    {
      type: "FILTER",
      name: "Signal Filter",
      image: filter,
    },

    {
      type: "ADC",
      name: "ADC",
      image: adc,
    },

    {
      type: "CONTROLLER",
      name: "Main Controller",
      image: controller,
    },

    {
      type: "DISPLAY",
      name: "Display",
      image: display,
    },
  ];

  // ========================================
  // DROP COMPONENT
  // ========================================

  const handleDrop = (type) => {
    if (diagnosed) {
      return;
    }

    if (type === fault.answer) {
      setDiagnosed(true);

      setScore((previous) => previous + 1);

      setMessage(
        `Correct! ${fault.component} is the suspected faulty component.`
      );
    } else {
      setMessage(
        "❌ Incorrect component. Check the symptom and try again."
      );
    }
  };

  // ========================================
  // REPAIR
  // ========================================

  const handleRepair = () => {
    if (!diagnosed) {
      return;
    }

    setRepaired(true);

    setMessage(
      `🔧 ${fault.component} has been repaired successfully.`
    );
  };

  // ========================================
  // TEST
  // ========================================

  const handleTest = () => {
    if (!repaired) {
      return;
    }

    setTested(true);

    setMessage(
      "✅ Equipment tested successfully. The fault has been cleared."
    );

    // ========================================
    // SAVE COMPLETION
    // ========================================

    // Save only after the final troubleshooting case
    if (currentFault === faults.length - 1) {
      localStorage.setItem(
        "patientMonitorTroubleshooting",
        "completed"
      );
    }
  };

  // ========================================
  // NEXT FAULT
  // ========================================

  const handleNextFault = () => {
    if (currentFault < faults.length - 1) {
      setCurrentFault((previous) => previous + 1);

      setDiagnosed(false);

      setRepaired(false);

      setTested(false);

      setMessage("");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-100 p-8">

        {/* ================================= */}
        {/* BACK */}
        {/* ================================= */}

        <Link
          to="/patient-monitor"
          className="text-blue-700 font-bold text-lg hover:underline"
        >
          ← Back to Patient Monitor Dashboard
        </Link>

        {/* ================================= */}
        {/* TITLE */}
        {/* ================================= */}

        <h1 className="text-center text-5xl font-bold text-red-600 my-8">
          Patient Monitor Troubleshooting
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Identify and repair faults in the patient monitor
        </p>

        {/* ================================= */}
        {/* PROGRESS */}
        {/* ================================= */}

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8">

          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-2xl font-bold">
                Troubleshooting Progress
              </h2>

              <p className="text-gray-600 mt-1">
                Fault {currentFault + 1} of {faults.length}
              </p>
            </div>

            <div className="text-right">

              <p className="text-xl font-bold text-blue-700">
                Score: {score} / {faults.length}
              </p>

            </div>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-5">

            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${((currentFault + 1) / faults.length) * 100}%`,
              }}
            ></div>

          </div>

        </div>

        {/* ================================= */}
        {/* MAIN AREA */}
        {/* ================================= */}

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="space-y-8">

            {/* PATIENT MONITOR */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-5">
                Patient Monitor
              </h2>

              <div className="bg-slate-900 rounded-2xl p-6 flex items-center justify-center">

                <img
                  src={patientMonitor}
                  alt="Patient Monitor"
                  className="w-full max-w-[430px] h-[300px] object-contain"
                />

              </div>

            </div>

            {/* SYMPTOM */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <div className="flex items-center gap-3 mb-4">

                <div className="text-3xl">
                  ⚠️
                </div>

                <h2 className="text-2xl font-bold text-red-600">
                  Equipment Symptom
                </h2>

              </div>

              <div className="bg-red-50 border border-red-300 rounded-xl p-5">

                <h3 className="font-bold text-xl">
                  {fault.symptom}
                </h3>

                <p className="text-gray-700 mt-3 leading-relaxed">
                  {fault.description}
                </p>

              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* ================================= */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-2">
              Identify Faulty Component
            </h2>

            <p className="text-gray-600 mb-6">
              Drag the component that you think is causing the problem.
            </p>

            {/* DROP AREA */}

            <FaultDropArea
              onDropComponent={handleDrop}
              disabled={diagnosed}
            />

            {/* MESSAGE */}

            {message && (
              <div
                className={`
                  mt-5
                  rounded-xl
                  p-4
                  border
                  ${
                    diagnosed
                      ? "bg-green-100 border-green-400 text-green-800"
                      : "bg-red-100 border-red-400 text-red-800"
                  }
                `}
              >
                <p className="font-bold">
                  {message}
                </p>
              </div>
            )}

            {/* COMPONENTS */}

            <h3 className="text-xl font-bold mt-8 mb-4">
              Available Components
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {componentList.map((item) => (
                <FaultComponent
                  key={item.type}
                  item={item}
                />
              ))}

            </div>

          </div>

        </div>

        {/* ================================= */}
        {/* REPAIR SECTION */}
        {/* ================================= */}

        {diagnosed && (
          <div className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold">
              🔧 Repair Procedure
            </h2>

            <p className="text-gray-600 mt-2">
              Faulty component identified. Perform the repair before
              testing the equipment.
            </p>

            <div className="mt-5 flex flex-wrap gap-4">

              {!repaired && (
                <button
                  onClick={handleRepair}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  🔧 Repair Component
                </button>
              )}

              {repaired && !tested && (
                <button
                  onClick={handleTest}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  🧪 Test Equipment
                </button>
              )}

            </div>

          </div>
        )}

        {/* ================================= */}
        {/* TEST RESULT */}
        {/* ================================= */}

        {tested && (
          <div className="max-w-6xl mx-auto mt-8">

            <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-6">

              <h2 className="text-3xl font-bold text-green-700">
                ✅ Fault Cleared Successfully!
              </h2>

              <p className="mt-3 text-gray-700">
                The faulty component was identified, repaired and
                the equipment was tested successfully.
              </p>

              <div className="mt-5 bg-white rounded-xl p-5">

                <p className="font-bold">
                  Faulty Component:
                </p>

                <p className="text-green-700 text-xl font-bold mt-1">
                  {fault.component}
                </p>

                <p className="mt-4 font-bold">
                  Why?
                </p>

                <p className="text-gray-700 mt-1">
                  {fault.reason}
                </p>

              </div>

              {/* ================================= */}
              {/* NEXT CASE / COMPLETION */}
              {/* ================================= */}

              {currentFault < faults.length - 1 ? (

                <button
                  onClick={handleNextFault}
                  className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-xl font-bold transition"
                >
                  Next Troubleshooting Case →
                </button>

              ) : (

                <div className="mt-6">

                  <h3 className="text-2xl font-bold text-green-700">
                    🎉 Troubleshooting Completed!
                  </h3>

                  <p className="mt-2 text-gray-700">
                    You have successfully completed all patient
                    monitor troubleshooting cases.
                  </p>

                  {/* ================================= */}
                  {/* BACK TO PATIENT MONITOR DASHBOARD */}
                  {/* ================================= */}

                  <Link
                    to="/patient-monitor"
                    className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold transition"
                  >
                    ← Back to Patient Monitor Dashboard
                  </Link>

                </div>

              )}

            </div>

          </div>
        )}

      </div>
    </DndProvider>
  );
}

export default PatientMonitorTroubleshooting;