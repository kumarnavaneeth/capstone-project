import { useState } from "react";
import { airports } from "../../data/airports";
function AddFlight() {
  const [flight, setFlight] = useState({
    airline: "",
    source: "",
    destination: "",
    departureTime: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFlight({
      ...flight,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingFlights =
      JSON.parse(localStorage.getItem("flights")) || [];

    const updatedFlights = [
      ...existingFlights,
      {
        id: Date.now(),
        ...flight,
      },
    ];

    localStorage.setItem("flights", JSON.stringify(updatedFlights));

    setShowPopup(true);

    setFlight({
      airline: "",
      source: "",
      destination: "",
      departureTime: "",
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Add Flight</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="airline"
          placeholder="Airline Name"
          value={flight.airline}
          onChange={handleChange}
          required
        />
        <br /><br />

<select
  name="source"
  value={flight.source}
  onChange={handleChange}
  required
>
  <option value="">Select Source Airport</option>
  {airports.map((airport) => (
    <option key={airport.code} value={airport.code}>
      {airport.name} ({airport.code})
    </option>
  ))}
</select>

<br /><br />

<select
  name="destination"
  value={flight.destination}
  onChange={handleChange}
  required
>
  <option value="">Select Destination Airport</option>
  {airports
    .filter((airport) => airport.code !== flight.source)
    .map((airport) => (
      <option key={airport.code} value={airport.code}>
        {airport.name} ({airport.code})
      </option>
    ))}
</select>
    
     <input
          type="datetime-local"
          name="departureTime"
          value={flight.departureTime}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Flight</button>
      </form>

      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>Success</h3>
            <p>Flight added successfully!</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const popupStyle = {
  backgroundColor: "white",
  padding: "25px 30px",
  borderRadius: "6px",
  minWidth: "300px",
  textAlign: "center",
};

export default AddFlight;
