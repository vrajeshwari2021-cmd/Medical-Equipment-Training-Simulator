import HeroImage from "../assets/images/hero.svg";

function Hero() {
  return (
    <section className="bg-slate-100 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-6xl font-bold text-slate-800 leading-tight">
            Interactive Medical Equipment
            <span className="text-blue-600"> Training Platform</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Learn how to operate, troubleshoot and understand biomedical
            equipment through realistic interactive simulations.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl">
              Get Started
            </button>

            <button className="border border-blue-600 text-blue-600 px-7 py-3 rounded-xl hover:bg-blue-50">
              Explore Equipment
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={HeroImage}
            alt="Medical Equipment"
            className="rounded-3xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;