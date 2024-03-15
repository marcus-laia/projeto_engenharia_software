import React from 'react';
import NegotiationContainer from './negotiationContainer';
import Header from '../Header';
import { useParams } from 'react-router-dom';
import { GET_NEGOTIATION } from '../../graphql/mutations/getNegotiationQuery';
import { useQuery } from '@apollo/client';

const NegotiationPage = ({ userId1Received, userId2Received }) => {
  const { userId1: userId1StringFromParams, userId2: userId2StringFromParams } = useParams();
  const userId1 = userId1Received ? parseInt(userId1Received) : parseInt(userId1StringFromParams);
  const userId2 = userId2Received ? parseInt(userId2Received) : parseInt(userId2StringFromParams);

  const { loading, error, data } = useQuery(GET_NEGOTIATION, {
    variables: { userId1, userId2 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="negotiation-page-container-negotiationPage">
      {!userId1Received && <Header hasSearchBar={false} />}
      <div className="negotiation-container-negotiationPage">
        <h2 className="negotiation-header-negotiationPage">Negotiation Details</h2>
        <div className="negotiation-content-negotiationPage">
          <NegotiationContainer negotiationId={data.negotiationId} userId1={userId1} userId2={userId2} />
        </div>
      </div>
    </div>
  );
};

export default NegotiationPage;
