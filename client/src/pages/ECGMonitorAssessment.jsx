
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ECGMonitorAssessment.css";

const questions = [
  {
    question: "What is the main function of an ECG monitor?",
    options: [
      "Measure heart activity",
      "Measure body temperature",
      "Measure blood sugar",
      "Measure oxygen level",
    ],
    answer: 0,
  },
  {
    question: "What does ECG stand for?",
    options: [
      "Electrical Cardiac Graph",
      "Electrocardiogram",
      "Electronic Cardiac Gauge",
      "External Cardiac Generator",
    ],
    answer: 1,
  },
  {
    question: "Which are the four standard limb electrodes?",
    options: [
      "RA, LA, RL, LL",
      "V1, V2, V3, V4",
      "ECG, EEG, EMG, EOG",
      "SpO2, NIBP, ECG, TEMP",
    ],
    answer: 0,
  },
  {
    question: "What does the P wave represent?",
    options: [
      "Ventricular contraction",
      "Atrial depolarization",
      "Ventricular repolarization",
      "Heart valve closure",
    ],
    answer: 1,
  },
  {
    question: "What does the QRS complex represent?",
    options: [
      "Atrial depolarization",
      "Ventricular depolarization",
      "Breathing activity",
      "Blood oxygen level",
    ],
    answer: 1,
  },
  {
    question: "What should you check first if the ECG waveform is absent?",
    options: [
      "Electrode connections",
      "Patient's height",
      "Room lighting",
      "Printer paper",
    ],
    answer: 0,
  },
  {
    question: "Which ECG wave represents ventricular repolarization?",
    options: ["P wave", "QRS complex", "T wave", "PR interval"],
    answer: 2,
  },
  {
    question: "What is a common cause of ECG noise or artifacts?",
    options: [
      "Loose electrodes",
      "Correct electrode placement",
      "A stable patient",
      "Proper skin preparation",
    ],
    answer: 0,
  },
  {
    question: "Which part of the ECG represents atrial depolarization?",
    options: [
      "T wave",
      "P wave",
      "QRS complex",
      "ST segment",
    ],
    answer: 1,
  },
  {
    question: "Which electrode is commonly placed on the right arm?",
    options: ["LA", "LL", "RA", "RL"],
    answer: 2,
  },
  {
    question: "What is the normal resting heart rate for most adults?",
    options: [
      "20–40 beats/min",
      "60–100 beats/min",
      "120–160 beats/min",
      "180–220 beats/min",
    ],
    answer: 1,
  },
  {
    question: "What does the ECG monitor display?",
    options: [
      "Electrical activity of the heart",
      "Blood glucose concentration",
      "Body weight",
      "Lung volume only",
    ],
    answer: 0,
  },
  {
    question: "Why should the patient's skin be prepared before electrode placement?",
    options: [
      "To increase skin temperature",
      "To improve electrical contact",
      "To reduce heart rate",
      "To measure blood pressure",
    ],
    answer: 1,
  },
  {
    question: "Which ECG component represents the time between atrial and ventricular electrical conduction?",
    options: [
      "PR interval",
      "T wave",
      "QRS amplitude",
      "U wave only",
    ],
    answer: 0,
  },
  {
    question: "What should you do if an ECG electrode becomes detached?",
    options: [
      "Ignore the alarm",
      "Switch off all hospital equipment",
      "Reconnect the electrode properly",
      "Increase the screen brightness",
    ],
    answer: 2,
  },
  {
    question: "Which component helps protect the ECG input circuit from electrical interference?",
    options: [
      "Patient cable only",
      "Input protection circuit",
      "Printer roller",
      "Display stand",
    ],
    answer: 1,
  },
  {
    question: "What is the purpose of the ECG patient cable?",
    options: [
      "To connect electrodes to the monitor",
      "To measure body temperature",
      "To supply oxygen",
      "To measure blood glucose",
    ],
    answer: 0,
  },
  {
    question: "What can muscle movement cause in an ECG recording?",
    options: [
      "A clearer waveform in every case",
      "Artifacts or signal interference",
      "A guaranteed normal rhythm",
      "An increase in blood oxygen",
    ],
    answer: 1,
  },
  {
    question: "Which ECG segment is commonly assessed for signs of myocardial ischemia or injury?",
    options: [
      "P wave only",
      "PR interval only",
      "ST segment",
      "R wave label only",
    ],
    answer: 2,
  },
  {
    question: "What should be done before using an ECG monitor on a patient?",
    options: [
      "Check the equipment, cables, and electrodes",
      "Disconnect the protective earth",
      "Ignore equipment alarms",
      "Use damaged patient cables",
    ],
    answer: 0,
  },
];

export default function ECGMonitorAssessment() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [popup, setPopup] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wrongOption, setWrongOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const item = questions[current];
  const isDay = (current + 1) % 2 === 1;

  function handleAnswer(optionIndex) {
    if (answered || wrongOption !== null) return;

    if (optionIndex === item.answer) {
      setScore((previous) => previous + 1);
      setAnswered(true);
      setPopup(true);
    } else {
      setWrongOption(optionIndex);
    }
  }

  function nextQuestion() {
    setPopup(false);

    if (current === questions.length - 1) {
      localStorage.setItem("ecgMonitorAssessment", "completed");
      setFinished(true);
      return;
    }

    setCurrent((previous) => previous + 1);
    setWrongOption(null);
    setAnswered(false);
  }

  function tryAgain() {
    setCurrent(0);
    setScore(0);
    setPopup(false);
    setFinished(false);
    setWrongOption(null);
    setAnswered(false);
  }

  function backToECG() {
    navigate("/ecg-monitor");
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <main className="ecg-game night-scene">
        <section className="result-card">
          <div className="result-trophy">🏆</div>
          <p className="eyebrow">ASSESSMENT COMPLETED</p>
          <h1>Well Done!</h1>
          <p className="result-message">
            You have completed the ECG Monitor Assessment.
          </p>

          <div className="result-score">
            {score}
            <span> / {questions.length}</span>
          </div>

          <p className="result-message">
            Your score: {percentage}%
          </p>

          <button className="game-button" onClick={tryAgain}>
            Try Again
          </button>

          <button
            className="game-button secondary"
            onClick={backToECG}
          >
            Back to ECG Monitor
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={`ecg-game ${isDay ? "day-scene" : "night-scene"}`}>
      <header className="game-header">
        <button className="back-button" onClick={backToECG}>
          ← Back
        </button>

        <div className="game-heading">
          <p className="eyebrow">MEDICAL EQUIPMENT SIMULATOR</p>
          <h1>ECG Monitor Assessment</h1>
        </div>

        <div className="question-count">
          {current + 1}
          <span> / {questions.length}</span>
        </div>
      </header>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
      >
        <div
          className="progress-fill"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <section className="celestial-scene">
        <div className="sky-decoration" aria-hidden="true">
          <span className="cloud cloud-one" />
          <span className="cloud cloud-two" />
          <span className="cloud cloud-three" />
          <span className="tiny-star star-one">✦</span>
          <span className="tiny-star star-two">✧</span>
          <span className="tiny-star star-three">✦</span>
          <span className="tiny-star star-four">✧</span>
        </div>

        <p className="choose-label">✦ CHOOSE THE CORRECT ANSWER ✦</p>

        <div className="answer-grid">
          {item.options.map((option, optionIndex) => {
            const isWrong = wrongOption === optionIndex;

            return (
              <button
                key={`${current}-${optionIndex}`}
                className={`answer-object ${
                  isDay ? "cloud-option" : "star-option"
                } ${isWrong ? "wrong-option" : ""}`}
                onClick={() => handleAnswer(optionIndex)}
                disabled={answered || wrongOption !== null}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>

        <div
          className={`question-landscape ${
            isDay ? "sun-landscape" : "moon-landscape"
          }`}
        >
          {isDay ? (
            <div className="sun-object" aria-hidden="true">
              <div className="sun-disc" />
              <div className="sun-horizon" />
            </div>
          ) : (
            <div className="moon-object" aria-hidden="true">
              <div className="moon-shadow" />
            </div>
          )}

          <article className="question-panel">
            <span className="question-tag">
              {isDay
                ? "☀ QUESTION • SUN ROUND"
                : "☾ QUESTION • MOON ROUND"}
            </span>
            <h2>{item.question}</h2>
          </article>
        </div>
      </section>

      <footer className="game-footer">
        <span>Correct answers: {score}</span>
        <span>
          {isDay ? "☀ Day Challenge" : "☾ Night Challenge"}
        </span>
      </footer>

      {wrongOption !== null && (
        <div className="popup-backdrop">
          <section className="correct-popup">
            <div className="success-orb wrong-orb">✕</div>
            <h2>Not Quite!</h2>
            <p>
              That option has disappeared. Restart the assessment to
              try again.
            </p>
            <button className="game-button" onClick={tryAgain}>
              Try Again
            </button>
          </section>
        </div>
      )}

      {popup && (
        <div className="popup-backdrop">
          <section className="correct-popup">
            <div className="success-orb">✓</div>
            <h2>Correct Answer!</h2>
            <p>Excellent! You selected the correct answer.</p>
            <button className="game-button" onClick={nextQuestion}>
              {current === questions.length - 1
                ? "View Results"
                : "Next Question →"}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
