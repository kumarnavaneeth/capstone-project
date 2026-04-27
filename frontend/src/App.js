import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLogin from "./pages/Admin/AdminLogin"; 

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Flights Search Page</h1>
    </div>
  );
}
function Navbar() {
  return (
    <nav
      style={{
        padding: "15px 30px",
        backgroundColor: "#003580",
        color: "white",
      }}
    >
   <Link to="/login" style={{ color: "white", marginRight: "15px" }}>
        Login
      </Link>
      <Link to="/signup" style={{ color: "white", marginRight: "15px" }}>
        Signup
      </Link>
      <Link to="/admin/login" style={{ color: "white" }}>
        Admin Login
      </Link>
    </nav>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
