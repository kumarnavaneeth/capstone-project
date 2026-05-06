import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FlightResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights, passengers, searchCriteria } = location.state || { flights: [], passengers: 1, searchCriteria: {} };

  const handleBooking = (flight) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role === "ADMIN") {
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
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#003580", margin: 0 }}>Available Flights</h1>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: "600", color: "#555" }}>{searchCriteria.source} → {searchCriteria.destination}</div>
            <div style={{ fontSize: "14px", color: "#777" }}>{searchCriteria.date} • {passengers} Passenger(s)</div>
          </div>
        </div>

        {flights.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", backgroundColor: "white", borderRadius: "12px" }}>
            <h2 style={{ color: "#888" }}>No flights found</h2>
            <button 
              onClick={() => navigate("/")}
              style={{ marginTop: "20px", color: "#003580", background: "none", border: "1px solid #003580", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}
            >
              Modify Search
            </button>
          </div>
        ) : (
          flights.map((f, i) => {
            const priceNum = f.price || 0;
            
            const formatTime = (t) => {
              if (!t) return "--:--";
              try {
                return new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              } catch (e) {
                return t;
              }
            };

            return (
              <div key={i} style={flightCardStyle}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#003580" }}>{f.airline}</div>
                  <div style={{ marginTop: "5px", color: "#666" }}>{f.flightNumber}</div>
                  <div style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>{f.aircraftType}</div>
                </div>

                <div style={{ flex: 2, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>{formatTime(f.departureTime)}</div>
                    <div style={{ color: "#777" }}>{f.source}</div>
                  </div>
                  
                  <div style={{ flex: 1, position: "relative" }}>
                    <div style={{ borderBottom: "2px dashed #ccc", marginBottom: "5px" }}></div>
                    <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", backgroundColor: "white", padding: "0 5px" }}>✈</div>
                  </div>

                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>{formatTime(f.arrivalTime)}</div>
                    <div style={{ color: "#777" }}>{f.destination}</div>
                  </div>
                </div>

                <div style={{ flex: 1, textAlign: "right", borderLeft: "1px solid #eee", paddingLeft: "30px" }}>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>₹{priceNum.toLocaleString()}</div>
                  {/* <div style={{ fontSize: "13px", color: "#777", marginBottom: "15px" }}>Total: ₹{total.toLocaleString()}</div> */}
                  <button onClick={() => handleBooking(f)} style={bookBtnStyle}>Book Now</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const flightCardStyle = {
  display: "flex",
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  marginBottom: "20px",
  alignItems: "center",
  transition: "transform 0.2s",
};

const bookBtnStyle = {
  backgroundColor: "#003580",
  color: "white",
  border: "none",
  padding: "10px 24px",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
  width: "100%",
  boxShadow: "0 4px 10px rgba(0,53,128,0.2)"
};

export default FlightResults;
