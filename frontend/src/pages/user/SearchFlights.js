import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { airports } from "../../data/airports";
import flightService from "../../services/flightService";

function SearchFlights() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!source || !destination || !date) {
      alert("Please fill all fields");
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
      alert("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "60px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh" }}>
      <div style={{ width: "90%", maxWidth: "1000px", backgroundColor: "white", padding: "40px", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <h1 style={{ textAlign: "center", color: "#003580", marginBottom: "30px", fontSize: "32px" }}>Where to next?</h1>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 200px" }}>
            <label style={labelStyle}>From</label><br />
            <select value={source} onChange={(e) => setSource(e.target.value)} style={selectStyle}>
              <option value="">Select Origin</option>
              {airports.map((a, i) => (
                <option key={i} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: "1 1 200px" }}>
            <label style={labelStyle}>To</label><br />
            <select value={destination} onChange={(e) => setDestination(e.target.value)} style={selectStyle}>
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

          <div style={{ flex: "1 1 200px" }}>
            <label style={labelStyle}>Departure Date</label><br />
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              style={selectStyle}
            />
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button type="submit" disabled={loading} style={submitBtnStyle}>
              {loading ? "Searching..." : "Search Flights"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle = { fontWeight: "600", fontSize: "14px", color: "#555", marginBottom: "8px", display: "inline-block" };
const selectStyle = { width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "15px", backgroundColor: "#f9f9f9" };
const ctrlBtnStyle = { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#003580", fontWeight: "bold" };
const submitBtnStyle = { padding: "15px 60px", backgroundColor: "#003580", color: "white", border: "none", borderRadius: "30px", cursor: "pointer", fontSize: "18px", fontWeight: "600", boxShadow: "0 4px 15px rgba(0,53,128,0.2)", opacity: "props => props.disabled ? 0.7 : 1" };

export default SearchFlights;