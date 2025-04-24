import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaEnvelope,
  FaEyeSlash,
  FaEye
} from "react-icons/fa";

import "./AuthPage.css";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isSignup) {
      console.log("Signing up with:", { username, email, password, userType });
      // Store user data for new signup
      localStorage.setItem('user', JSON.stringify({ email, userType }));
      navigate("/dashboard");
    } else {
      const muEmailPattern = /^[a-zA-Z0-9._%+-]+@mahindrauniversity\.edu\.in$/;
  
      if (
        (email === "test@gmail.com" && password === "Test1234") ||
        (muEmailPattern.test(email) && password === "Test1234")
      ) {
        // Store auth data on successful login
        localStorage.setItem('user', JSON.stringify({ email }));
        localStorage.setItem('token', 'dummy-token-for-demo');
        navigate("/dashboard");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
  };
  

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Create an Account" : "Welcome"}</h2>
      <p>{isSignup ? "Sign up to start bidding and selling!" : "Secure login to your account"}</p>

      {isSignup && (
        <div className="input-group">
          <FaUser />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}

      <div className="input-group">
        <FaEnvelope />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="password-input-container">
  <FaLock className="left-icon" />
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="password-input"
  />
  <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>



      {isSignup && (
        <div className="input-group">
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
      )}

      <div className="action-links">
        {!isSignup && <button className="link-button">Forgot Password?</button>}
        <button
          className="link-button"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "New here? Sign Up"}
        </button>
      </div>

      <button onClick={handleSubmit} className="auth-btn">
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <div className="oauth-buttons">
        <button><FaGoogle /> Google</button>
        <button><FaFacebook /> Facebook</button>
      </div>

      <p className="security-msg">🔒 Secure authentication with SSL encryption</p>
    </div>
  );
}
