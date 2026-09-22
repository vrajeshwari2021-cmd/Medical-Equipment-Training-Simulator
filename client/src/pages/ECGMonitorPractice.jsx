import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";

import patientBody from "../assets/practice/ecg-patient-body.png";

const ItemTypes = {
  ELECTRODE: "electrode",
};

const electrodes = [
  {
    id: "RA",
    name: "RA Electrode",
    position: "Right Arm",
  },
  {
    id: "LA",
    name: "LA Electrode",
    position: "Left Arm",
  },
  {
    id: "RL",
    name: "RL Electrode",
    position: "Right Leg",
  },
  {
    id: "LL",
    name: "LL Electrode",
    position: "Left Leg",
  },
  {
    id: "V1",
    name: "V1 Electrode",
    position: "Chest - V1",
  },
  {
    id: "V2",
    name: "V2 Electrode",
    position: "Chest - V2",
  },
];

function ECGMonitorPractice() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState({
    RA: false,
    LA: false,
    RL: false,
    LL: false,
    V1: false,
    V2: false,
  });

  const [message, setMessage] = useState("");
  const [errorZone, setErrorZone] = useState("");

  const score = Object.values(connected).filter(Boolean).length;

  const handleDrop = (zoneId, electrodeId) => {
    if (zoneId === electrodeId) {
      setConnected((prev) => ({
        ...prev,
        [zoneId]: true,
      }));

      setErrorZone("");

      setMessage(
        `✓ ${electrodeId} Electrode placed correctly!`
      );
    } else {
      setErrorZone(zoneId);

      setMessage(
        `✗ Incorrect Placement! ${electrodeId} Electrode does not belong at ${zoneId}. Try again.`
      );

      setTimeout(() => {
        setErrorZone("");
      }, 1200);
    }
  };

  const handleFinishPractice = () => {
    if (score === 6) {
      localStorage.setItem(
        "ecgMonitorPractice",
        "completed"
      );

      navigate("/ecg-monitor");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>

      <div className="min-h-screen bg-slate-100 py-10 px-6">

        <div className="max-w-6xl mx-auto">

          {/* Back */}
          <button
            onClick={() => navigate("/ecg-monitor")}
            className="mb-6 text-blue-600 font-semibold hover:underline"
          >
            ← Back to ECG Monitor Dashboard
          </button>

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

            <h1 className="text-4xl font-bold text-blue-700 mb-3">
              ECG Monitor – Practice
            </h1>

            <p className="text-gray-600 text-lg">
              Drag each ECG electrode and place it on the
              correct position of the patient.
            </p>

          </div>

          {/* Score */}
          <div className="bg-white rounded-2xl shadow-md p-5 mb-8 flex justify-between items-center">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                ECG Electrode Placement
              </h2>

              <p className="text-gray-600">
                Place all six electrodes correctly.
              </p>
            </div>

            <div className="text-2xl font-bold text-blue-700">
              Score: {score} / 6
            </div>

          </div>

          {/* Main Area */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* LEFT - ELECTRODES */}
            <div className="bg-white rounded-2xl shadow-lg p-7">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                ECG Electrodes
              </h2>

              <div className="grid grid-cols-2 gap-4">

                {electrodes.map((electrode) => (
                  <DraggableElectrode
                    key={electrode.id}
                    electrode={electrode}
                    connected={connected[electrode.id]}
                  />
                ))}

              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">

                <p className="text-blue-700 font-semibold">
                  💡 Drag each electrode to its correct
                  anatomical position.
                </p>

              </div>

            </div>

            {/* RIGHT - PATIENT */}
            <div className="bg-white rounded-2xl shadow-lg p-7">

              <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
                Patient Electrode Placement
              </h2>

              {/* IMAGE CONTAINER */}
              <div className="relative mx-auto w-[360px] h-[520px] overflow-hidden rounded-xl bg-black">

                <img
                  src={patientBody}
                  alt="Patient body for ECG electrode placement"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: "center 48%",
                  }}
                />

                {/* RA - RIGHT ARM */}
<DropZone
  id="RA"
  label="RA"
  position="top-[27%] left-[9%]"
  connected={connected.RA}
  error={errorZone === "RA"}
  onDrop={handleDrop}
/>

{/* LA - LEFT ARM */}
<DropZone
  id="LA"
  label="LA"
  position="top-[27%] right-[9%]"
  connected={connected.LA}
  error={errorZone === "LA"}
  onDrop={handleDrop}
/>

{/* V1 - UPPER RIGHT CHEST */}
<DropZone
  id="V1"
  label="V1"
  position="top-[35%] left-[38%]"
  connected={connected.V1}
  error={errorZone === "V1"}
  onDrop={handleDrop}
/>

{/* V2 - UPPER LEFT CHEST */}
<DropZone
  id="V2"
  label="V2"
  position="top-[35%] left-[53%]"
  connected={connected.V2}
  error={errorZone === "V2"}
  onDrop={handleDrop}
/>

{/* RL - RIGHT LEG */}
<DropZone
  id="RL"
  label="RL"
  position="bottom-[19%] left-[35%]"
  connected={connected.RL}
  error={errorZone === "RL"}
  onDrop={handleDrop}
/>

{/* LL - LEFT LEG */}
<DropZone
  id="LL"
  label="LL"
  position="bottom-[19%] right-[35%]"
  connected={connected.LL}
  error={errorZone === "LL"}
  onDrop={handleDrop}
/>

              </div>

            </div>

          </div>

          {/* Feedback */}
          {message && (
            <div
              className={`rounded-xl shadow-md p-5 mt-8 text-center border-2 ${
                message.startsWith("✓")
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-red-50 border-red-300 text-red-700"
              }`}
            >
              <p className="text-lg font-bold">
                {message}
              </p>
            </div>
          )}

          {/* Completion */}
          {score === 6 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center">

              <div className="text-5xl mb-4">
                🎉
              </div>

              <h2 className="text-3xl font-bold text-green-600 mb-3">
                Practice Completed!
              </h2>

              <p className="text-gray-600 mb-6">
                All six ECG electrodes have been placed correctly.
              </p>

              <button
                onClick={handleFinishPractice}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                🏠 Back to ECG Monitor Dashboard
              </button>

            </div>
          )}

        </div>

      </div>

    </DndProvider>
  );
}


/* =====================================================
   DRAGGABLE ELECTRODE
===================================================== */

function DraggableElectrode({
  electrode,
  connected,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ELECTRODE,

    item: {
      id: electrode.id,
    },

    canDrag: !connected,

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-5 rounded-xl border-2 text-center transition ${
        connected
          ? "bg-green-100 border-green-400 text-green-700 cursor-not-allowed"
          : "bg-slate-50 border-slate-300 hover:border-blue-500 hover:bg-blue-50 cursor-grab"
      } ${
        isDragging
          ? "opacity-50 scale-95"
          : "opacity-100"
      }`}
    >

      <div className="text-4xl mb-2">
        🔵
      </div>

      <h3 className="font-bold text-lg">
        {electrode.name}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {electrode.position}
      </p>

      {connected && (
        <p className="font-bold text-green-700 mt-2">
          ✓ Connected
        </p>
      )}

    </div>
  );
}


/* =====================================================
   DROP ZONE
===================================================== */

function DropZone({
  id,
  label,
  position,
  connected,
  error,
  onDrop,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ELECTRODE,

    drop: (item) => {
      onDrop(id, item.id);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`absolute ${position}
        w-14 h-14
        rounded-full
        border-4
        flex items-center justify-center
        font-bold text-sm
        transition-all duration-200
        ${
          connected
            ? "bg-green-500 border-green-700 text-white"
            : error
            ? "bg-red-500 border-red-700 text-white scale-110"
            : isOver
            ? "bg-blue-400 border-blue-700 text-white scale-110"
            : "bg-white border-blue-500 text-blue-700"
        }
      `}
    >
      {connected
        ? "✓"
        : error
        ? "✗"
        : label}
    </div>
  );
}

export default ECGMonitorPractice;