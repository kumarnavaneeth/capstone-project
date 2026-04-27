import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[showSuccess,setShowSuccess]=useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };
  
const closeModal = () => {
    setShowSuccess(false);
    navigate("/login");
  };

  return (
    <div style={{ width: "300px", margin: "80px auto" }}>
      <h2>Signup</h2>

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
        <br/>
        <br/>

        <button type="submit">Signup</button>
      </form>
      
      {showSuccess && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Signup Successful</h3>
            <p>Your account has been created.</p>
            <button onClick={closeModal}>Go to Login</button>
          </div>
    </div>
      )}
      </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
};


export default Signup;