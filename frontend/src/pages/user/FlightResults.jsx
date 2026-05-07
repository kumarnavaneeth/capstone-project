import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plane, ArrowRight, Clock, MapPin, IndianRupee, MoveLeft } from "lucide-react";

function FlightResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights, passengers, searchCriteria } = location.state || { flights: [], passengers: 1, searchCriteria: {} };

  const handleBooking = (flight) => {
    const token = localStorage.getItem("token");
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");

    if (!token || roles.includes("ADMIN")) {
      navigate("/login", {
        state: {
          redirectTo: "/booking",
          flight,
          passengers,
        },
      });
      return;
    }

    navigate("/booking", {
      state: {
        flight,
        passengers,
      },
    });
  };

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <button 
            onClick={() => navigate("/")} 
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-2 transition-colors"
          >
            <MoveLeft className="mr-2 h-4 w-4" /> Back to Search
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Available Flights</h1>
        </div>
        
        <div className="bg-card border rounded-xl px-6 py-3 shadow-sm">
          <div className="flex items-center gap-3 font-semibold text-foreground">
            <span className="text-primary">{searchCriteria.source}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary">{searchCriteria.destination}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {searchCriteria.date} • {passengers} Passenger(s)
          </div>
        </div>
      </div>

      {flights.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card border border-dashed rounded-3xl">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Plane className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">No flights found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find any flights for your selected criteria.</p>
          <button 
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Modify Search
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {flights.map((f, i) => {
            const priceNum = f.price || 0;
            
            const formatTime = (t) => {
              if (!t) return "--:--";
              try {
                return new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
              } catch (e) {
                return t;
              }
            };

            return (
              <div 
                key={i} 
                className="group relative bg-card border rounded-2xl p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Plane className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-foreground">{f.airline}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{f.flightNumber}</p>
                      </div>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 bg-muted rounded w-fit">
                      {f.aircraftType || "Boeing 737"}
                    </div>
                  </div>

                  <div className="flex-[2] flex items-center justify-between gap-4">
                    <div className="text-center md:text-right">
                      <div className="text-2xl font-black tabular-nums">{formatTime(f.departureTime)}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground justify-center md:justify-end">
                        <MapPin className="h-3 w-3" /> {f.source}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Direct
                      </div>
                      <div className="relative w-full h-px bg-muted">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2">
                          <Plane className="h-4 w-4 text-primary rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <div className="text-2xl font-black tabular-nums">{formatTime(f.arrivalTime)}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground justify-center md:justify-start">
                        <MapPin className="h-3 w-3" /> {f.destination}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:pl-8 lg:border-l">
                    <div className="text-right">
                      <div className="text-3xl font-black text-foreground flex items-center">
                        <IndianRupee className="h-5 w-5 mr-0.5" />
                        {priceNum.toLocaleString()}
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Per person</p>
                    </div>
                    <button 
                      onClick={() => handleBooking(f)} 
                      className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FlightResults;
