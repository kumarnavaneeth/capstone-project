import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plane, Users, User, ArrowRight, ShieldCheck, CreditCard, Minus, Plus, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import bookingService from "../../services/bookingService";
 
function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers: initialPassengers } = location.state || {};
 
  const [count, setCount] = useState(initialPassengers || 1);
  const [loading, setLoading] = useState(false);
  const [isBusinessClass, setIsBusinessClass] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState(
    Array.from({ length: initialPassengers || 1 }, () => ({
      name: "",
      age: "",
      gender: "",
      mealType: "",
    }))
  );
 
  const handleChange = (index, field, value) => {
    const updated = [...details];
    updated[index][field] = value;
    setDetails(updated);
  };
 
  const price = Number(flight?.price?.toString().replace(/[₹,]/g, "")) || 0;
  const total = price * count;
 
  const handleConfirmBooking = async () => {
    setError("");
    for (let passenger of details) {
      if (!passenger.name || !passenger.age || !passenger.gender || !passenger.mealType) {
        setError("Please fill in all passenger details.");
        return;
      }
    }
 
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId") || 1;
      const flightId = flight?.id || flight?.flightId;
 
      const bookingData = {
        userId,
        isBusinessClass,
        passengers: details.map(p => ({
          name: p.name,
          age: parseInt(p.age),
          gender: p.gender,
          mealType: p.mealType,
        }))
      };
 
      const response = await bookingService.createBooking(flightId, bookingData);
 
      const pnr = response.data;
      if (!pnr) {
        const msg = "Booking failed: No PNR received from the server.";
        setError(msg);
        toast.error(msg);
        return;
      }
 
      toast.success("Booking confirmed!");
      navigate(`/ticket/${pnr}`);
    } catch (error) {
      console.error("Booking failed:", error);
      const msg = "Failed to confirm booking. Please check your connection and try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
 
  if (!flight) return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-xl font-semibold text-muted-foreground">No flight selected.</p>
      <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline underline-offset-4">Go back to search</button>
    </div>
  );
 
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-[2] space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Passenger Details</h2>
            <p className="text-muted-foreground">Please enter the details of all passengers travelling.</p>
          </div>
 
          {error && (
            <div className="flex items-center gap-2 p-4 text-sm font-medium text-destructive bg-destructive/10 rounded-xl">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
 
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-semibold">
                <Users className="h-5 w-5 text-primary" />
                <span>Number of Passengers</span>
              </div>
              <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-1">
                <button
                  onClick={() => {
                    setCount(c => Math.max(1, c - 1));
                    setDetails(d => d.slice(0, Math.max(1, d.length - 1)));
                  }}
                  className="p-2 hover:bg-background rounded-md transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold w-4 text-center">{count}</span>
                <button
                  onClick={() => {
                    setCount(c => c + 1);
                    setDetails(d => [...d, { name: "", age: "", gender: "", mealType: "" }]);
                  }}
                  className="p-2 hover:bg-background rounded-md transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
 
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Class Preference</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setIsBusinessClass(false)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${!isBusinessClass ? "border-primary bg-primary/5 font-bold" : "border-muted bg-transparent hover:border-muted-foreground/30"
                      }`}
                  >
                    Economy
                  </button>
                  <button
                    onClick={() => setIsBusinessClass(true)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${isBusinessClass ? "border-primary bg-primary/5 font-bold" : "border-muted bg-transparent hover:border-muted-foreground/30"
                      }`}
                  >
                    Business
                  </button>
                </div>
              </div>
            </div>
          </div>
 
          <div className="space-y-4">
            {details.map((_, i) => (
              <div key={i} className="bg-card border rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <User className="h-5 w-5 text-primary" />
                  <span>Passenger {i + 1}</span>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <input
                      placeholder="As shown in passport"
                      value={details[i]?.name || ""}
                      onChange={(e) => handleChange(i, "name", e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Age</label>
                    <input
                      placeholder="Years"
                      type="number"
                      min="1"
                      value={details[i]?.age || ""}
                      onChange={(e) => handleChange(i, "age", e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gender</label>
                    <select
                      value={details[i]?.gender || ""}
                      onChange={(e) => handleChange(i, "gender", e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>
 
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Meal Preference</label>
                    <select
                      value={details[i]?.mealType || ""}
                      onChange={(e) => handleChange(i, "mealType", e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    >
                      <option value="">Select Meal</option>
                      <option value="VEG">Vegetarian</option>
                      <option value="NON_VEG">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        <div className="flex-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-card border rounded-2xl p-6 shadow-md space-y-6">
              <h3 className="font-bold text-lg border-b pb-4">Order Summary</h3>
 
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-primary">{flight.airline}</p>
                    <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-1 font-bold">
                      {flight.source} <ArrowRight className="h-3 w-3" /> {flight.destination}
                    </div>
                  </div>
                </div>
 
                <div className="space-y-2 border-t pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fare (per person)</span>
                    <span>₹{price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passengers</span>
                    <span>x {count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Class</span>
                    <span>{isBusinessClass ? "Business" : "Economy"}</span>
                  </div>
                </div>
 
                <div className="flex justify-between items-center border-t pt-4 mt-4">
                  <span className="font-bold text-lg">Total Amount</span>
                  <span className="text-2xl font-black text-primary tabular-nums">₹{total.toLocaleString()}</span>
                </div>
              </div>
 
              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
 
              <div className="flex items-center justify-center gap-4 pt-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-green-500" /> Secure
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" /> Payment
                </div>
              </div>
            </div>
 
            <p className="text-center text-[10px] text-muted-foreground">
              By clicking confirm, you agree to our <span className="underline">Terms and Conditions</span> and <span className="underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookingPage;
 
 