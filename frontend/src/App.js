import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AddFlight from "./pages/Admin/AddFlights";
import RegisterAirline from "./pages/Admin/RegisterAirline";

import SearchFlights from "./pages/user/SearchFlights";
import FlightResults from "./pages/user/FlightResults";
import BookingPage from "./pages/user/BookingPage";
import TicketView from "./pages/user/TicketView";
import BookingHistory from "./pages/user/BookingHistory";

import ProtectedRoute from "./components/ProtectedRoute";

function Navbar() {
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  return (
    <nav
      style={{
        padding: "15px 30px",
        backgroundColor: "#003580",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "18px" }}>
          FlightApp
        </Link>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "14px", opacity: 0.9 }}>
          Search Flights
        </Link>
        {token && roles.includes("USER") && ( 
          <Link to="/booking/history" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
            My Bookings
          </Link>
        )}

        {token && roles.includes("ADMIN") && ( 
          <Link to="/admin/dashboard" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>
            Admin Dashboard
          </Link>
        )}
      </div>


      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {!token ? (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
              Signup
            </Link>
          </>
        ) : (
          <>
            <span style={{ fontSize: "14px", color: "#ddd" }}>
              Welcome, <strong style={{ color: "white" }}>{userEmail || "User"}</strong>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("roles");
                localStorage.removeItem("userEmail");
                window.location.href = "/login";
              }}
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px"
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SearchFlights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/results" element={<FlightResults />} />

          {/* User Protected Routes */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute requiredRole="USER">
                <BookingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ticket/:pnr"
            element={
              <ProtectedRoute requiredRole="USER">
                <TicketView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/history"
            element={
              <ProtectedRoute requiredRole="USER">
                <BookingHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-flights"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AddFlight />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/register-airline"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <RegisterAirline />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;