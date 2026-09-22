import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PatientMonitorLearn() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const handleFinishLearning = () => {
    localStorage.setItem("patientMonitorLearn", "completed");
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/patient-monitor")}
          className="mb-6 text-blue-600 font-semibold hover:underline"
        >
          ← Back to Patient Monitor Dashboard
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-3">
            Patient Monitor – Learning Module
          </h1>

          <p className="text-gray-600 text-lg">
            Learn about the purpose, working principle, components,
            operating procedure, monitoring parameters, and safety
            precautions of a Patient Monitor.
          </p>
        </div>

        {/* 1. What is Patient Monitor? */}
        <Section title="1. What is a Patient Monitor?">
          <p>
            A Patient Monitor is a medical device used to continuously
            observe and display important physiological parameters of
            a patient. It helps healthcare professionals monitor the
            patient's condition in real time.
          </p>
        </Section>

        {/* 2. Purpose */}
        <Section title="2. Purpose of a Patient Monitor">
          <ul className="list-disc pl-6 space-y-2">
            <li>To continuously monitor the patient's vital signs.</li>
            <li>To display physiological parameters in real time.</li>
            <li>To observe changes in the patient's condition.</li>
            <li>To provide visual and audible alerts when required.</li>
            <li>To support healthcare professionals in patient monitoring.</li>
          </ul>
        </Section>

        {/* 3. Parameters */}
        <Section title="3. Parameters Monitored">
          <div className="space-y-4">

            <ComponentItem
              name="ECG"
              description="Electrocardiography is used to monitor the electrical activity of the heart and display the ECG waveform."
            />

            <ComponentItem
              name="SpO₂"
              description="Pulse oximetry is used to measure the oxygen saturation of blood and pulse rate."
            />

            <ComponentItem
              name="Blood Pressure"
              description="The blood pressure module measures the patient's systolic and diastolic blood pressure."
            />

            <ComponentItem
              name="Temperature"
              description="The temperature sensor measures the patient's body temperature."
            />

          </div>
        </Section>

        {/* 4. Working Principle */}
        <Section title="4. Working Principle">
          <div className="space-y-4">

            <p>
              A Patient Monitor receives physiological signals from
              sensors and probes connected to the patient.
            </p>

            <p>
              The acquired signals are processed by the internal
              electronic circuits of the monitor. Different signal
              conditioning and processing stages are used depending
              on the physiological parameter being measured.
            </p>

            <p>
              The processed information is then displayed on the
              monitor screen so that healthcare professionals can
              observe the patient's condition.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
              <p className="font-bold text-blue-700">
                Patient → Sensors / Probes → Signal Processing → Controller → Display
              </p>
            </div>

          </div>
        </Section>

        {/* 5. Major Components */}
        <Section title="5. Major Components of a Patient Monitor">
          <div className="space-y-4">

            <ComponentItem
              name="ECG Electrodes and Leads"
              description="Used to acquire the electrical activity of the heart from the patient."
            />

            <ComponentItem
              name="SpO₂ Probe"
              description="Used to measure oxygen saturation and pulse rate."
            />

            <ComponentItem
              name="Blood Pressure Cuff"
              description="Used for non-invasive blood pressure measurement."
            />

            <ComponentItem
              name="Temperature Probe"
              description="Used to measure the patient's body temperature."
            />

            <ComponentItem
              name="Signal Processing Circuit"
              description="Processes the signals received from different sensors and measurement channels."
            />

            <ComponentItem
              name="Main Controller"
              description="Controls system operation and processes the acquired measurement information."
            />

            <ComponentItem
              name="Display"
              description="Displays the patient's physiological parameters and waveforms."
            />

          </div>
        </Section>

        {/* 6. Operating Procedure */}
        <Section title="6. Basic Operating Procedure">
          <ol className="list-decimal pl-6 space-y-2">
            <li>Switch on the Patient Monitor.</li>
            <li>Prepare the patient for monitoring.</li>
            <li>Connect the required ECG electrodes and leads.</li>
            <li>Attach the SpO₂ probe correctly.</li>
            <li>Place the blood pressure cuff properly.</li>
            <li>Connect the temperature probe when required.</li>
            <li>Check the displayed physiological parameters.</li>
            <li>Verify that the waveforms and readings are stable.</li>
            <li>Observe the patient monitor for abnormal readings or alarms.</li>
          </ol>
        </Section>

        {/* 7. Safety Precautions */}
        <Section title="7. Safety Precautions">
          <ul className="list-disc pl-6 space-y-2">
            <li>Check all cables, probes, and accessories before use.</li>
            <li>Ensure proper placement of sensors and electrodes.</li>
            <li>Do not use damaged cables or accessories.</li>
            <li>Ensure good contact between sensors and the patient.</li>
            <li>Follow the manufacturer's operating instructions.</li>
            <li>Observe alarm conditions carefully.</li>
            <li>Clean reusable accessories according to proper procedures.</li>
          </ul>
        </Section>

        {/* 8. Common Problems */}
        <Section title="8. Common Patient Monitor Problems">
          <ul className="list-disc pl-6 space-y-2">
            <li>ECG waveform not displayed.</li>
            <li>Excessive ECG noise.</li>
            <li>Weak ECG signal.</li>
            <li>SpO₂ reading not available.</li>
            <li>Incorrect blood pressure reading.</li>
            <li>Temperature reading not displayed.</li>
            <li>Monitor display problems.</li>
          </ul>
        </Section>

        {/* 9. Learning Summary */}
        <Section title="9. Learning Summary">
          <p>
            In this module, students learn the basic purpose and
            operation of a Patient Monitor, the physiological
            parameters measured by the device, the major sensors
            and components, the basic operating procedure, and
            important safety precautions.
          </p>

          <p className="mt-4">
            This knowledge provides the foundation for the next
            interactive Practice module, where students can
            identify and connect Patient Monitor accessories.
          </p>
        </Section>

        {/* Completion Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center">

          {!completed ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Complete the Learning Module
              </h2>

              <p className="text-gray-600 mb-6">
                Read and understand all the topics before completing
                the Patient Monitor Learning Module.
              </p>

              <button
                onClick={handleFinishLearning}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                ✓ Finish Learning
              </button>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">
                🎉
              </div>

              <h2 className="text-3xl font-bold text-green-600 mb-3">
                Learning Completed!
              </h2>

              <p className="text-gray-600 mb-6">
                You have successfully completed the Patient Monitor
                Learning Module.
              </p>

              <button
                onClick={() => navigate("/patient-monitor")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                🏠 Back to Patient Monitor Dashboard
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}


/* Section Component */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-7 mb-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        {title}
      </h2>

      <div className="text-gray-700 leading-7 text-lg">
        {children}
      </div>

    </div>
  );
}


/* Component Item */

function ComponentItem({ name, description }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

      <h3 className="font-bold text-gray-800 text-lg">
        {name}
      </h3>

      <p className="text-gray-600 mt-1">
        {description}
      </p>

    </div>
  );
}

export default PatientMonitorLearn;