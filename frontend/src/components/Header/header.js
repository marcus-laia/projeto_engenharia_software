import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = ({ handleSearch = () => {}, hasSearchBar = false }) => {
  const handleChange = (e) => {
    handleSearch(e);
  };
  const navigate = useNavigate();
  return (
    <header className="header">
      <h1 className="site-name" onClick={() => navigate("/")}>
        Troca de cartas
      </h1>
      {hasSearchBar && (
        <div className="search-bar">
          <input type="text" placeholder="Search..." onChange={handleChange} />
        </div>
      )}
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
        <div className="add-cards-button">
          <Link to="/add-cards-page" className="btn btn-outline-light">
            Add cards
          </Link>
        </div>
        <div className="all-chats-button">
          <Link to="/all-chats" className="btn btn-outline-light">
            All chats
          </Link>
          <div className="my-account-button">
            <Link to="/my-account" className="btn btn-outline-light">
              My account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
