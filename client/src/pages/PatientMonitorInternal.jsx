import { useState } from "react";
import { Link } from "react-router-dom";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ========================================
// ECG COMPONENT IMAGES
// ========================================

import electrodes from "../assets/practice/ecg-electrodes.png";
import amplifier from "../assets/practice/ecg-amplifier.png";
import filter from "../assets/practice/signal-filter.png";
import adc from "../assets/practice/adc.png";
import controller from "../assets/practice/main-controller.png";
import display from "../assets/practice/display.png";

// ========================================
// COMPONENT DATA
// ========================================

const components = [
  {
    name: "ECG Electrodes",
    type: "ELECTRODE",
    image: electrodes,
  },
  {
    name: "ECG Amplifier",
    type: "AMPLIFIER",
    image: amplifier,
  },
  {
    name: "Signal Filter",
    type: "FILTER",
    image: filter,
  },
  {
    name: "ADC",
    type: "ADC",
    image: adc,
  },
  {
    name: "Main Controller",
    type: "CONTROLLER",
    image: controller,
  },
  {
    name: "Display",
    type: "DISPLAY",
    image: display,
  },
];

// ========================================
// DRAGGABLE COMPONENT CARD
// ========================================

function ComponentCard({ component, unlocked }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ECG_COMPONENT",

      item: {
        type: component.type,
      },

      canDrag: unlocked,

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [unlocked, component.type]
  );

  return (
    <div
      ref={drag}
      className={`
        w-full
        h-[150px]
        rounded-2xl
        border-2
        shadow-md
        flex
        items-center
        justify-center
        transition-all
        duration-200
        ${
          unlocked
            ? "bg-white border-gray-300 cursor-grab hover:shadow-xl hover:scale-[1.02]"
            : "bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed"
        }
        ${isDragging ? "opacity-40 scale-95" : ""}
      `}
    >
      <img
        src={component.image}
        alt={component.name}
        className="w-[120px] h-[120px] object-contain pointer-events-none"
      />
    </div>
  );
}

// ========================================
// DROP SLOT
// ========================================

function ConnectionSlot({
  expectedType,
  label,
  connected,
  unlocked,
  connectedImage,
  onCorrect,
}) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "ECG_COMPONENT",

      canDrop: () => unlocked && !connected,

      drop: (item) => {
        if (!unlocked || connected) {
          return;
        }

        if (item.type === expectedType) {
          onCorrect(expectedType);
        } else {
          alert(
            "❌ Wrong Component! Please follow the correct sequence."
          );
        }
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [expectedType, unlocked, connected]
  );

  return (
    <div
      ref={drop}
      className={`
        min-h-[130px]
        rounded-2xl
        border-4
        border-dashed
        flex
        items-center
        gap-6
        p-5
        transition-all
        duration-200

        ${
          connected
            ? "bg-green-50 border-green-500"
            : !unlocked
            ? "bg-gray-100 border-gray-300 opacity-70"
            : isOver
            ? "bg-yellow-100 border-yellow-500 scale-[1.02]"
            : "bg-white border-gray-400"
        }
      `}
    >
      {/* IMAGE */}

      {connected && connectedImage && (
        <div className="w-[90px] h-[90px] flex-shrink-0 bg-white rounded-xl border border-green-300 flex items-center justify-center">
          <img
            src={connectedImage}
            alt={label}
            className="w-[75px] h-[75px] object-contain"
          />
        </div>
      )}

      {/* TEXT */}

      <div className="flex-1">
        {connected ? (
          <>
            <p className="font-bold text-xl text-green-700">
              ✓ {label}
            </p>

            <p className="text-green-600 mt-1">
              Component connected correctly
            </p>
          </>
        ) : !unlocked ? (
          <>
            <p className="font-bold text-xl text-gray-500">
              🔒 {label}
            </p>

            <p className="text-gray-500 mt-1">
              Complete the previous connection
            </p>
          </>
        ) : (
          <>
            <p className="font-bold text-xl text-gray-800">
              {label}
            </p>

            <p className="text-blue-600 mt-1">
              Drop the correct component here
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ========================================
// MAIN PAGE
// ========================================

function PatientMonitorInternal() {
  const [connected, setConnected] = useState({
    ELECTRODE: false,
    AMPLIFIER: false,
    FILTER: false,
    ADC: false,
    CONTROLLER: false,
    DISPLAY: false,
  });

  // ========================================
  // CORRECT CONNECTION
  // ========================================

  const handleCorrectConnection = (type) => {
    setConnected((previous) => ({
      ...previous,
      [type]: true,
    }));
  };

  // ========================================
  // SCORE
  // ========================================

  const score =
    Number(connected.ELECTRODE) +
    Number(connected.AMPLIFIER) +
    Number(connected.FILTER) +
    Number(connected.ADC) +
    Number(connected.CONTROLLER) +
    Number(connected.DISPLAY);

  // ========================================
  // COMPONENT UNLOCK
  // ========================================

  const isUnlocked = (type) => {
    switch (type) {
      case "ELECTRODE":
        return true;

      case "AMPLIFIER":
        return connected.ELECTRODE;

      case "FILTER":
        return connected.AMPLIFIER;

      case "ADC":
        return connected.FILTER;

      case "CONTROLLER":
        return connected.ADC;

      case "DISPLAY":
        return connected.CONTROLLER;

      default:
        return false;
    }
  };

  // ========================================
  // GET IMAGE
  // ========================================

  const getImage = (type) => {
    const component = components.find(
      (item) => item.type === type
    );

    return component?.image;
  };

  // ========================================
  // ASSEMBLY COMPLETION
  // ========================================

  const isAssemblyCompleted = score === 6;

  // Save completion status in localStorage
  if (isAssemblyCompleted) {
    localStorage.setItem(
      "patientMonitorInternal",
      "completed"
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-100 p-8">

        {/* ================================= */}
        {/* BACK TO PRACTICE */}
        {/* ================================= */}

         <Link
          to="/patient-monitor"
          className="text-blue-700 font-bold text-lg"
        >
          ← Back to Patient Monitor Dashboard
        </Link>

        {/* ================================= */}
        {/* TITLE */}
        {/* ================================= */}

        <h1 className="text-center text-5xl font-bold text-blue-700 my-8">
          Patient Monitor Internal Components
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Biomedical Equipment Assembly Practice
        </p>

        {/* ================================= */}
        {/* MACHINE OVERVIEW */}
        {/* ================================= */}

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold text-center mb-6">
            Patient Monitor
          </h2>

          <div className="bg-slate-900 rounded-xl p-8">

            <div className="border-4 border-gray-500 rounded-xl bg-black p-6">

              <div className="text-green-400 text-center text-2xl font-mono mb-6">
                PATIENT MONITOR
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-slate-800 border border-green-400 rounded-lg p-4 text-center">
                  <p className="text-green-400 font-bold">
                    ECG
                  </p>
                  <p className="text-gray-400 text-sm">
                    Module
                  </p>
                </div>

                <div className="bg-slate-800 border border-blue-400 rounded-lg p-4 text-center">
                  <p className="text-blue-400 font-bold">
                    SpO₂
                  </p>
                  <p className="text-gray-400 text-sm">
                    Module
                  </p>
                </div>

                <div className="bg-slate-800 border border-yellow-400 rounded-lg p-4 text-center">
                  <p className="text-yellow-400 font-bold">
                    NIBP
                  </p>
                  <p className="text-gray-400 text-sm">
                    Module
                  </p>
                </div>

                <div className="bg-slate-800 border border-red-400 rounded-lg p-4 text-center">
                  <p className="text-red-400 font-bold">
                    TEMP
                  </p>
                  <p className="text-gray-400 text-sm">
                    Module
                  </p>
                </div>

              </div>

              <div className="mt-6 bg-slate-800 border border-purple-400 rounded-lg p-5 text-center">

                <p className="text-purple-400 font-bold">
                  Main Controller
                </p>

                <p className="text-gray-400 text-sm">
                  Signal Processing & Control
                </p>

              </div>

              <div className="mt-4 bg-slate-800 border border-white rounded-lg p-4 text-center">

                <p className="text-white font-bold">
                  Display
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* ASSEMBLY AREA */}
        {/* ================================= */}

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* LEFT SIDE */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-2">
              ECG Components
            </h2>

            <p className="text-gray-600 mb-6">
              Drag the component image to the correct position.
            </p>

            <div className="grid grid-cols-2 gap-5">

              {components.map((component) => (
                <ComponentCard
                  key={component.type}
                  component={component}
                  unlocked={isUnlocked(component.type)}
                />
              ))}

            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-2">
              ECG Signal Path
            </h2>

            <p className="text-gray-600 mb-6">
              Connect the components in the correct order.
            </p>

            <div className="space-y-4">

              {/* 1 */}

              <ConnectionSlot
                expectedType="ELECTRODE"
                label="1. ECG Electrodes"
                connected={connected.ELECTRODE}
                unlocked={true}
                connectedImage={getImage("ELECTRODE")}
                onCorrect={handleCorrectConnection}
              />

              <div className="text-center text-3xl text-blue-600">
                ↓
              </div>

              {/* 2 */}

              <ConnectionSlot
                expectedType="AMPLIFIER"
                label="2. ECG Amplifier"
                connected={connected.AMPLIFIER}
                unlocked={connected.ELECTRODE}
                connectedImage={getImage("AMPLIFIER")}
                onCorrect={handleCorrectConnection}
              />

              <div className="text-center text-3xl text-blue-600">
                ↓
              </div>

              {/* 3 */}

              <ConnectionSlot
                expectedType="FILTER"
                label="3. Signal Filter"
                connected={connected.FILTER}
                unlocked={connected.AMPLIFIER}
                connectedImage={getImage("FILTER")}
                onCorrect={handleCorrectConnection}
              />

              <div className="text-center text-3xl text-blue-600">
                ↓
              </div>

              {/* 4 */}

              <ConnectionSlot
                expectedType="ADC"
                label="4. ADC"
                connected={connected.ADC}
                unlocked={connected.FILTER}
                connectedImage={getImage("ADC")}
                onCorrect={handleCorrectConnection}
              />

              <div className="text-center text-3xl text-blue-600">
                ↓
              </div>

              {/* 5 */}

              <ConnectionSlot
                expectedType="CONTROLLER"
                label="5. Main Controller"
                connected={connected.CONTROLLER}
                unlocked={connected.ADC}
                connectedImage={getImage("CONTROLLER")}
                onCorrect={handleCorrectConnection}
              />

              <div className="text-center text-3xl text-blue-600">
                ↓
              </div>

              {/* 6 */}

              <ConnectionSlot
                expectedType="DISPLAY"
                label="6. Display"
                connected={connected.DISPLAY}
                unlocked={connected.CONTROLLER}
                connectedImage={getImage("DISPLAY")}
                onCorrect={handleCorrectConnection}
              />

            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* PROGRESS */}
        {/* ================================= */}

        <div className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold">
            Assembly Progress
          </h2>

          <p className="text-xl mt-3">
            Score: {score} / 6
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">

            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${(score / 6) * 100}%`,
              }}
            ></div>

          </div>

          {/* ================================= */}
          {/* COMPLETED */}
          {/* ================================= */}

          {isAssemblyCompleted && (
            <div className="mt-6 bg-green-100 border-2 border-green-500 rounded-xl p-6">

              <h2 className="text-2xl font-bold text-green-700">
                🎉 ECG Assembly Completed!
              </h2>

              <p className="mt-2 text-gray-700">
                All ECG components have been connected in
                the correct order.
              </p>

              <p className="mt-3 font-bold text-green-700">
                ✓ Internal Assembly Completed
              </p>

              {/* ONLY DASHBOARD BUTTON */}

              <Link
                to="/patient-monitor"
                className="inline-block mt-6 bg-blue-600
                           hover:bg-blue-700 text-white
                           px-7 py-3 rounded-lg
                           font-bold transition"
              >
                ← Back to Patient Monitor Dashboard
              </Link>

            </div>
          )}

        </div>

      </div>
    </DndProvider>
  );
}

export default PatientMonitorInternal;