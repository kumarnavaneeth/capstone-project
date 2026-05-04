import { use, useState } from "react";
import AdminDashboard from "./AdminDashboard";
function ManageAirlines() {
    const [airlineList] = useState(()=> JSON.parse(localStorage.getItem("airlines") || "[]"));
  const [selected, setSelected] = useState(null);

  return (
    <div>
    <AdminDashboard/>
    
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h2>Manage Airlines</h2>

      {airlineList.length === 0 ? (
        <p style={{ color: "#888", marginTop: 20 }}>No airlines added yet.</p>
      ) : (
        <div style={{ maxWidth: 500, margin: "20px auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {airlineList.map((airline) => (
            <div key={airline.id} style={cardStyle}>
              <span style={{ fontWeight: 500 }}>{airline.name}</span>
              <button style={viewBtnStyle} onClick={() => setSelected(airline)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selected && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0 }}>{selected.name}</h3>
              <button onClick={() => setSelected(null)} style={closeBtnStyle}>✕</button>
            </div>

            <div style={rowStyle}>
              <span style={labelStyle}>Airline Name</span>
              <span>{selected.name}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Contact Number</span>
              <span>{selected.contactNumber}</span>
            </div>
            <div style={{ ...rowStyle, borderBottom: "none" }}>
              <span style={labelStyle}>Address</span>
              <span>{selected.address}</span>
            </div>

            <button style={closeBtnFullStyle} onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
const cardStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: "14px 16px" };
const viewBtnStyle = { fontSize: 13, padding: "6px 14px", border: "1px solid #ddd", borderRadius: 8, background: "#fff", cursor: "pointer" };
const overlayStyle = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 };
const modalStyle = { background: "#fff", borderRadius: 12, padding: "1.5rem", width: 360, maxWidth: "90%", textAlign: "left" };
const closeBtnStyle = { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" };
const rowStyle = { display: "flex", flexDirection: "column", gap: 3, padding: "10px 0", borderBottom: "1px solid #eee" };
const labelStyle = { fontSize: 12, color: "#888", marginBottom: 2 };
const closeBtnFullStyle = { marginTop: 20, width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 8, background: "#fff", cursor: "pointer" };

export default ManageAirlines;