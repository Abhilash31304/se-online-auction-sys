import { useState } from "react";
import { FaUser, FaLock, FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import React from "react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email === "test@gmail.com" && password === "Test1234") {
      navigate("/Dashboard");
    }else {
      alert("Invalid email or password. Please try again.");}
  };


  return (
    <div className="login-container">
      <h2>Welcome</h2>
      <p>Secure login to your account</p>

      {/* Username/Email Input */}
      <div className="input-group">
        <FaUser />
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email or Username"
        />
      </div>


      {/* Password Input */}
      <div className="password-input-container">
        <FaLock />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
          aria-label="Password"
        />
        <span
          className="toggle-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        
      </div>


      {/* Forgot Password & Sign Up Links */}
      <div className="action-links">
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/signup">Sign Up</Link>
      </div>

      {/* Login Button */}
      <button onClick={handleLogin} className="login-btn">
        Login
      </button>

      {/* OAuth Login Buttons */}
      <div className="oauth-buttons">
        <button className="google-btn">
          <FaGoogle /> Login with Google
        </button>
        <button className="facebook-btn">
          <FaFacebook /> Login with Facebook
        </button>
      </div>

      {/* Security Message */}
      <p className="security-msg">
        🔒 Secure authentication with SSL encryption
      </p>
    </div>
  );
}