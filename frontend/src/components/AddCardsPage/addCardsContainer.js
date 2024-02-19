import React from 'react';
import AddCards from './addCards';
import { useQuery } from '@apollo/client';
import { GET_MASTER_PRODUCTS } from '../../graphql/mutations/getMasterProductsMutation';

const AddCardsContainer = ( {filter} ) => {
  const { loading, error, data } = useQuery(GET_MASTER_PRODUCTS, {
    variables: { filter },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AddCards products={data.products} />
    </div>
  );
};
export default AddCardsContainer;