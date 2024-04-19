import React from 'react';
import ProductDetails from './productDetails';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../../graphql/mutations/getProductDetailsQuery';

const ProductDetailsContainer = ( {productId} ) => {
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { productID: productId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ProductDetails product={data.getProductDetails} />
    </div>
  );
};
export default ProductDetailsContainer;