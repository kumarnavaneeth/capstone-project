import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, MapPin, Calendar, Search, AlertCircle } from "lucide-react";
import { airports } from "../../data/airports";
import flightService from "../../services/flightService";

function SearchFlights() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!source || !destination || !date) {
      setError("Please fill in all fields to search for flights.");
      return;
    }

    setLoading(true);
    try {
      const response = await flightService.searchFlights({
        source,
        destination,
        travelDate: date,
      });

      navigate("/results", {
        state: {
          flights: response.data,
          searchCriteria: { source, destination, date }
        }
      });
    } catch (error) {
      console.error("Search failed:", error);
      setError("Failed to fetch flights. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
            Where to next?
          </h1>
          <p className="text-xl text-muted-foreground">
            Find the best deals on flights to your favorite destinations.
          </p>
        </div>

        <div className="bg-card border rounded-2xl shadow-xl p-6 md:p-10">
          {error && (
            <div className="mb-6 flex items-center gap-2 p-4 text-sm font-medium text-destructive bg-destructive/10 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> From
              </label>
              <select 
                value={source} 
                onChange={(e) => setSource(e.target.value)} 
                className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <option value="">Select Origin</option>
                {airports.map((a, i) => (
                  <option key={i} value={a.code}>
                    {a.city} ({a.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> To
              </label>
              <select 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <option value="">Select Destination</option>
                {airports
                  .filter((a) => a.code !== source)
                  .map((a, i) => (
                    <option key={i} value={a.code}>
                      {a.city} ({a.code})
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" /> Departure Date
              </label>
              <input
                type="date"
                className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="md:col-span-3 pt-4">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Search className="h-5 w-5 animate-spin" /> Searching...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="h-5 w-5" /> Search Flights
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all">
            <div className="p-3 rounded-full bg-primary/10">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Wide Selection</h3>
            <p className="text-sm text-muted-foreground">Compare flights from hundreds of airlines worldwide.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all">
            <div className="p-3 rounded-full bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Direct Routes</h3>
            <p className="text-sm text-muted-foreground">Find the fastest connections to your target city.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all">
            <div className="p-3 rounded-full bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Flexible Dates</h3>
            <p className="text-sm text-muted-foreground">Easily adjust your travel plans with our simple search.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFlights;
