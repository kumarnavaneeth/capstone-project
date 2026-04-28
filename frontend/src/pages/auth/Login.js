import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("token", "dummy-token");
    const redirectTo = location.state?.redirectTo;
    const flight = location.state?.flight;
    const passengers = location.state?.passengers;

    if (redirectTo === "/booking") {
      navigate("/booking", {
        state: { flight, passengers },
      });
    } else {
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