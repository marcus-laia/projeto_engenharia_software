// login.js

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations/loginMutation";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      try {
        localStorage.setItem("customer_token", data.login.token);
        localStorage.setItem("userId", data.login.userId);
        localStorage.setItem("userUsername", data.login.username);
        localStorage.setItem("userEmail", data.login.email);
        localStorage.setItem("userLocation", data.login.location);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage(error.message);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await login({ variables: { username, password } });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <Header hasSearchBar={false} />
      <div className="background-container"></div>
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
