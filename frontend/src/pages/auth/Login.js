import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-token");
    if (email === "admin@test.com") {
      localStorage.setItem("role", "ADMIN");
      navigate("/admin/dashboard");
    } else {
      localStorage.setItem("role", "USER");
      navigate("/");
    }
  };

  return (
    <div style={{ width: "300px", margin: "80px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;