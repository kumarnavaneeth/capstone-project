// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showError, setShowError] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username === "admin" && password === "admin123") {
//       localStorage.setItem("token", "dummy-token");
//       localStorage.setItem("role", "ADMIN");
//       navigate("/admin/dashboard");
//     } else {
//   setShowError(true);
//     }
//   };

//   return (
//     <div style={{ marginTop: "80px", textAlign: "center" }}>
//       <h2>Admin Login</h2>

//       <form onSubmit={handleLogin}>
//         <div>
//           <input
//             type="text"
//             placeholder="Admin Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <br/>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <br/>
//         <button type="submit">Login</button>
//       </form>

//   {showError && (
//         <div style={overlayStyle}>
//           <div style={modalStyle}>
//             <h3>Login Failed</h3>
//             <p>Invalid admin credentials</p>
//             <button onClick={() => setShowError(false)}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// const overlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   height: "100%",
//   width: "100%",
//   backgroundColor: "rgba(0,0,0,0.4)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const modalStyle = {
//   backgroundColor: "white",
//   padding: "20px",
//   borderRadius: "5px",
// };

// export default AdminLogin;