import { useState } from "react";
import { Link } from "react-router-dom";

const questions = [
  {
    question: "What is the main function of ECG electrodes?",
    options: [
      "Measure blood pressure",
      "Detect electrical activity of the heart",
      "Measure body temperature",
      "Measure oxygen saturation",
    ],
    answer: 1,
  },

  {
    question: "What is the purpose of an ECG amplifier?",
    options: [
      "Display the signal",
      "Increase the strength of the ECG signal",
      "Convert temperature into voltage",
      "Measure blood pressure",
    ],
    answer: 1,
  },

  {
    question: "Why is a signal filter used in an ECG system?",
    options: [
      "To remove unwanted noise",
      "To increase blood pressure",
      "To display patient information",
      "To measure oxygen level",
    ],
    answer: 0,
  },

  {
    question: "What does ADC stand for?",
    options: [
      "Automatic Digital Controller",
      "Analog Data Controller",
      "Analog-to-Digital Converter",
      "Advanced Display Circuit",
    ],
    answer: 2,
  },

  {
    question: "What is the function of the main controller in a patient monitor?",
    options: [
      "Process and control the signals",
      "Measure temperature only",
      "Provide oxygen to the patient",
      "Replace the ECG electrodes",
    ],
    answer: 0,
  },

  {
    question: "What does SpO₂ measure?",
    options: [
      "Blood pressure",
      "Heart rate only",
      "Oxygen saturation",
      "Body temperature",
    ],
    answer: 2,
  },

  {
    question: "What is the function of a BP cuff?",
    options: [
      "Measure blood pressure",
      "Measure ECG signals",
      "Measure oxygen saturation",
      "Display ECG waveform",
    ],
    answer: 0,
  },

  {
    question: "What is the purpose of a patient monitor display?",
    options: [
      "Store electricity",
      "Show patient parameters and waveforms",
      "Filter ECG noise",
      "Amplify ECG signals",
    ],
    answer: 1,
  },

  {
    question: "Which component converts an analog ECG signal into digital data?",
    options: [
      "Electrode",
      "Amplifier",
      "ADC",
      "Display",
    ],
    answer: 2,
  },

  {
    question: "What should be done first when troubleshooting a faulty patient monitor?",
    options: [
      "Replace every component",
      "Identify the possible faulty component",
      "Turn off the display permanently",
      "Remove all sensors",
    ],
    answer: 1,
  },

  {
    question: "Which parameter is commonly monitored using ECG?",
    options: [
      "Heart rate",
      "Blood glucose",
      "Body weight",
      "Blood group",
    ],
    answer: 0,
  },

  {
    question: "Which sensor is used to measure oxygen saturation?",
    options: [
      "Temperature probe",
      "ECG electrode",
      "SpO₂ probe",
      "BP cuff",
    ],
    answer: 2,
  },

  {
    question: "Which component removes unwanted interference from an ECG signal?",
    options: [
      "Display",
      "Signal filter",
      "BP cuff",
      "Temperature probe",
    ],
    answer: 1,
  },

  {
    question: "What type of signal is obtained directly from ECG electrodes?",
    options: [
      "Electrical signal",
      "Temperature signal",
      "Pressure signal",
      "Light signal",
    ],
    answer: 0,
  },

  {
    question: "What is the correct ECG signal processing sequence?",
    options: [
      "Display → ADC → Filter → Electrode",
      "Electrode → Amplifier → Filter → ADC",
      "ADC → Display → Electrode → Amplifier",
      "Filter → Display → Amplifier → Electrode",
    ],
    answer: 1,
  },

  {
    question: "Why is an amplifier required in an ECG system?",
    options: [
      "To increase the weak ECG signal",
      "To measure body temperature",
      "To inflate the BP cuff",
      "To display patient information",
    ],
    answer: 0,
  },

  {
    question: "Which component displays the processed patient information?",
    options: [
      "ECG electrode",
      "Signal filter",
      "Display",
      "ADC",
    ],
    answer: 2,
  },

  {
    question: "What is the main purpose of a patient monitor?",
    options: [
      "Monitor physiological parameters of a patient",
      "Perform surgery automatically",
      "Provide medicines",
      "Replace hospital staff",
    ],
    answer: 0,
  },

  {
    question: "Which device is used for non-invasive blood pressure measurement?",
    options: [
      "ECG electrode",
      "BP cuff",
      "SpO₂ probe",
      "Temperature probe",
    ],
    answer: 1,
  },

  {
    question: "What should be checked if a patient monitor is not displaying ECG waveform?",
    options: [
      "ECG connections and signal path",
      "Patient's height only",
      "Room temperature only",
      "Hospital bed position",
    ],
    answer: 0,
  },
];

function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  const [finalScore, setFinalScore] = useState(0);

  const question = questions[currentQuestion];

  // =====================================
  // SELECT ANSWER
  // =====================================

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
  };

  // =====================================
  // NEXT QUESTION
  // =====================================

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer.");
      return;
    }

    // Calculate the updated score immediately
    const isCorrect = selectedAnswer === question.answer;

    const updatedScore = isCorrect
      ? score + 1
      : score;

    setScore(updatedScore);

    // =====================================
    // LAST QUESTION
    // =====================================

    if (currentQuestion === questions.length - 1) {
      setFinalScore(updatedScore);

      // =====================================
      // SAVE ASSESSMENT COMPLETION
      // =====================================

      localStorage.setItem(
        "patientMonitorAssessment",
        "completed"
      );

      setFinished(true);

      return;
    }

    // =====================================
    // NEXT QUESTION
    // =====================================

    setCurrentQuestion((previous) => previous + 1);

    setSelectedAnswer(null);
  };

  // =====================================
  // FINAL PERCENTAGE
  // =====================================

  const percentage = Math.round(
    (finalScore / questions.length) * 100
  );

  // =====================================
  // FINAL RESULT PAGE
  // =====================================

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">

          {/* ICON */}

          <div className="text-6xl mb-5">
            🎉
          </div>

          {/* TITLE */}

          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Assessment Completed!
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            You have completed the Patient Monitor assessment.
          </p>

          {/* SCORE */}

          <div className="bg-blue-50 rounded-xl p-8 mb-8">

            <p className="text-gray-600 text-lg">
              Your Score
            </p>

            <p className="text-5xl font-bold text-blue-700 mt-3">
              {finalScore} / {questions.length}
            </p>

            <p className="text-2xl font-bold text-green-600 mt-3">
              {percentage}%
            </p>

          </div>

          {/* PASS / NOT PASS */}

          {percentage >= 70 ? (
            <div className="bg-green-100 border border-green-400 rounded-xl p-5 mb-8">

              <h2 className="text-2xl font-bold text-green-700">
                ✅ Assessment Passed
              </h2>

              <p className="text-gray-700 mt-2">
                You have demonstrated good knowledge of the
                patient monitor.
              </p>

            </div>
          ) : (
            <div className="bg-red-100 border border-red-400 rounded-xl p-5 mb-8">

              <h2 className="text-2xl font-bold text-red-700">
                ❌ Assessment Not Passed
              </h2>

              <p className="text-gray-700 mt-2">
                You have completed the assessment.
                Review the training modules and try again
                to improve your score.
              </p>

            </div>
          )}

          {/* COMPLETION MESSAGE */}

          <div className="bg-green-50 border border-green-300 rounded-xl p-5 mb-8">

            <h2 className="text-xl font-bold text-green-700">
              ✓ Patient Monitor Training Completed
            </h2>

            <p className="text-gray-700 mt-2">
              You have completed all Patient Monitor training
              activities including Learn, Practice, Assembly,
              Troubleshooting and Assessment.
            </p>

          </div>

          {/* BUTTONS */}

          <div className="flex justify-center gap-4 flex-wrap">

            {/* TRY AGAIN */}

            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
            >
              🔄 Try Again
            </button>

            {/* PATIENT MONITOR DASHBOARD */}

            <Link
              to="/patient-monitor"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold"
            >
              ← Patient Monitor Dashboard
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // =====================================
  // ASSESSMENT PAGE
  // =====================================

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}

        <div className="mb-6">

          <Link
            to="/patient-monitor"
            className="text-blue-700 font-bold"
          >
            ← Back to Patient Monitor Dashboard
          </Link>

        </div>

        {/* MAIN CARD */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-6">

            <div>

              <h1 className="text-4xl font-bold text-blue-700">
                Patient Monitor Assessment
              </h1>

              <p className="text-gray-600 mt-2">
                Test your knowledge of patient monitor operation
                and troubleshooting.
              </p>

            </div>

            {/* QUESTION NUMBER */}

            <div className="bg-blue-100 px-5 py-3 rounded-xl">

              <p className="text-blue-700 font-bold">
                Question
              </p>

              <p className="text-2xl font-bold text-blue-800 text-center">
                {currentQuestion + 1}/{questions.length}
              </p>

            </div>

          </div>

          {/* PROGRESS BAR */}

          <div className="w-full bg-gray-200 rounded-full h-3 mb-8">

            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            ></div>

          </div>

          {/* QUESTION */}

          <div className="bg-slate-50 border border-gray-200 rounded-xl p-7">

            <h2 className="text-2xl font-bold text-gray-800 mb-7">

              {currentQuestion + 1}. {question.question}

            </h2>

            {/* OPTIONS */}

            <div className="space-y-4">

              {question.options.map((option, index) => (

                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`
                    w-full
                    text-left
                    p-5
                    rounded-xl
                    border-2
                    transition-all
                    duration-200

                    ${
                      selectedAnswer === index
                        ? "border-blue-600 bg-blue-100"
                        : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50"
                    }
                  `}
                >

                  <div className="flex items-center gap-4">

                    {/* LETTER */}

                    <div
                      className={`
                        w-8
                        h-8
                        rounded-full
                        border-2
                        flex
                        items-center
                        justify-center
                        font-bold

                        ${
                          selectedAnswer === index
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-400 text-gray-600"
                        }
                      `}
                    >

                      {String.fromCharCode(65 + index)}

                    </div>

                    {/* OPTION */}

                    <span className="text-lg font-medium">
                      {option}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </div>

          {/* NEXT BUTTON */}

          <div className="flex justify-end mt-8">

            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg"
            >

              {currentQuestion === questions.length - 1
                ? "Finish Assessment ✓"
                : "Next Question →"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Assessment;