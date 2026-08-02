import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            MedSim
          </h1>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">

          <Link
            className="hover:text-blue-600 transition"
            to="/"
          >
            Home
          </Link>

          <Link
            className="hover:text-blue-600 transition"
            to="/dashboard"
          >
            <Link to="/equipment">Equipment</Link>
          </Link>

          <Link
            className="hover:text-blue-600 transition"
            to="/login"
          >
            Login
          </Link>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Register
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;