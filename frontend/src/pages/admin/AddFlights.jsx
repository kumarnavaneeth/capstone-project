import React, { useState } from "react";
import { Plane, MapPin, Calendar, IndianRupee, Users, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { airports } from "../../data/airports";
import flightService from "../../services/flightService";

function AddFlight() {
  const navigate = useNavigate();
  const [flight, setFlight] = useState({
    airlineName: "",
    flightNumber: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    businessClassSeats: 0,
    nonBusinessClassSeats: 0,
    ticketPrice: 0,
    aircraftType: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({
      ...flight,
      [name]: name.includes("Seats") || name === "ticketPrice" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await flightService.addFlight(flight);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setFlight({
        airlineName: "",
        flightNumber: "",
        source: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        businessClassSeats: 0,
        nonBusinessClassSeats: 0,
        ticketPrice: 0,
        aircraftType: "",
      });
    } catch (error) {
      console.error("Failed to add flight:", error);
      setError("Failed to add flight schedule. Please check all fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate("/admin/dashboard")} 
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Add New Flight</h1>
          <p className="text-muted-foreground">Schedule a new flight in the system database.</p>
        </div>
      </div>

      <div className="bg-card border rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-primary/5 p-6 border-b">
          <h3 className="font-bold flex items-center gap-2 text-primary">
            <Plane className="h-5 w-5" /> Flight Information
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="flex items-center gap-2 p-4 text-sm font-medium text-destructive bg-destructive/10 rounded-xl">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-4 text-sm font-medium text-green-600 bg-green-500/10 rounded-xl">
              <CheckCircle2 className="h-5 w-5" />
              <span>Flight schedule added successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Airline Name</label>
              <input 
                name="airlineName" 
                value={flight.airlineName} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Air India" 
                className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Flight Number</label>
              <input 
                name="flightNumber" 
                value={flight.flightNumber} 
                onChange={handleChange} 
                required 
                placeholder="e.g. AI-101" 
                className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Aircraft Type</label>
              <input 
                name="aircraftType" 
                value={flight.aircraftType} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Boeing 737" 
                className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Ticket Price (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="number" 
                  name="ticketPrice" 
                  value={flight.ticketPrice} 
                  onChange={handleChange} 
                  required 
                  className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Source City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <select 
                  name="source" 
                  value={flight.source} 
                  onChange={handleChange} 
                  required 
                  className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                >
                  <option value="">Select Source</option>
                  {airports.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Destination City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <select 
                  name="destination" 
                  value={flight.destination} 
                  onChange={handleChange} 
                  required 
                  className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                >
                  <option value="">Select Destination</option>
                  {airports.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Departure Time</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="datetime-local" 
                  name="departureTime" 
                  value={flight.departureTime} 
                  onChange={handleChange} 
                  required 
                  className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Arrival Time</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="datetime-local" 
                  name="arrivalTime" 
                  value={flight.arrivalTime} 
                  onChange={handleChange} 
                  required 
                  className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Business Class Capacity</label>
              <div className="relative">
                <Users className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="number" 
                  name="businessClassSeats" 
                  value={flight.businessClassSeats} 
                  onChange={handleChange} 
                  required 
                  className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Economy Class Capacity</label>
              <div className="relative">
                <Users className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="number" 
                  name="nonBusinessClassSeats" 
                  value={flight.nonBusinessClassSeats} 
                  onChange={handleChange} 
                  required 
                  className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Saving Flight Schedule..." : "Add Flight Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFlight;
