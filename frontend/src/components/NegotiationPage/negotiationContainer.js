import React from 'react';
import Negotiation from './negotiation';
import { useQuery } from '@apollo/client';
import { GET_NEGOTIATION_PRODUCTS } from '../../graphql/mutations/getNegotiationProductsQuery';

const NegotiationContainer = ( {negotiationId, userId1, userId2} ) => {
  const { loading: loadingProductsUser1, error: errorProductsUser1, data: dataProductsUser1 } = useQuery(GET_NEGOTIATION_PRODUCTS, {
    variables: { negotiationId, userId: userId1 },
  });
  const { loading: loadingProductsUser2, error: errorProductsUser2, data: dataProductsUser2 } = useQuery(GET_NEGOTIATION_PRODUCTS, {
    variables: { negotiationId, userId: userId2 },
  });

  if (loadingProductsUser1 || loadingProductsUser2) return <p>Loading...</p>;
  if (errorProductsUser1 || errorProductsUser2) return <p>Error: {errorProductsUser1.message || errorProductsUser2.message}</p>;

  return (
    <div>
      <Negotiation productsUser1={dataProductsUser1.products} productsUser2={dataProductsUser2.products}/>
    </div>
  );
};
export default NegotiationContainer;