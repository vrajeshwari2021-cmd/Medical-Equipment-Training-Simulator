import { useEffect, useState } from "react";
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

function ComponentCard({ component, unlocked, connected }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ECG_COMPONENT",

      item: {
        type: component.type,
      },

      canDrag: unlocked && !connected,

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [unlocked, connected, component.type]
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
        flex-col
        items-center
        justify-center
        transition-all
        duration-200

        ${
          connected
            ? "bg-green-50 border-green-500 opacity-70 cursor-not-allowed"
            : unlocked
            ? "bg-white border-gray-300 cursor-grab hover:shadow-xl hover:scale-[1.02]"
            : "bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed"
        }

        ${isDragging ? "opacity-40 scale-95" : ""}
      `}
    >
      <img
        src={component.image}
        alt={component.name}
        className="w-[105px] h-[105px] object-contain pointer-events-none"
      />

      <p className="text-sm font-semibold text-gray-700 mt-1">
        {connected ? "✓ Connected" : component.name}
      </p>
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
  onWrong,
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
          onWrong(label);
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
        min-h-[125px]
        rounded-2xl
        border-4
        border-dashed
        flex
        items-center
        gap-5
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
            : "bg-white border-gray-400 hover:border-blue-400"
        }
      `}
    >
      {/* CONNECTED IMAGE */}

      {connected && connectedImage && (
        <div className="w-[85px] h-[85px] flex-shrink-0 bg-white rounded-xl border border-green-300 flex items-center justify-center">
          <img
            src={connectedImage}
            alt={label}
            className="w-[70px] h-[70px] object-contain"
          />
        </div>
      )}

      {/* TEXT */}

      <div className="flex-1">
        {connected ? (
          <>
            <p className="font-bold text-lg text-green-700">
              ✓ {label}
            </p>

            <p className="text-green-600 mt-1">
              Component connected correctly.
            </p>
          </>
        ) : !unlocked ? (
          <>
            <p className="font-bold text-lg text-gray-500">
              🔒 {label}
            </p>

            <p className="text-gray-500 mt-1">
              Complete the previous connection first.
            </p>
          </>
        ) : (
          <>
            <p className="font-bold text-lg text-gray-800">
              {label}
            </p>

            <p className="text-blue-600 mt-1">
              Drag the correct component here.
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

function ECGMonitorInternal() {
  const [connected, setConnected] = useState({
    ELECTRODE: false,
    AMPLIFIER: false,
    FILTER: false,
    ADC: false,
    CONTROLLER: false,
    DISPLAY: false,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // ========================================
  // CORRECT CONNECTION
  // ========================================

  const handleCorrectConnection = (type) => {
    setConnected((previous) => ({
      ...previous,
      [type]: true,
    }));

    setMessage("✓ Correct component connected successfully!");
    setMessageType("success");

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 1800);
  };

  // ========================================
  // WRONG CONNECTION
  // ========================================

  const handleWrongConnection = (label) => {
    setMessage(
      `❌ Wrong component! Connect the correct component to ${label}.`
    );

    setMessageType("error");

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2200);
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
  // COMPLETION
  // ========================================

  const isAssemblyCompleted = score === 6;

  useEffect(() => {
    if (isAssemblyCompleted) {
      localStorage.setItem(
        "ecgMonitorInternal",
        "completed"
      );
    }
  }, [isAssemblyCompleted]);

  // ========================================
  // RESET ASSEMBLY
  // ========================================

  const handleReset = () => {
    setConnected({
      ELECTRODE: false,
      AMPLIFIER: false,
      FILTER: false,
      ADC: false,
      CONTROLLER: false,
      DISPLAY: false,
    });

    setMessage("");
    setMessageType("");

    localStorage.removeItem("ecgMonitorInternal");
  };

  // ========================================
  // UI
  // ========================================

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-100 p-8">

        {/* BACK */}

        <Link
          to="/ecg-monitor"
          className="text-blue-700 font-bold text-lg hover:underline"
        >
          ← Back to ECG Monitor Dashboard
        </Link>

        {/* TITLE */}

        <h1 className="text-center text-5xl font-bold text-blue-700 my-8">
          ECG Monitor Internal Components
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Biomedical Equipment Assembly Practice
        </p>

        {/* MESSAGE */}

        {message && (
          <div
            className={`
              max-w-6xl mx-auto mb-8
              px-6 py-4
              rounded-xl
              text-center
              font-bold
              text-lg
              border-2

              ${
                messageType === "success"
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "bg-red-100 border-red-500 text-red-700"
              }
            `}
          >
            {message}
          </div>
        )}

        {/* MACHINE OVERVIEW */}

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold text-center mb-6">
            ECG Monitor Signal Processing Path
          </h2>

          <div className="bg-slate-900 rounded-xl p-8">

            <div className="border-4 border-gray-500 rounded-xl bg-black p-6">

              <div className="text-green-400 text-center text-2xl font-mono mb-6">
                ECG MONITOR
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                <div className="bg-slate-800 border border-green-400 rounded-lg p-4 text-center">
                  <p className="text-green-400 font-bold">
                    ECG INPUT
                  </p>

                  <p className="text-gray-400 text-sm">
                    Electrode Signal
                  </p>
                </div>

                <div className="bg-slate-800 border border-blue-400 rounded-lg p-4 text-center">
                  <p className="text-blue-400 font-bold">
                    AMPLIFIER
                  </p>

                  <p className="text-gray-400 text-sm">
                    Signal Amplification
                  </p>
                </div>

                <div className="bg-slate-800 border border-yellow-400 rounded-lg p-4 text-center">
                  <p className="text-yellow-400 font-bold">
                    FILTER
                  </p>

                  <p className="text-gray-400 text-sm">
                    Noise Reduction
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">

                <div className="bg-slate-800 border border-purple-400 rounded-lg p-4 text-center">
                  <p className="text-purple-400 font-bold">
                    ADC
                  </p>

                  <p className="text-gray-400 text-sm">
                    Analog to Digital
                  </p>
                </div>

                <div className="bg-slate-800 border border-pink-400 rounded-lg p-4 text-center">
                  <p className="text-pink-400 font-bold">
                    MAIN CONTROLLER
                  </p>

                  <p className="text-gray-400 text-sm">
                    Signal Processing
                  </p>
                </div>

              </div>

              <div className="mt-4 bg-slate-800 border border-white rounded-lg p-4 text-center">
                <p className="text-white font-bold">
                  DISPLAY
                </p>

                <p className="text-gray-400 text-sm">
                  ECG Waveform
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ASSEMBLY AREA */}

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* LEFT */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-2">
              ECG Components
            </h2>

            <p className="text-gray-600 mb-6">
              Drag each component to the correct position in the signal path.
            </p>

            <div className="grid grid-cols-2 gap-5">

              {components.map((component) => (
                <ComponentCard
                  key={component.type}
                  component={component}
                  unlocked={isUnlocked(component.type)}
                  connected={connected[component.type]}
                />
              ))}

            </div>

          </div>

          {/* RIGHT */}

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
                onWrong={handleWrongConnection}
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
                onWrong={handleWrongConnection}
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
                onWrong={handleWrongConnection}
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
                onWrong={handleWrongConnection}
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
                onWrong={handleWrongConnection}
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
                onWrong={handleWrongConnection}
              />

            </div>
          </div>
        </div>

        {/* PROGRESS */}

        <div className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Assembly Progress
            </h2>

            <p className="text-xl font-bold text-blue-700">
              {score} / 6
            </p>

          </div>

          {/* PROGRESS BAR */}

          <div className="w-full bg-gray-200 rounded-full h-5 mt-4 overflow-hidden">

            <div
              className="bg-green-500 h-5 rounded-full transition-all duration-500"
              style={{
                width: `${(score / 6) * 100}%`,
              }}
            ></div>

          </div>

          <p className="text-gray-600 mt-3">
            {score === 0
              ? "Start by connecting the ECG Electrodes."
              : score < 6
              ? "Continue connecting the components in sequence."
              : "All components have been connected successfully."}
          </p>

          {/* RESET BEFORE COMPLETION */}

          {!isAssemblyCompleted && score > 0 && (
            <button
              onClick={handleReset}
              className="mt-5 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              🔄 Reset Assembly
            </button>
          )}

          {/* COMPLETED */}

          {isAssemblyCompleted && (
            <div className="mt-6 bg-green-100 border-2 border-green-500 rounded-xl p-6">

              <h2 className="text-2xl font-bold text-green-700">
                🎉 ECG Assembly Completed!
              </h2>

              <p className="mt-2 text-gray-700">
                All ECG components have been connected in the correct order.
              </p>

              <p className="mt-3 font-bold text-green-700">
                ✓ Internal Assembly Completed
              </p>

              {/* ONLY BACK TO DASHBOARD */}

              <div className="mt-6">
                <Link
                  to="/ecg-monitor"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-bold transition"
                >
                  ← Back to ECG Monitor Dashboard
                </Link>
              </div>

            </div>
          )}

        </div>

      </div>
    </DndProvider>
  );
}

export default ECGMonitorInternal;