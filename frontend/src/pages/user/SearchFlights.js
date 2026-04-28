import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { airports } from "../../data/airports";

function SearchFlights() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!source || !destination || !date) {
      alert("Please fill all fields");
      return;
    }

    if (source === destination) {
      alert("Source and destination cannot be the same");
      return;
    }

    setShowResults(true);
  };

  const flights = [
    { airline: "IndiGo", from: source, to: destination, depart: "06:00", arrive: "07:30", duration: "1h 30m", price: "₹4,399" },
    { airline: "Air India", from: source, to: destination, depart: "09:00", arrive: "10:45", duration: "1h 45m", price: "₹4,199" },
    { airline: "SpiceJet", from: source, to: destination, depart: "18:00", arrive: "19:30", duration: "1h 30m", price: "₹4,599" }
  ];

  return (
    <div style={{ marginTop: "60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "90%", maxWidth: "1000px", backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center" }}>Search Flights</h2>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "15px", marginTop: "20px", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div>
            <label style={{ fontWeight: "600" }}>From</label><br />
            <select value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="">Source</option>
              {airports.map((a, i) => (
                <option key={i} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "600" }}>To</label><br />
            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value="">Destination</option>
              {airports.map((a, i) => (
                <option key={i} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "600" }}>Departure</label><br />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontWeight: "600" }}>Passengers</label><br />
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button type="button" onClick={() => setPassengers((p) => Math.max(1, p - 1))}>−</button>
              <span>{passengers}</span>
              <button type="button" onClick={() => setPassengers((p) => p + 1)}>+</button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#003580",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {showResults && (
        <div style={{ width: "90%", maxWidth: "1000px", marginTop: "30px" }}>
          {flights.map((f, i) => {
            const total = passengers * parseInt(f.price.replace(/[₹,]/g, ""));
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px",
                  marginBottom: "15px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
              >
                <div style={{ width: "20%", fontSize: "18px", fontWeight: "600" }}>
                  {f.airline}
                </div>

                <div style={{ width: "50%", textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: "600" }}>
                    {f.from} → {f.to}
                  </div>

                  <div style={{ margin: "8px 0", color: "#555" }}>
                    ───────── ✈ ─────────
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <div>
                      <div>{f.depart}</div>
                      <div>{f.from}</div>
                    </div>

                    <div>
                      <div>{f.arrive}</div>
                      <div>{f.to}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: "5px", fontSize: "13px", color: "gray" }}>
                    {f.duration}
                  </div>
                </div>

                <div style={{ width: "25%", textAlign: "right" }}>
                  <div style={{ fontSize: "18px", fontWeight: "600" }}>
                    ₹{f.price.replace(/[₹,]/g, "")}
                  </div>

                  <div style={{ fontSize: "13px", color: "gray" }}>
                    ₹{total.toLocaleString()} total
                  </div>

                  <button
                    onClick={() => navigate("/booking")}
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      backgroundColor: "#003580",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchFlights;