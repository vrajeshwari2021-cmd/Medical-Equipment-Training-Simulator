import { useDrag, useDrop } from "react-dnd";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";

import patient from "../assets/practice/patient-body.png";
import ecg from "../assets/practice/ecg-lead.png";
import spo2 from "../assets/practice/spo2-probe.png";
import bp from "../assets/practice/bp-cuff.png";
import temp from "../assets/practice/temp-probe.png";

// ========================================
// DROP ZONE
// ========================================

function DropZone({
  type,
  label,
  position,
  onCorrectDrop,
  connected,
}) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "EQUIPMENT",

      drop: (item) => {
        if (item.type === type) {
          onCorrectDrop(type);
        } else {
          alert("❌ Wrong Placement! Try Again.");
        }
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [type, onCorrectDrop]
  );

  return (
    <div
      ref={drop}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
      className={`w-16 h-16 rounded-full border-4 border-dashed
        flex items-center justify-center text-xs font-bold
        transition-all
        ${
          connected
            ? "bg-green-500 border-green-700 text-white"
            : isOver
            ? "bg-yellow-400 border-yellow-700 scale-110"
            : "bg-blue-400/30 border-blue-500"
        }`}
    >
      {connected ? "✓" : label}
    </div>
  );
}

// ========================================
// EQUIPMENT ITEM
// ========================================

function EquipmentItem({ name, image, type }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "EQUIPMENT",

      item: {
        type: type,
      },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [type]
  );

  return (
    <div
      ref={drag}
      className={`bg-white border-2 border-gray-200 rounded-xl p-4
      flex items-center gap-4 cursor-grab shadow-md
      ${isDragging ? "opacity-40" : "opacity-100"}`}
    >
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-contain"
      />

      <div>
        <p className="font-bold text-lg">
          {name}
        </p>

        <p className="text-gray-500 text-sm">
          Drag to patient
        </p>
      </div>
    </div>
  );
}

// ========================================
// MAIN COMPONENT
// ========================================

function PatientMonitorPractice() {
  const [connected, setConnected] = useState({
    ECG: false,
    SPO2: false,
    BP: false,
    TEMP: false,
  });

  // ========================================
  // SCORE
  // ========================================

  const score =
    Number(connected.ECG) +
    Number(connected.SPO2) +
    Number(connected.BP) +
    Number(connected.TEMP);

  // ========================================
  // CORRECT DROP
  // ========================================

  const handleCorrectDrop = (type) => {
    setConnected((previous) => {
      const updated = {
        ...previous,
        [type]: true,
      };

      // Check whether all 4 are completed
      const completed =
        updated.ECG &&
        updated.SPO2 &&
        updated.BP &&
        updated.TEMP;

      // Save completion only after all 4 are connected
      if (completed) {
        localStorage.setItem("patientMonitorPractice", "completed");
      }

      return updated;
    });

    // Success messages
    if (type === "ECG") {
      alert("✅ ECG Lead Connected");
    }

    if (type === "SPO2") {
      alert("✅ SpO₂ Probe Connected");
    }

    if (type === "BP") {
      alert("✅ BP Cuff Connected");
    }

    if (type === "TEMP") {
      alert("✅ Temperature Probe Connected");
    }
  };

  // ========================================
  // PAGE
  // ========================================

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-100 p-8">

        {/* ================================= */}
        {/* BACK BUTTON */}
        {/* ================================= */}

        <Link
          to="/patient-monitor"
          className="text-blue-700 font-bold text-lg"
        >
          ← Back to Patient Moniotr Dashboard
        </Link>

        {/* ================================= */}
        {/* TITLE */}
        {/* ================================= */}

        <h1 className="text-center text-5xl font-bold text-blue-700 my-8">
          Patient Monitor Practice Mode
        </h1>

        {/* ================================= */}
        {/* MAIN LAYOUT */}
        {/* ================================= */}

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* ================================= */}
          {/* PATIENT SIDE */}
          {/* ================================= */}

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-6 text-center">
              Patient
            </h2>

            <div className="flex justify-center">

              <div className="relative w-[500px]">

                {/* PATIENT IMAGE */}

                <img
                  src={patient}
                  alt="Patient"
                  className="block w-full h-auto"
                />

                {/* ================================= */}
                {/* TEMPERATURE - FOREHEAD */}
                {/* ================================= */}

                <DropZone
                  type="TEMP"
                  label="TEMP"
                  position={{
                    top: "1%",
                    left: "45%",
                  }}
                  onCorrectDrop={handleCorrectDrop}
                  connected={connected.TEMP}
                />

                {/* ================================= */}
                {/* ECG - CHEST */}
                {/* ================================= */}

                <DropZone
                  type="ECG"
                  label="ECG"
                  position={{
                    top: "21%",
                    left: "45%",
                  }}
                  onCorrectDrop={handleCorrectDrop}
                  connected={connected.ECG}
                />

                {/* ================================= */}
                {/* BP - UPPER ARM */}
                {/* ================================= */}

                <DropZone
                  type="BP"
                  label="BP"
                  position={{
                    top: "25%",
                    left: "31%",
                  }}
                  onCorrectDrop={handleCorrectDrop}
                  connected={connected.BP}
                />

                {/* ================================= */}
                {/* SPO2 - RIGHT FINGER */}
                {/* ================================= */}

                <DropZone
                  type="SPO2"
                  label="SpO₂"
                  position={{
                    top: "46%",
                    left: "60%",
                  }}
                  onCorrectDrop={handleCorrectDrop}
                  connected={connected.SPO2}
                />

              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* EQUIPMENT SIDE */}
          {/* ================================= */}

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-6">
              Equipment
            </h2>

            <div className="space-y-5">

              {/* ECG */}

              <EquipmentItem
                name="ECG Lead"
                image={ecg}
                type="ECG"
              />

              {/* SpO2 */}

              <EquipmentItem
                name="SpO₂ Probe"
                image={spo2}
                type="SPO2"
              />

              {/* BP */}

              <EquipmentItem
                name="BP Cuff"
                image={bp}
                type="BP"
              />

              {/* Temperature */}

              <EquipmentItem
                name="Temperature Probe"
                image={temp}
                type="TEMP"
              />

            </div>

            {/* ================================= */}
            {/* INSTRUCTIONS */}
            {/* ================================= */}

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">

              <h3 className="text-xl font-bold text-blue-700">
                How to Practice
              </h3>

              <p className="mt-2 text-gray-700">
                Drag each medical equipment item and place it
                on the correct location on the patient.
              </p>

            </div>

          </div>
        </div>

        {/* ================================= */}
        {/* PROGRESS */}
        {/* ================================= */}

        <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold">
            Practice Progress
          </h2>

          <p className="text-xl mt-3">
            Score:{" "}
            <span className="font-bold text-blue-600">
              {score} / 4
            </span>
          </p>

          {/* PROGRESS BAR */}

          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">

            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${(score / 4) * 100}%`,
              }}
            ></div>

          </div>

          {/* ================================= */}
          {/* COMPLETED MESSAGE */}
          {/* ================================= */}

          {score === 4 && (
            <div className="mt-6 bg-green-100 border border-green-500 rounded-xl p-6 text-center">

              <div className="text-5xl mb-3">
                🎉
              </div>

              <h2 className="text-3xl font-bold text-green-700">
                Practice Completed!
              </h2>

              <p className="mt-3 text-gray-700 text-lg">
                All patient monitor equipment has been
                connected correctly.
              </p>

              <p className="mt-3 font-bold text-green-700 text-xl">
                Score: 4 / 4
              </p>

              <p className="mt-3 text-gray-700">
                The next training activity is now unlocked.
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

export default PatientMonitorPractice;