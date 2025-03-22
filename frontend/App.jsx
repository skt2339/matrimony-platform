import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import ProfileSetup from "./ProfileSetup";
import Browse from "./Browse";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="bg-gray-100 p-4 flex justify-center gap-6 shadow-md">
          <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
          <Link to="/browse" className="text-blue-600 hover:underline">Browse</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={isLoggedIn ? <ProfileSetup /> : <Navigate to="/login" />} />
          <Route path="/browse" element={isLoggedIn ? <Browse /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

