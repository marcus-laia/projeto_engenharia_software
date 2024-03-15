import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const Product = ({ id, name, image, sku }) => {
  return (
    <Link to={`/product-details/${id}`} className="product-link">
      <div className="product-card">
        <img src={image} alt={name} className="product-image" />
        <div className="product-details">
          <h3>{name}</h3>
          <p>SKU: {sku}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
