import React, { useState } from "react";
import { Building2, Phone, MapPin, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import flightService from "../../services/flightService";

function RegisterAirline() {
  const navigate = useNavigate();
  const [airline, setAirline] = useState({
    airlineName: "",
    contactNumber: "",
    headquarters: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAirline({ ...airline, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await flightService.registerAirline(airline);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setAirline({ airlineName: "", contactNumber: "", headquarters: "" });
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Failed to register airline partner. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate("/admin/dashboard")} 
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Register Airline</h1>
          <p className="text-muted-foreground">Partner with us to list your flights in our system.</p>
        </div>
      </div>

      <div className="bg-card border rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-primary/5 p-6 border-b">
          <h3 className="font-bold flex items-center gap-2 text-primary">
            <Building2 className="h-5 w-5" /> Partnership Details
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-4 text-sm font-medium text-destructive bg-destructive/10 rounded-xl">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-4 text-sm font-medium text-green-600 bg-green-500/10 rounded-xl">
              <CheckCircle2 className="h-5 w-5" />
              <span>Airline partner registered successfully!</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold">Airline Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input 
                name="airlineName" 
                placeholder="e.g. Indigo Airlines" 
                value={airline.airlineName} 
                onChange={handleChange} 
                required 
                className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Contact Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input 
                name="contactNumber" 
                placeholder="e.g. +91 9876543210" 
                value={airline.contactNumber} 
                onChange={handleChange} 
                required 
                className="flex h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Headquarters / Office Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <textarea 
                name="headquarters" 
                placeholder="Full office address..." 
                value={airline.headquarters} 
                onChange={handleChange} 
                required 
                className="flex min-h-[100px] w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 resize-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Registering Partner..." : "Register Airline Partner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterAirline;
