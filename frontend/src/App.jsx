import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import ProfileSetup from "./ProfileSetup";
import Browse from "./Browse";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"; // ✅ Step 1: Import Hero

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

        <Routes>
          {/* ✅ Step 2: Add route for Hero as homepage */}
          <Route path="/" element={<Hero />} />

          {/* Step 3: Keep all your existing routes */}
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

