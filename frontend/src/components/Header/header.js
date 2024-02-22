import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = ({
  handleSearch = () => {},
  hasSearchBar = false,
  placeholderText = "Search...",
}) => {
  const handleChange = (e) => {
    handleSearch(e);
  };
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('customer_token') != null;
  const userUsername = localStorage.getItem('userUsername');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('userUsername');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userLocation');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header">
      <h1 className="site-name" onClick={() => navigate("/")}>
        Troca de cartas
      </h1>
      {hasSearchBar && (
        <div className="search-bar">
          <input
            type="text"
            placeholder={placeholderText}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="login-buttons-container">
      {isLoggedIn ? (
          <div className="user-dropdown">
            <div className="dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
              <span className="username">{userUsername}</span>
            </div>
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/add-cards-page">
                  Add cards
                </Link>
                <Link to="/all-chats">
                  All chats
                </Link>
                <Link to="/my-account">
                  My account
                </Link>
                <Link to="/my-cards">
                  My cards
                </Link>
                <Link onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
