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
    const response = await authService.userLogin({ email, password });

    console.log("Response data:", response.data); // check console after login

    const roles = response.data.roles;            // ["ADMIN"]
    const role = Array.isArray(roles) ? roles[0] : roles; // "ADMIN"

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", role);

    console.log("Role:", role); // should print ADMIN

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.error("Login error:", error);
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