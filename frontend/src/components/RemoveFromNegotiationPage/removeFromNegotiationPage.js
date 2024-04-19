import React, { useState } from 'react';
import RemoveFromNegotiationContainer from './removeFromNegotiationContainer';
import Header from '../Header';
import { useParams } from 'react-router-dom';

const RemoveFromNegotiationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { negotiationId: negotiationIdString, userId: userIdString } = useParams();
  const userId = parseInt(userIdString);
  const negotiationId = parseInt(negotiationIdString);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Header handleSearch={handleSearch} hasSearchBar={true} placeholderText={"Search cards to remove from to the negotiation..."}/>
      <RemoveFromNegotiationContainer userId={userId} negotiationId={negotiationId} filter={searchTerm} />
    </div>
  );
};

export default RemoveFromNegotiationPage;