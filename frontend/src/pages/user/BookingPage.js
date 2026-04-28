import { useLocation } from "react-router-dom";
import { useState } from "react";

function BookingPage() {
  const location = useLocation();
  
  const { flight, passengers } = location.state || {};

  const [count, setCount] = useState(passengers || 1);

  const [details, setDetails] = useState(
    Array.from({ length: passengers || 1 }, () => ({
      firstName: "",
      lastName: "",
      gender: "",
      meal: ""
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...details];
    updated[index][field] = value;
    setDetails(updated);
  };

  const price = Number(flight?.price.replace(/[₹,]/g, "")) || 0;
  const total = price * count;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h2>Booking Details</h2>

      <h3>{flight?.airline}</h3>
      <p>{flight?.from} → {flight?.to}</p>

      <div style={{ margin: "20px 0" }}>
        <label>Passengers</label><br />
        <button onClick={() => setCount(c => Math.max(1, c - 1))}>−</button>
        <span style={{ margin: "0 10px" }}>{count}</span>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>

      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px" }}>
          <h4>Passenger {i + 1}</h4>

          <input
            placeholder="First Name"
            onChange={(e) => handleChange(i, "firstName", e.target.value)}
          />

          <input
            placeholder="Last Name"
            onChange={(e) => handleChange(i, "lastName", e.target.value)}
          />

          <br /><br />

          <select onChange={(e) => handleChange(i, "gender", e.target.value)}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>

          <select onChange={(e) => handleChange(i, "meal", e.target.value)}>
            <option value="">Meal</option>
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <h3>₹{price}</h3>
        <h2>₹{total.toLocaleString()} total</h2>
      </div>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#003580",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingPage;