import { useLocation } from "react-router-dom";

function FlightResults() {
  const location = useLocation();
  const { source, destination, date } = location.state || {};

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Flight Results</h2>

      <p>
        {source} → {destination}
      </p>
      <p>Date: {date}</p>
    </div>
  );
}

export default FlightResults;