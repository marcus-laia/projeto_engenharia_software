import React from 'react';
import ProductDetailsContainer from './productDetailsContainer';
import Header from '../Header';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const { productId: productIdString }  = useParams();
  const productId = parseInt(productIdString);

  return (
    <div>
      <Header hasSearchBar={false}/>
      <ProductDetailsContainer productId={productId}/>
    </div>
  );
};

export default ProductDetailsPage;