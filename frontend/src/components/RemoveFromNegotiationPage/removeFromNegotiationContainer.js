import React from 'react';
import RemoveFromNegotiation from './removeFromNegotiation';
import { useQuery } from '@apollo/client';
import { GET_USER_PRODUCTS } from '../../graphql/mutations/getUserProductsQuery';
import { GET_NEGOTIATION_PRODUCTS } from '../../graphql/mutations/getNegotiationProductsQuery';

const RemoveFromNegotiationContainer = ( {userId, negotiationId, filter} ) => {
  const { loading, error, data } = useQuery(GET_USER_PRODUCTS, {
    variables: { userId, filter },
  });

  const { loading: loadingProductsUser, error: errorProductsUser, data: dataProductsUser } = useQuery(GET_NEGOTIATION_PRODUCTS, {
    variables: { negotiationId, userId },
  });

  if (loading || loadingProductsUser) return <p>Loading...</p>;
  if (error || errorProductsUser) return <p>Error: {error.message}</p>;

  return (
    <div>
      <RemoveFromNegotiation negotiationId={negotiationId} products={data.getUserProducts.filter(product => dataProductsUser.getNegotiationProducts.some(p => p.id === product.id))}/>
    </div>
  );
};
export default RemoveFromNegotiationContainer;