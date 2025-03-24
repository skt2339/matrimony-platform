import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          ForeverShaadi 💚
        </Link>

        {/* Nav links */}
        <div className="space-x-4">
          <Link to="/browse" className="text-gray-700 hover:text-green-600 font-medium">
            Browse
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-green-600 font-medium">
            My Profile
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

