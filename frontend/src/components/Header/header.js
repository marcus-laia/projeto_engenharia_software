import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ handleSearch }) => {
  const handleChange = (e) => {
    handleSearch(e); // Call the handleSearch function passed from Homepage
  };

  return (
    <header className="header">
      <h1 className="site-name">Troca de cartas</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..." onChange={handleChange} />
      </div>
      <div className="login-buttons-container">
        <div className="login-button">
          <Link to="/login" className="btn btn-outline-light">
            Login
          </Link>
        </div>
        <div className="register-button">
          <Link to="/register" className="btn btn-outline-light">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
