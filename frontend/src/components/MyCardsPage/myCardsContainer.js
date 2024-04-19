import React from 'react';
import MyCards from './myCards';
import { useQuery } from '@apollo/client';
import { GET_USER_PRODUCTS } from '../../graphql/mutations/getUserProductsQuery';

const MyCardsContainer = ( {userId, filter} ) => {
  const { loading, error, data } = useQuery(GET_USER_PRODUCTS, {
    variables: { userId, filter },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <MyCards products={data.getUserProducts} />
    </div>
  );
};
export default MyCardsContainer;