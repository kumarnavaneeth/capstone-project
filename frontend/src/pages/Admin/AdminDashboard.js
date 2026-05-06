import React from "react";
import AdminNavbar from "./AdminNavbar";

function AdminDashboard() {
  return (
    <div style={{ backgroundColor: "#f4f7f9", minHeight: "100vh" }}>
      <AdminNavbar />

      <div style={{ padding: "60px 20px", textAlign: "center", maxWidth: "800px", margin: "auto" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <h1 style={{ color: "#003580", fontSize: "32px", marginBottom: "10px" }}>Welcome, Admin</h1>
          <p style={{ color: "#666", fontSize: "18px", lineHeight: "1.6" }}>
            Use the tools below to manage the flight system. You can add new flight schedules or register new airline partners.
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "40px" }}>
            <DashboardCard 
              title="Add Flight" 
              desc="Create a new flight schedule in the system." 
              link="/admin/add-flights"
            />
            <DashboardCard 
              title="Register Airline" 
              desc="Register a new airline partner." 
              link="/admin/register-airline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, desc, link }) {
  return (
    <a href={link} style={{ 
      textDecoration: "none", 
      color: "inherit",
      padding: "20px",
      border: "1px solid #eee",
      borderRadius: "10px",
      transition: "transform 0.2s, box-shadow 0.2s",
      backgroundColor: "#fafafa"
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
    >
      <h3 style={{ color: "#003580", marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "#777", fontSize: "14px" }}>{desc}</p>
    </a>
  );
}

export default AdminDashboard;