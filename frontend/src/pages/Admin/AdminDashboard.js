import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };
  return (
    <div>
      <nav
        style={{
          padding: "15px 30px",
          backgroundColor: "#003580",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <div>
          <Link
            to="/admin/schedules"
            style={{ color: "white", marginRight: "20px" }}
          >
            Manage Schedules
          </Link>
          <Link to="/admin/airlines" style={{ color: "white", marginRight: "20px"  }}>
            Manage Airlines
          </Link>

           <Link to="/admin/add-flights" style={{ color: "white", marginRight: "20px" }}>
                  Add Flights
          </Link>

        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "white",
            color: "#003580",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
          }}
          >
        Logout
        </button>
      </nav>

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h2>Welcome Admin</h2>
        <p>Select an option from the menu above.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;