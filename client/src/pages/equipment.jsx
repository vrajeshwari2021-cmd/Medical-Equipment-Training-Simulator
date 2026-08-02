import { Link } from "react-router-dom";

const equipments = [
  {
    id: 1,
    name: "Patient Monitor",
    icon: "🩺",
  },
  {
    id: 2,
    name: "ECG Monitor",
    icon: "❤️",
  },
  {
    id: 3,
    name: "Ventilator",
    icon: "🫁",
  },
  {
    id: 4,
    name: "Defibrillator",
    icon: "⚡",
  },
  {
    id: 5,
    name: "Infusion Pump",
    icon: "💉",
  },
  {
    id: 6,
    name: "Syringe Pump",
    icon: "🧪",
  },
];

function Equipment() {
  return (
    <div className="min-h-screen bg-slate-100 py-16">
      <h1 className="text-5xl font-bold text-center text-blue-700 mb-12">
        Medical Equipment
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {equipments.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition duration-300 cursor-pointer"
          >
            <div className="text-6xl mb-5">{item.icon}</div>

            <h2 className="text-2xl font-semibold mb-6">
              {item.name}
            </h2>

            {item.id === 1 ? (
              <Link to="/patient-monitor">
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                  Open Simulator
                </button>
              </Link>
            ) : (
              <button className="bg-gray-500 text-white px-5 py-2 rounded-lg cursor-not-allowed">
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Equipment;