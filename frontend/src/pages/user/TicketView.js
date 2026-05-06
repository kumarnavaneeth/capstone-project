import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TicketView() {
  const { pnr } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1.0/booking/ticket/${pnr}`
      );
      setBooking(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const ticketData = `
Booking ID: ${booking.bookingId}
PNR: ${booking.pnr}
Flight ID: ${booking.flightId}
Status: ${booking.status}
    `;
    const blob = new Blob([ticketData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Ticket_${booking.pnr}.txt`;
    link.click();
  };

const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios({
        method: "patch",
        url: `http://localhost:8080/api/v1.0/flight/booking/cancel/${booking.pnr}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "PATCH"
        }
      });
      const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      const updated = savedBookings.map((b) =>
        (b.booking_id || b.bookingId) === booking.bookingId
          ? { ...b, status: "CANCELLED" }
          : b
      );
      localStorage.setItem("bookings", JSON.stringify(updated));
      alert("Booking cancelled!");
      navigate("/bookings");
    } catch (err) {
      console.error("Cancel error:", err.response?.status, err.response?.data);
      alert(`Failed: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!booking) return <h2 style={{ textAlign: "center" }}>No Ticket Found</h2>;

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1 style={{ color: "#003580" }}>Booking Confirmed</h1>
      <p>Your journey begins here ✈</p>

      <div style={{ marginBottom: "30px" }}>
        <strong>Booking ID:</strong> {booking.bookingId} <br />
        <strong>PNR:</strong> {booking.pnr} <br />
        <strong>Flight ID:</strong> {booking.flightId} <br />
        <strong>Status:</strong> {booking.status}
      </div>

      {booking.passengers?.map((p, index) => (
        <div
          key={index}
          style={{
            maxWidth: "700px",
            margin: "20px auto",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            display: "flex"
          }}
        >
          <div
            style={{
              backgroundColor: "#00C896",
              color: "white",
              width: "120px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold"
            }}
          >
            FLIGHT
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: booking.isBusinessClass ? "#FFFBEA" : "white",
              padding: "20px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "24px",
                fontWeight: "bold"
              }}
            >
              <span>Source</span>
              <span>✈</span>
              <span>Destination</span>
            </div>

            <hr />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px"
              }}
            >
              <div><strong>Name</strong><div>{p.name}</div></div>
              <div><strong>Gender</strong><div>{p.gender}</div></div>
              <div><strong>Meal</strong><div>{p.mealType}</div></div>
              <div><strong>Class</strong><div>{booking.isBusinessClass ? "Business" : "Economy"}</div></div>
            </div>

            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#d6fedc",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div><strong>Passenger ID</strong><div>{p.passengerId}</div></div>
              <div><strong>Age</strong><div>{p.age}</div></div>
            </div>
          </div>
        </div>
      ))}

      {/* ── Only these buttons are new ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "30px" }}>
        <button
          onClick={handleDownload}
          style={{ padding: "12px 25px", backgroundColor: "#28A745", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
        >
          ⬇ Download Ticket
        </button>

        {booking.status !== "CANCELLED" && (
          <button
            onClick={handleCancel}
            style={{ padding: "12px 25px", backgroundColor: "#DC3545", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
          >
            ✕ Cancel Booking
          </button>
        )}
      </div>

      <p style={{ marginTop: "30px", fontStyle: "italic" }}>Have a safe flight ✈</p>
    </div>
  );
}

export default TicketView;