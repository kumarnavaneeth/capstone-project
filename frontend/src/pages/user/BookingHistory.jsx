import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { History, Plane, ExternalLink, Calendar, IndianRupee, AlertCircle, Trash2, ArrowRight } from "lucide-react";
import bookingService from "../../services/bookingService";
import flightService from "../../services/flightService";
 
function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchHistory();
  }, []);
 
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const res = await bookingService.getBookingHistory(userId);
      let history = res.data || [];
 
      // Enrich with flight details for each booking
      const enrichedHistory = await Promise.all(history.map(async (booking) => {
        if (!booking.flight && booking.flightId) {
          try {
            const flightRes = await flightService.getFlightById(booking.flightId);
            return { ...booking, flight: flightRes.data };
          } catch (e) {
            return booking;
          }
        }
        return booking;
      }));
 
      setBookings(enrichedHistory);
    } catch (err) {
      console.error(err);
      const saved = JSON.parse(localStorage.getItem("bookings")) || [];
      setBookings(saved);
      if (saved.length === 0) {
        setError("We couldn't retrieve your booking history.");
      }
    } finally {
      setLoading(false);
    }
  };
 
  const handleView = (pnr) => {
    if (!pnr) {
      alert("PNR missing for this booking.");
      return;
    }
    navigate(`/ticket/${pnr}`);
  };
 
  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <History className="h-8 w-8" /> Manage Bookings
          </h1>
          <p className="text-muted-foreground">View and manage your past and upcoming journeys.</p>
        </div>
      </div>
 
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading your travel history...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card border border-dashed rounded-3xl">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Plane className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No bookings found</h2>
          <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Search Flights
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => {
            const isCancelled = booking.status === "CANCELLED";
            const flightInfo = booking.flight || {};
           
            return (
              <div
                key={index}
                className={`group relative bg-card border rounded-2xl p-6 shadow-sm transition-all hover:shadow-md ${isCancelled ? "opacity-80" : "hover:border-primary/20"}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Plane className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{flightInfo.airline || "Airlines" }</h3>
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${isCancelled ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-600"}`}>
                    {booking.status || "BOOKED"}
                  </div>
                </div>
 
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground font-bold">FROM</span>
                      <span className="font-bold">{flightInfo.source || flightInfo.from}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-muted-foreground font-bold">TO</span>
                      <span className="font-bold">{flightInfo.destination || flightInfo.to}</span>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {booking.bookingDate || booking.booking_date || "N/A"}
                    </div>
                  </div>
                </div>
 
                <button
                  onClick={() => handleView(booking.pnr)}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-muted px-4 py-2.5 text-sm font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground group-hover:shadow-md"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
 
 
 
export default BookingHistory;
 
 