import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ManageAirlines from "./pages/Admin/ManageAirlines";
import AddFlight from "./pages/Admin/AddFlights";
import SearchFlights from "./pages/user/SearchFlights";
import BookingPage from "./pages/user/BookingPage";
import TicketView from "./pages/user/TicketView";
import BookingHistory from "./pages/user/BookingHistory";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px 30px",
        backgroundColor: "#003580",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>
          Search Flights
        </Link>

        <Link to="/history" style={{ color: "white", marginRight: "15px" }}>
          Booking History
        </Link>

        <Link to="/login" style={{ color: "white", marginRight: "15px" }}>
          Login
        </Link>

        <Link to="/signup" style={{ color: "white", marginRight: "15px" }}>
          Signup
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<SearchFlights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/airlines" element={<ManageAirlines />} />
        <Route path="/admin/add-flights" element={<AddFlight />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/ticket" element={<TicketView />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;