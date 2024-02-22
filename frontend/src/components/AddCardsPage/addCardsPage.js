import React, { useState } from 'react';
import AddCardsContainer from './addCardsContainer';
import Header from '../Header';

const AddCardsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Header handleSearch={handleSearch} hasSearchBar={true} placeholderText={"Search cards to add..."}/>
      <AddCardsContainer filter={searchTerm} />
    </div>
  );
};

export default AddCardsPage;