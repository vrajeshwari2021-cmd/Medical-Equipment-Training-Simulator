function Home() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-700">
          Medical Equipment Training Simulator
        </h1>

        <p className="mt-4 text-xl text-gray-600">
          Learn • Practice • Troubleshoot
        </p>

        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;