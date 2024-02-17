import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../graphql/mutations/registerMutation";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordUpperCaseValid, setPasswordUpperCaseValid] = useState(false);
  const [passwordLowerCaseValid, setPasswordLowerCaseValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.register.token); // Assuming your server returns a token
      navigate("/");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await register({ variables: { username, password } });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordLengthValid(e.target.value.length >= 6);
    setPasswordUpperCaseValid(/[A-Z]/.test(e.target.value));
    setPasswordLowerCaseValid(/[a-z]/.test(e.target.value));
    setPasswordValid(
      e.target.value.length >= 6 &&
        /[A-Z]/.test(e.target.value) &&
        /[a-z]/.test(e.target.value)
    );
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />

          <div className="password-checks">
            <div className={passwordLengthValid ? "valid" : "invalid"}>
              At least 6 characters
            </div>
            <div className={passwordUpperCaseValid ? "valid" : "invalid"}>
              One uppercase letter
            </div>
            <div className={passwordLowerCaseValid ? "valid" : "invalid"}>
              One lowercase letter
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !passwordValid || !passwordMatch}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
