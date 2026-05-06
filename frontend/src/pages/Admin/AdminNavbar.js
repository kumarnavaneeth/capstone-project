import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "15px 40px",
        backgroundColor: "#003580",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/add-flights" style={linkStyle}>Add Flight</Link>
        <Link to="/admin/register-airline" style={linkStyle}>Register Airline</Link>
      </div>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: "8px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.2s",
          fontWeight: "500",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")}
      >
        Logout
      </button>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  opacity: "0.9",
  transition: "opacity 0.2s",
};

export default AdminNavbar;
