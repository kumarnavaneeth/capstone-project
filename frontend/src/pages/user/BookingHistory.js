import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);
 
  const handleView = (booking) => {
    if(!booking.pnr){
        alert("PNR missing!");
        return;
    }
    navigate(`/ticket/${booking.pnr}`);
  };
 
  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#003580"
        }}
      >
        Manage Bookings
      </h2>
 
      {bookings.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No bookings found</h3>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center"
          }}
        >
          {bookings.map((booking, index) => (
            <div
              key={index}
              style={{
                width: "340px",
                borderRadius: "15px",
                padding: "20px",
                backgroundColor: "white",
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
              }}
            >
              <h3 style={{ color: "#003580" }}>
                {booking.flight.airline}
              </h3>
 
              <p style={{ fontWeight: "600" }}>
                {booking.flight.from} → {booking.flight.to}
              </p>
 
              <p>Date: {booking.bookingDate || booking.booking_date}</p>
 
              <p>
                Amount: ₹
                {(booking.total_amount || booking.total).toLocaleString()}
              </p>
 
              <p>
                Status:{" "}
                <span
                  style={{
                    color:
                      (booking.status || "BOOKED") === "BOOKED"
                        ? "green"
                        : "red",
                    fontWeight: "bold"
                  }}
                >
                  {booking.status || "BOOKED"}
                </span>
              </p>
 
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={() => handleView(booking)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  View Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
export default BookingHistory;