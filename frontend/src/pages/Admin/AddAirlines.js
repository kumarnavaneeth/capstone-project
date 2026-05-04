import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
function AddAirlines({onAdd}) {
  const [airline, setAirline] = useState({
    name: "",
    contactNumber: "",
    address: "",
  });

  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    setAirline({
      ...airline, 
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {
  e.preventDefault();
  onAdd(airline); 
  setShowModal(true);
  setAirline({ name: "", contactNumber: "", address: "" });
    
  };

  return (
    <div style={{ marginTop: "60px", textAlign: "center" }}>
      <h2>Add Airlines</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Airline Name"
          value={airline.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={airline.contactNumber}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="address"
          placeholder="Contact Address"
          value={airline.address}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Airline</button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Success</h3>
            <p>Airline added successfully!</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAirlines;
