import React, { useState } from "react";
import Header from "../Header";
import ProductList from "../ProductList";
import "./homepage.css";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container-fluid">
      <Header
        handleSearch={handleSearch}
        hasSearchBar={true}
        placeholderText={"Search..."}
      />
      <ProductList filter={searchTerm} />
    </div>
  );
};

export default Homepage;
