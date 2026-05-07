import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import flightService from "../../services/flightService";

function RegisterAirline() {
  const [airline, setAirline] = useState({
    airlineName: "",
    contactNumber: "",
    headquarters: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setAirline({ ...airline, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await flightService.registerAirline(airline);
      setSuccess(true);
      setAirline({ airlineName: "", contactNumber: "", headquarters: "" });
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register airline. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <AdminNavbar />
      <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "auto" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <h2 style={{ color: "#003580", marginBottom: "30px", textAlign: "center" }}>Register New Airline</h2>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Airline Name</label>
              <input 
                name="airlineName" 
                placeholder="e.g. Indigo" 
                value={airline.airlineName} 
                onChange={handleChange} 
                required 
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Contact Number</label>
              <input 
                name="contactNumber" 
                placeholder="e.g. 1234567890" 
                value={airline.contactNumber} 
                onChange={handleChange} 
                required 
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Office Address</label>
              <textarea 
                name="headquarters" 
                placeholder="e.g. Delhi Airport, Terminal 3" 
                value={airline.headquarters} 
                onChange={handleChange} 
                required 
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              />
            </div>

            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Registering..." : "Register Airline"}
            </button>
          </form>

          {success && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#d4edda", color: "#155724", borderRadius: "8px", textAlign: "center" }}>
              Airline registered successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#555" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "15px", outline: "none" };
const btnStyle = { padding: "15px", backgroundColor: "#003580", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "opacity 0.2s" };

export default RegisterAirline;
