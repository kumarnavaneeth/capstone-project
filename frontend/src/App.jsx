import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Plane, History, LayoutDashboard, LogOut, LogIn, UserPlus } from "lucide-react";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AddFlight from "./pages/admin/AddFlights";
import RegisterAirline from "./pages/admin/RegisterAirline";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold text-xl tracking-tight text-primary">FlightApp</span>
          </Link>
          
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2">
              <Plane className="h-4 w-4" /> Search
            </Link>
            {token && roles.includes("USER") && (
              <Link to="/booking/history" className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2">
                <History className="h-4 w-4" /> My Bookings
              </Link>
            )}
            {token && roles.includes("ADMIN") && (
              <Link to="/admin/dashboard" className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" /> Admin
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!token ? (
            <div className="flex items-center gap-2">
              <Link to="/login" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Link>
              <Link to="/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                <UserPlus className="mr-2 h-4 w-4" /> Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block text-sm text-muted-foreground">
                Welcome, <span className="font-semibold text-foreground">{userEmail || "User"}</span>
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <div className="container py-6">
            <Routes>
              <Route path="/" element={<SearchFlights />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/results" element={<FlightResults />} />

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
        </main>
        <footer className="border-t py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; 2026 FlightApp. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
