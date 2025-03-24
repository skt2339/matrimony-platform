import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import ProfileSetup from "./ProfileSetup";
import Browse from "./Browse";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        {/* Shared navbar on all pages */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={isLoggedIn ? <ProfileSetup /> : <Navigate to="/login" />}
          />
          <Route
            path="/browse"
            element={isLoggedIn ? <Browse /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

