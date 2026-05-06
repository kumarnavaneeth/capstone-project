import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import bookingService from "../../services/bookingService";

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers } = location.state || {};

  const [count, setCount] = useState(passengers || 1);
  const [loading, setLoading] = useState(false);
  const [isBusinessClass, setIsBusinessClass] = useState(false);
  const [details, setDetails] = useState(
    Array.from({ length: passengers || 1 }, () => ({
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
    for (let passenger of details) {
      if (!passenger.name || !passenger.age || !passenger.gender || !passenger.mealType) {
        alert("Please fill all passenger details");
        return;
      }
    }

    setLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.userId || 1;
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
        alert("Booking failed: No PNR received");
        return;
      }

      navigate(`/ticket/${pnr}`);

    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to confirm booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!flight) return <div style={{ padding: 40 }}>No flight selected.</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2 style={{ color: "#003580", fontSize: "28px", marginBottom: "20px" }}>Confirm Your Booking</h2>

      {/* Flight Summary */}
      <div style={{ backgroundColor: "#f0f4f8", padding: "30px", borderRadius: "15px", marginBottom: "30px", textAlign: "left" }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#003580" }}>{flight.airline}</h3>
        <p style={{ fontSize: "18px", margin: "5px 0" }}>
          <strong>{flight.source}</strong> → <strong>{flight.destination}</strong>
        </p>
        <p style={{ color: "#666" }}>Flight Number: {flight.flightNumber}</p>
        <div style={{ borderTop: "1px solid #ddd", marginTop: "20px", paddingTop: "20px", fontSize: "20px", fontWeight: "bold", color: "#003580" }}>
          Price: {flight.price}
        </div>
      </div>

      {/* Seat Type - common for all passengers */}
      <div style={{ backgroundColor: "#f0f4f8", padding: "20px", borderRadius: "15px", marginBottom: "20px", textAlign: "left" }}>
        <h4>Seat Type (applies to all passengers)</h4>
        <select
          value={isBusinessClass}
          onChange={(e) => setIsBusinessClass(e.target.value === "true")}
          style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
        >
          <option value="false">Economy Class</option>
          <option value="true">Business Class</option>
        </select>
      </div>

      {/* Passenger Count */}
      <div style={{ marginBottom: "20px" }}>
        <label><strong>Passengers</strong></label><br /><br />
        <button onClick={() => {
          setCount(c => Math.max(1, c - 1));
          setDetails(d => d.slice(0, Math.max(1, d.length - 1)));
        }}>−</button>
        <span style={{ margin: "0 15px", fontSize: "18px" }}>{count}</span>
        <button onClick={() => {
          setCount(c => c + 1);
          setDetails(d => [...d, { name: "", age: "", gender: "", mealType: "" }]);
        }}>+</button>
      </div>

      {/* Passenger Details */}
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ backgroundColor: "#f0f4f8", padding: "20px", borderRadius: "15px", marginBottom: "20px", textAlign: "left" }}>
          <h4>Passenger {i + 1}</h4>

          <input
            placeholder="Full Name"
            value={details[i]?.name || ""}
            onChange={(e) => handleChange(i, "name", e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />

          <input
            placeholder="Age"
            type="number"
            min="1"
            value={details[i]?.age || ""}
            onChange={(e) => handleChange(i, "age", e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />

          <select
            value={details[i]?.gender || ""}
            onChange={(e) => handleChange(i, "gender", e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          >
            <option value="">Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHERS">Others</option>
          </select>

          <select
            value={details[i]?.mealType || ""}
            onChange={(e) => handleChange(i, "mealType", e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
          >
            <option value="">Select Meal</option>
            <option value="VEG">Veg</option>
            <option value="NON_VEG">Non-Veg</option>
          </select>
        </div>
      ))}

      {/* Price Summary */}
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#003580", marginBottom: "20px" }}>
        <p>Price per person: ₹{price.toLocaleString()}</p>
        <p>Total: ₹{total.toLocaleString()}</p>
      </div>

      
      <button
        onClick={handleConfirmBooking}
        disabled={loading}
        style={{
          padding: "15px 60px",
          backgroundColor: "#003580",
          color: "white",
          border: "none",
          borderRadius: "30px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,53,128,0.2)",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Processing..." : "Confirm Booking"}
      </button>

      <p style={{ marginTop: "20px", color: "#888", fontSize: "14px" }}>
        By clicking confirm, you agree to our terms and conditions.
      </p>
    </div>
  );
}

export default BookingPage;