import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("username", response.data.username);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg" style={{ width: "400px" }}>
        <div
          className="card-header text-white text-center"
          style={{ backgroundColor: "#4CAF50" }}
        >
          <h3>Welcome Back</h3>
          <p style={{ margin: 0 }}>Please login to your account</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success w-100"
                style={{
                  backgroundColor: "#4CAF50",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </button>
            </div>
          </form>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
