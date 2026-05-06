import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { airports } from "../../data/airports";
import flightService from "../../services/flightService";

function AddFlight() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({
      ...flight,
      [name]: name.includes("Seats") || name === "ticketPrice" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await flightService.addFlight(flight);
      setSuccess(true);
      // Reset form
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
      alert("Failed to add flight. Please check all fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <AdminNavbar />
      <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "auto" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <h2 style={{ color: "#003580", marginBottom: "30px", textAlign: "center" }}>Add New Flight Schedule</h2>
          
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={fullWidth}>
              <label style={labelStyle}>Airline Name</label>
              <input name="airlineName" value={flight.airlineName} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Flight Number</label>
              <input name="flightNumber" value={flight.flightNumber} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Aircraft Type</label>
              <input name="aircraftType" value={flight.aircraftType} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Source</label>
              <select name="source" value={flight.source} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Source</option>
                {airports.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Destination</label>
              <select name="destination" value={flight.destination} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Destination</option>
                {airports.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Departure Time</label>
              <input type="datetime-local" name="departureTime" value={flight.departureTime} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Arrival Time</label>
              <input type="datetime-local" name="arrivalTime" value={flight.arrivalTime} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Business Class Seats</label>
              <input type="number" name="businessClassSeats" value={flight.businessClassSeats} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Economy Class Seats</label>
              <input type="number" name="nonBusinessClassSeats" value={flight.nonBusinessClassSeats} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Ticket Price (₹)</label>
              <input type="number" name="ticketPrice" value={flight.ticketPrice} onChange={handleChange} required style={inputStyle} />
            </div>

            <div style={{ ...fullWidth, marginTop: "20px" }}>
              <button type="submit" disabled={loading} style={btnStyle}>
                {loading ? "Adding..." : "Add Flight Schedule"}
              </button>
            </div>
          </form>

          {success && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#d4edda", color: "#155724", borderRadius: "8px", textAlign: "center" }}>
              Flight schedule added successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const fullWidth = { gridColumn: "1 / -1" };
const labelStyle = { display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#555" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "15px", outline: "none" };
const btnStyle = { width: "100%", padding: "15px", backgroundColor: "#003580", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" };

export default AddFlight;
