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
        {/* Always-visible navbar */}
        <div style={{ padding: "1rem", background: "#f0f0f0", textAlign: "center" }}>
          <Link to="/signup" style={{ margin: "0 10px", color: "#2563eb", textDecoration: "underline" }}>Signup</Link>
          <Link to="/login" style={{ margin: "0 10px", color: "#2563eb", textDecoration: "underline" }}>Login</Link>
          <Link to="/profile" style={{ margin: "0 10px", color: "#2563eb", textDecoration: "underline" }}>Profile</Link>
          <Link to="/browse" style={{ margin: "0 10px", color: "#2563eb", textDecoration: "underline" }}>Browse</Link>
        </div>

        {/* Route-based rendering */}
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

