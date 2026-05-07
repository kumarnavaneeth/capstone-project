import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Download, XCircle, Plane, User, Calendar, Ticket, Info, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import toast from "react-hot-toast";
import bookingService from "../../services/bookingService";
import flightService from "../../services/flightService";

function TicketView() {
  const { pnr } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const componentRef = useRef(null);

  useEffect(() => {
    fetchBooking();
  }, [pnr]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await bookingService.getTicketByPnr(pnr);
      
      if (!res.data) {
        setError("Ticket not found");
        return;
      }

      const bookingData = { ...res.data };
      const flightId = bookingData.flightId || bookingData.flight_id;

      if (flightId) {
        try {
          const flightRes = await flightService.getFlightById(flightId);
          const flightData = flightRes.data;
        
          setBooking({
            ...bookingData,
            source: flightData.source || flightData.from,
            destination: flightData.destination || flightData.to,
            airline: flightData.airline,
            flightNumber: flightData.flightNumber,
            departureTime: flightData.departureTime,
            arrivalTime: flightData.arrivalTime
          });
        } catch (flightErr) {
          console.error("Failed to fetch flight details:", flightErr);
          setBooking(bookingData);
        }
      } else {
        setBooking(bookingData);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load ticket information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });
  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await bookingService.cancelBooking(booking.pnr);
      toast.success("Booking cancelled successfully!");
      fetchBooking();
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error(`Failed to cancel booking: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium text-muted-foreground">Retrieving your ticket...</p>
    </div>
  );

  if (error || !booking) return (
    <div className="flex flex-col items-center justify-center py-20">
      <XCircle className="h-12 w-12 text-destructive mb-4" />
      <p className="text-xl font-bold text-foreground">{error || "Ticket not found"}</p>
      <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">Return to Search</button>
    </div>
  );

  const isCancelled = booking.status === "CANCELLED";

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          {isCancelled ? (
            <div className="p-3 rounded-full bg-destructive/10">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          ) : (
            <div className="p-3 rounded-full bg-green-500/10">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          {isCancelled ? "Booking Cancelled" : "Booking Confirmed"}
        </h1>
        <p className="text-muted-foreground">
          {isCancelled 
            ? "Your booking has been cancelled. Refund processing might take 5-7 business days." 
            : "Thank you for booking with us. Your journey begins here!"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-muted">
            <Ticket className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">PNR Number</p>
            <p className="text-2xl font-black tabular-nums">{booking.pnr}</p>
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-muted">
            <Info className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</p>
            <p className={`text-xl font-bold ${isCancelled ? "text-destructive" : "text-green-500"}`}>
              {booking.status}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4" ref={componentRef}>
        <h3 className="text-xl font-bold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" /> Passenger Tickets
        </h3>
        {booking.passengers?.map((p, index) => (
          <div
            key={index}
            className={`relative overflow-hidden bg-card border rounded-2xl shadow-md transition-all ${isCancelled ? "opacity-70 grayscale-[0.5] border-destructive/20" : ""}`}
          >
            <div className="flex flex-col md:flex-row">
              <div className={`md:w-32 flex items-center justify-center font-black text-white p-4 md:p-0 ${booking.isBusinessClass ? "bg-amber-500" : "bg-primary"}`}>
                <span className="md:-rotate-90 md:whitespace-nowrap">
                  {booking.isBusinessClass ? "BUSINESS" : "ECONOMY"}
                </span>
              </div>

              <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-left">
                    <p className="text-xs font-bold text-muted-foreground">FROM</p>
                    <p className="text-xl font-black">{booking.source || "N/A"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Plane className="h-5 w-5 text-primary mb-1 rotate-90" />
                    <div className="w-20 h-px bg-muted"></div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-muted-foreground">TO</p>
                    <p className="text-xl font-black">{booking.destination || "N/A"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-dashed">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Passenger</p>
                    <p className="font-bold text-sm">{p.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Gender</p>
                    <p className="font-bold text-sm">{p.gender}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Meal</p>
                    <p className="font-bold text-sm">{p.mealType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Age</p>
                    <p className="font-bold text-sm">{p.age}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-center border-t border-dashed pt-4">
                  <Barcode 
                    value={`${booking.pnr}-${p.name}`} 
                    width={1.5} 
                    height={50} 
                    fontSize={12} 
                    background="transparent"
                  />
                </div>
              </div>
            </div>
            {isCancelled && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-4 border-destructive text-destructive text-4xl font-black px-6 py-2 rotate-[-15deg] opacity-40">
                  CANCELLED
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
        <button
          onClick={() => handlePrint()}
          className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-green-700 active:scale-95"
        >
          <Printer className="mr-2 h-4 w-4" /> Print Ticket
        </button>

        {!isCancelled && (
          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center rounded-xl bg-destructive px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-destructive/90 active:scale-95"
          >
            <XCircle className="mr-2 h-4 w-4" /> Cancel Booking
          </button>
        )}

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-6 py-3 text-sm font-bold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
        >
          Book Another
        </button>
      </div>

      <p className="text-center text-sm font-medium italic text-muted-foreground">
        Wish you a safe and pleasant flight ✈
      </p>
    </div>
  );
}

export default TicketView;
