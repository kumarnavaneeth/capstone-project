import { useLocation } from "react-router-dom";

function TicketView() {
  const location = useLocation();
  const booking = location.state;

  if (!booking) return <h2>No Ticket Found</h2>;

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1 style={{ color: "#003580" }}>
        Congratulations! Your Booking is Confirmed
      </h1>

      <p>Your journey begins here ✈</p>

      <div style={{ marginBottom: "30px" }}>
        <strong>Booking ID:</strong> {booking.booking_id}<br />
        <strong>PNR:</strong> {booking.pnr}<br />
        <strong>Flight ID:</strong> {booking.flight_id}
      </div>

      {booking.passengers.map((p, index) => (
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
            {booking.flight.airline}
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor:
                p.businessClass === "true"
                  ? "#FFFBEA"
                  : "white",
              padding: "20px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "28px",
                fontWeight: "bold"
              }}
            >
              <span>{booking.flight.from}</span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div style={{ fontSize: "18px", marginBottom: "6px" }}>✈</div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    height: "45px",
                    backgroundColor: "white",
                    padding: "4px"
                  }}
                >
                  {[2,4,1,3,2,5,1,4,2,3,1,5,2,4,1,3].map((w, i) => (
                    <div
                      key={i}
                      style={{
                        width: `${w}px`,
                        height: "100%",
                        backgroundColor: "#111",
                        marginRight: "2px"
                      }}
                    />
                  ))}
                </div>
              </div>

              <span>{booking.flight.to}</span>
            </div>

            <hr />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px"
              }}
            >
              <div>
                <strong>Name</strong>
                <div>{p.firstName} {p.lastName}</div>
              </div>

              <div>
                <strong>Gender</strong>
                <div>{p.gender}</div>
              </div>

              <div>
                <strong>Meal</strong>
                <div>{p.meal}</div>
              </div>

              <div>
                <strong>Class</strong>
                <div>
                  {p.businessClass === "true"
                    ? "Business"
                    : "Non Business Class"}
                </div>
              </div>
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
              <div>
                <strong>Passenger ID</strong>
                <div>{p.passenger_id}</div>
              </div>

              <div>
                <strong>Price</strong>
                <div>
                  ₹{(booking.total_amount / booking.passengers.length).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h2>Total Paid: ₹{booking.total_amount.toLocaleString()}</h2>

      <p style={{ marginTop: "30px", fontStyle: "italic" }}>
        Have a safe flight and a wonderful journey ahead ✈
      </p>
    </div>
  );
}

export default TicketView;