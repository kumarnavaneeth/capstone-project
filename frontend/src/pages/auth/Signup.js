import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[firstname,setfirstName]=useState("");
  const[lastname,setlastName]=useState("");
  const[phonenumber,setphoneNumber]=useState("");
  const[showSuccess,setShowSuccess]=useState(false);

  const handleSubmit =  async (e) => {
    e.preventDefault();
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

    try {
  await authService.userRegister({
    email,
    password,
    confirmPassword,
    firstName:firstname,
    lastName:lastname,
    phoneNumber:phonenumber,

  });

  setShowSuccess(true);
} catch (error) {
  alert("Signup failed. Please try again.");
}
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
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setfirstName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setlastName(e.target.value)}
          required
        />
        <br /><br />
        
        <input
            type="tel"
            placeholder="Phone Number"
            value={phonenumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            required
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
          />
          <br /><br />

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
        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <br />

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