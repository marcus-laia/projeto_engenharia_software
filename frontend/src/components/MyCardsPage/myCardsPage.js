import React, { useState } from 'react';
import MyCardsContainer from './myCardsContainer';
import Header from '../Header';

const MyCardsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Header handleSearch={handleSearch} hasSearchBar={true} placeholderText={"Search cards to remove..."}/>
      <MyCardsContainer userId={Number(localStorage.getItem("userId"))} filter={searchTerm} />
    </div>
  );
};

export default MyCardsPage;