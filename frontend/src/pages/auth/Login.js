import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let response;

    // SIMPLE RULE: admin emails login as admin
    if (email.endsWith("@admin.com")) {
      response = await authService.adminLogin({
        email,
        password
      });
    } else {
      response = await authService.userLogin({
        email,
        password
      });
    }

    // Save JWT token
    localStorage.setItem("token", response.data.token);

    // Save role (if backend sends it)
    if (response.data.role) {
      localStorage.setItem("role", response.data.role);
    }

    // Navigate based on role
    if (response.data.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }

  } catch (error) {
    alert("Invalid email or password");
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
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;