import React from 'react';
import './product.css';

const Product = ({ name, image, sku }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <h3>{name}</h3>
        <p>SKU: {sku}</p>
      </div>
    </div>
  );
};

export default Product;