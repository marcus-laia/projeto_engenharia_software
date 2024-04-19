import React, { useState } from 'react';
import AddToNegotiationContainer from './addToNegotiationContainer';
import Header from '../Header';
import { useParams } from 'react-router-dom';

const AddToNegotiationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { negotiationId: negotiationIdString, userId: userIdString } = useParams();
  const userId = parseInt(userIdString);
  const negotiationId = parseInt(negotiationIdString);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Header handleSearch={handleSearch} hasSearchBar={true} placeholderText={"Search cards to add to the negotiation..."}/>
      <AddToNegotiationContainer userId={userId} negotiationId={negotiationId} filter={searchTerm} />
    </div>
  );
};

export default AddToNegotiationPage;