import React  from 'react';
import NegotiationContainer from './negotiationContainer';
import Header from '../Header';
import { useParams } from 'react-router-dom';
import { GET_NEGOTIATION } from '../../graphql/mutations/getNegotiationQuery';
import { useQuery } from '@apollo/client';

const NegotiationPage = () => {
  const {  userId1: userId1String , userId2: userId2String }  = useParams();
  const userId1 = parseInt(userId1String);
  const userId2 = parseInt(userId2String);

  const { loading, error, data } = useQuery(GET_NEGOTIATION, {
    variables: { userId1, userId2 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header hasSearchBar={false}/>
      <NegotiationContainer negotiationId={data.negotiationId} userId1={userId1}  userId2={userId2}/>
    </div>
  );
};

export default NegotiationPage;